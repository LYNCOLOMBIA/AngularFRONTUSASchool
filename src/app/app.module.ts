import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Personalized modules
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameResultsComponent } from './reports/game-results/game-results.component';


@NgModule({
  declarations: [
    AppComponent,
    NotAuthorizedComponent,
    PageNotFoundComponent,
    GameResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
