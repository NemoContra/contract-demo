import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Contract,
  ContractType,
  FilterResult,
  GroupcontractOverviewData,
} from '@contract-demo/api-interfaces';
import { contractsData } from './contracts';
import { contractDetailsData } from './contract-details';

@Injectable()
export class AppService {
  getContracts(
    term: string | undefined,
    type: ContractType | undefined,
    pageNumber = 0,
    pageSize = 10
  ): FilterResult {
    let contracts: Contract[] = contractsData;

    if (type) {
      contracts = contracts.filter((contract) => contract.type === type);
    }

    if (term) {
      if (term === '500') {
        throw new InternalServerErrorException();
      }
      const lowerCase = term.toLowerCase();
      contracts = contracts.filter(
        (conntract: Contract) =>
          (conntract.person.firstname + ' ' + conntract.person.lastname)
            .toLowerCase()
            .includes(lowerCase) ||
          conntract.id?.toLowerCase().includes(lowerCase)
      );
    }

    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    const pageElements = contracts.slice(startIndex, endIndex);

    return {
      contracts: pageElements,
      totalElements: contracts.length,
    };
  }

  getContract(contractId: number): GroupcontractOverviewData {
    return {
      ...contractDetailsData,
      contractNumber: {
        id: `${contractId}`,
        formatted: `ID-${contractId}`
      },
      previousContractNumbers: [
        {
          id: `A${contractId}`,
          formatted: `Old-ID-${contractId}`
        },
        {
          id: `A${contractId + 1}`,
          formatted: `Old-ID-${contractId + 1}`
        }
      ],
      description: 'this is a nice description of the data.'
    }
  }
}
