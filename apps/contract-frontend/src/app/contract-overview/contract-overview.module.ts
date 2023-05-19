import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractOverviewComponent } from './contract-overview.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContractsEffects } from './+state/contracts.effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CONTRACTS_FEATURE_KEY,
  contractsReducer,
} from './+state/contracts.reducer';

@NgModule({
  declarations: [ContractOverviewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContractOverviewComponent }]),
    StoreModule.forFeature(CONTRACTS_FEATURE_KEY, contractsReducer),
    EffectsModule.forFeature([ContractsEffects]),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class ContractOverviewModule {}
