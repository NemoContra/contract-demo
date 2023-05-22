import { GroupcontractOverviewData } from '@contract-demo/api-interfaces';

export const contractDetailsData: GroupcontractOverviewData =
{
  vertragsnummer: {
    id: '1',
    formatiert: 'ID-1'
  },
  vorvertragsnummern: [
    {
      id: 'A1',
      formatiert: 'Old-ID-1'
    },
    {
      id: 'A2',
      formatiert: 'Old-ID-2'
    }
  ],
  vertragsbezeichnung: 'this is a nice description of the data.'
};
