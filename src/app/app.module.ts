import { TrelloService } from '././trello/trello.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { InformeComponent } from './informe/informe.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    InformeComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule,
    HttpModule,
    AppRoutingModule
  ],

  providers: [TrelloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
