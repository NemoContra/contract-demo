import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractOverviewComponent } from './contract-overview.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromContracts from './+state/contracts.reducer';
import { ContractsEffects } from './+state/contracts.effects';
import { ContractsFacade } from './+state/contracts.facade';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ContractOverviewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContractOverviewComponent }]),
    EffectsModule.forFeature([ContractsEffects]),
    StoreModule.forFeature(
      fromContracts.CONTRACTS_FEATURE_KEY,
      fromContracts.contractsReducer
    ),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [ContractsFacade],
})
export class ContractOverviewModule {
}
