export interface ContractFilterQuery {
  term?: string;
}

export interface Contract {
  id: string;
  person: {
    firstname: string;
    lastname: string;
  };
  type: ContractType;
}

export type ContractType = 'bAV' | 'Krankenversicherung' | 'KFZ-Versicherung';

export interface FilterResult {
  contracts: Contract[];
  totalElements: number;
}

export interface GroupcontractOverviewData {
  contractNumber: ContractNumber;
  oldContractNumbers: ContractNumber[];
  description: string;
}

export interface ContractNumber {
  id: string;
  formated: string;
}

