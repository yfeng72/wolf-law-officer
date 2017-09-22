import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { CallService, StatusService } from './services';

import { SeatComponent } from './views/seat';
import { GameComponent } from './views/game';
import { SettingsComponent } from './views/settings';
import { IdentityDialogComponent } from './views/identity-dialog';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent,
    GameComponent,
    SettingsComponent,
    IdentityDialogComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MdNativeDateModule
  ],
  providers: [
  	CallService,
    StatusService
  ],
  entryComponents: [
      IdentityDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
