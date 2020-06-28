import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SortableHeaderDirective } from './sortable-Header.directive';
import { NgbdTableComplete } from './table-complete';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [NgbdTableComplete, SortableHeaderDirective],
  exports: [NgbdTableComplete],
  bootstrap: [NgbdTableComplete]
})
export class NgbdTableCompleteModule {}
