import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Country} from './country';

import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {DocumentSidebarService} from "./document-sidebar.service";


@Component(
    {selector: 'ngbd-table-complete', templateUrl: './table-complete.html', providers: [DocumentSidebarService, DecimalPipe]})
export class NgbdTableComplete {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: DocumentSidebarService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
