import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    NgxCsvParserModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ]
})
export class ContactsModule { }
