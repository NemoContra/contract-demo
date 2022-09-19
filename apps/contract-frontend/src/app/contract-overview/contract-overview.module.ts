import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractOverviewComponent } from './contract-overview.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromContracts from './+state/contracts.reducer';
import { ContractsEffects } from './+state/contracts.effects';
import { ContractsFacade } from './+state/contracts.facade';

@NgModule({
  declarations: [ContractOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContractOverviewComponent }]),
    StoreModule.forFeature(
      fromContracts.CONTRACTS_FEATURE_KEY,
      fromContracts.contractsReducer
    ),
    EffectsModule.forFeature([ContractsEffects]),
    StoreModule.forFeature(
      fromContracts.CONTRACTS_FEATURE_KEY,
      fromContracts.contractsReducer
    ),
  ],
  providers: [ContractsFacade],
})
export class ContractOverviewModule {}
