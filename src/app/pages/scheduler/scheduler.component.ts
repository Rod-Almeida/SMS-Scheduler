import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ContactsService } from '../contacts/contacts.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, AfterViewInit {
  scheduleForm: FormGroup;
  date: string;
  time: string;
  contact: {firstName: string, lastName: string, phoneNumber: string};
  message: string;
  fullDate: Date;
  iSchedule: null;
  // notSP: boolean;

  scheduleTable = [
    {edit: false, date: '15/10/2020', time: '10:00', contact: {firstName: 'João', lastName: 'Silva', phoneNumber: '(11) 98765-4321'}, message: 'Sua consulta está confirmada no dia 15/10/2020. Caso queira remarcá-la ou cancelá-la, ligue para (11) 2143-2109 ou acesse nosso portal: www.exemplo.com.br/portaldocliente '},
  ]

  contactList = [];



  displayedColumns: string[] = ['date', 'contact', 'message', 'delete', 'edit',];
  dataSource = new MatTableDataSource(this.scheduleTable);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef,
    private service: ContactsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.refresh();
    this.contactList = this.service.csvList;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(){
this.dataSource.sort = this.sort;
this.dataSource.paginator = this.paginator;
  }

  createForm(){
  this.scheduleForm = this.formBuilder.group({
    edit: false,
    date: [null],
    time: [null],
    contact: [null],
    message: [null],
    })
  }

  editSchedule(i){
    console.log('i.date ', i)
    console.log('scheduleTableinfo ', this.scheduleTable[i])
    this.iSchedule = i;
    this.scheduleForm.setValue({
      edit: true,
      date: this.scheduleTable[i].date,
      time: this.scheduleTable[i].time,
      contact: this.scheduleTable[i].contact,
      message: this.scheduleTable[i].message,
        })
    
  }

  // warningMessage(){
  //   console.log('phoneNumber: ', this.scheduleForm.controls['contact'].value['phoneNumber'])
  //   let phoneNumber: String = this.scheduleForm.controls['contact'].value['phoneNumber']
    
  //   if(!phoneNumber.startsWith('(11)')){
  //   this.notSP = true
  //   }
  // }

  deleteSchedule(i){
this.scheduleTable.splice(i, 1);
this.changeDetectorRefs.detectChanges();
this.dataSource = new MatTableDataSource(this.scheduleTable);
  }

  onSubmit(){
  console.log('scheduleForm', this.scheduleForm.controls['edit'])
  if(this.scheduleForm.valid && !this.scheduleForm.pending){
    if(this.iSchedule == null){
      this.scheduleTable.push({
        edit: false,
        date: this.scheduleForm.value['date'].toLocaleDateString(),
        time: this.scheduleForm.value['time'], 
        contact: this.scheduleForm.value['contact'], 
        message: this.scheduleForm.value['message']})
    } else {
    this.scheduleTable.splice(this.iSchedule, 1, {
      edit: false,
      date: this.scheduleForm.value['date'].toLocaleDateString(),
      time: this.scheduleForm.value['time'],
      contact: this.scheduleForm.value['contact'], 
      message: this.scheduleForm.value['message']})
  } 
  console.log('scheduleTable', this.scheduleTable)
  this.refresh();
  }
  }
  
addContactList(){
  this.router.navigate(['/contacts'])
}


  refresh() {
    this.changeDetectorRefs.detectChanges();
    this.dataSource = new MatTableDataSource(this.scheduleTable);
    this.iSchedule = null;
    this.scheduleForm.reset()
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
