import { GroupcontractOverviewData } from '@contract-demo/api-interfaces';

export const contractDetailsData: GroupcontractOverviewData =
{
  contractNumber: {
    id: '1',
    formatted: 'ID-1'
  },
  previousContractNumbers: [
    {
      id: 'A1',
      formatted: 'Old-ID-1'
    },
    {
      id: 'A2',
      formatted: 'Old-ID-2'
    }
  ],
  description: 'this is a nice description of the data.'
};
