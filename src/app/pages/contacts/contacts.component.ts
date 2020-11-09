import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ContactsService } from './contacts.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  file: File;
  fileData: any = null;
  dataURL: any = null;
  csvRecords: any[] = [];
  header = true;

 
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', ];
  dataSource = new MatTableDataSource(this.csvRecords);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private location: Location,
    private router: Router,
    private service: ContactsService
              ) {
  }
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
  }


  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
 
    // Select the files from the event
    this.file = $event.srcElement.files;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(this.file[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe((result: Array<any>) => {
 
        console.log('Result', result)
        console.log('file', this.file);
        this.csvRecords = result;
        this.dataSource = new MatTableDataSource(this.csvRecords);
        this.dataSource.paginator = this.paginator;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

return(){
  this.location.back();
}
cancel(){
  this.file = null;
}
save(){
  this.service.saveList(this.csvRecords);
  this.router.navigate(['/'])
}

}
