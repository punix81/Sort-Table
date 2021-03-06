import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {switchMap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable-Header.directive';
import {DOCUMENTTS} from "./documents";
import {Document} from "./document";

interface SearchResult {
  documents: Document[];
  total: number;
}


interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(documents: Document[], column: SortColumn, direction: string): Document[] {
  if (direction === '' || column === '') {
    return documents;
  } else {
    return [...documents].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(document: Document, term: string, pipe: PipeTransform) {
  return document.fileName.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(document.personId).includes(term)
    || pipe.transform(document.documentStatus).includes(term);
}

@Injectable({providedIn: 'root'})
export class DocumentSidebarService {
  private _search$ = new Subject<void>();
  private _documents$ = new BehaviorSubject<Document[]>([]);

  private _state: State = {
    page: 1,
    pageSize: 20,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      switchMap(() => this._search()),
    ).subscribe(result => {
      this._documents$.next(result.documents);
    });
    this._search$.next();
  }

  get documents$() { return this._documents$.asObservable(); }

  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let documents = sort(DOCUMENTTS, sortColumn, sortDirection);

    // 2. filter
     documents = documents.filter(country => matches(country, searchTerm, this.pipe));
    const total = documents.length;

    // 3. paginate
    documents = documents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({documents: documents, total});
  }
}
