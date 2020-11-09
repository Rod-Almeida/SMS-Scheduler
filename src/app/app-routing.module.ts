import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

const routes: Routes = [

  {
    path: '',
    component: SchedulerComponent,
  },

  {
    path: 'contacts',
    component: ContactsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
