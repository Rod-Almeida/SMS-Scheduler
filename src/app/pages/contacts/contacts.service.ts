import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  csvListUploaded = new EventEmitter<any>();
  csvList: any[];
  

  constructor() { }

  saveList(csvRecords){
    this.csvList = csvRecords
    console.log('csvlist', this.csvList)
    this.csvListUploaded.emit(this.csvList)
  }
}
