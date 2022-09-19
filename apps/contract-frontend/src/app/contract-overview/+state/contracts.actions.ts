import {createActionGroup, props} from '@ngrx/store';
import {Contract, ContractType} from "@contract-demo/api-interfaces";

export const ContractActions = createActionGroup({
  source: 'Contracts',
  events: {
    'getContracts': props<{ term: string; contractType: ContractType }>(),
    'getContracts Success': props<{ result: Contract[] }>(),
    'getContracts Failure': props<{ errorCode: number }>(),
  }
})
