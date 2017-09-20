import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { CallService } from './services';
import { SeatComponent } from './views';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    MdNativeDateModule
  ],
  providers: [
  	CallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
