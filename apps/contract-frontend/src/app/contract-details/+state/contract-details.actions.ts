import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GroupcontractOverviewData } from '@contract-demo/api-interfaces';

export const ContractDetailsActions = createActionGroup({
  source: 'ContractDetails',
  events: {
    Get: emptyProps(),
    Success: props<{ data: GroupcontractOverviewData }>(),
    Error: props<{ errorCode: number }>(),
  },
});
