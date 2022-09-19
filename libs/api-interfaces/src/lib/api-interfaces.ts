export interface Contract {
  id: string;
  person: {
    firstname: string;
    lastname: string;
  }
  type: ContractType;
}

export type ContractType = 'bAV' | 'Krankenversicherung';
