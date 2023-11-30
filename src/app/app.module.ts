import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { JsonToTableModule } from 'json-to-table-com';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { QuestionComponent } from './question/question.component';
import { InfoComponent } from './info/info.component';

import { DatabaseService } from './database.service';
import { UserDataService } from './user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    QuestionComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    JsonToTableModule 
  ],
  providers: [
    DatabaseService,
    UserDataService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
