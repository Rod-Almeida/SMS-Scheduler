import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './shared/header/header.module';
import { SchedulerModule } from './pages/scheduler/scheduler.module';
import { ContactsModule } from './pages/contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    SchedulerModule,
    ContactsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
