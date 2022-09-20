import { createActionGroup, props } from '@ngrx/store';
import { ContractFilterQuery, FilterResult } from '@contract-demo/api-interfaces';

export const ContractActions = createActionGroup({
  source: 'Contracts',
  events: {
    'Get': props<{ filterQuery?: ContractFilterQuery }>(),
    'Success': props<{ filterResult: FilterResult }>(),
    'Error': props<{ errorCode: number }>(),
  }
})
