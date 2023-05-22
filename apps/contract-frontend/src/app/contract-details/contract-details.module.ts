import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDetailsComponent } from './contract-details.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { ContractDetailsEffects } from "./+state/contract-details.effects";
import { CONTRACT_DETAILS_FEATURE_KEY, contractDetailsReducer } from "./+state/contract-details.reducer";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: ContractDetailsComponent }]),
    StoreModule.forFeature(CONTRACT_DETAILS_FEATURE_KEY, contractDetailsReducer),
    EffectsModule.forFeature([ContractDetailsEffects]),
  ],
  declarations: [
    ContractDetailsComponent
  ],
})
export class ContractDetailsModule { }
