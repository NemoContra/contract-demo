import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./contract-overview/contract-overview.module').then(
            (m) => m.ContractOverviewModule
          ),
      },
      {
        path: 'details',
        loadChildren: () =>
          import('./contract-details/contract-details.module').then(
            (m) => m.ContractDetailsModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ]),
    MatTabsModule,
    MatButtonModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
