import { Component, OnInit } from '@angular/core';
import { ContractDetailsFacade } from "./+state/contract-details.facade";
import { Observable } from "rxjs";
import { GroupcontractOverviewData } from "@contract-demo/api-interfaces";

@Component({
  selector: 'contract-demo-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  data$: Observable<GroupcontractOverviewData | undefined> = this.contractDetailsFacade.contractDetailsData$;
  loading$: Observable<boolean> = this.contractDetailsFacade.getContractDetailsLoading$;
  isError$: Observable<number | undefined> = this.contractDetailsFacade.getContractDetailsError$;
  constructor(private readonly contractDetailsFacade: ContractDetailsFacade) {}

  ngOnInit(): void {
    this.contractDetailsFacade.getContractDetailsData();
  }
}
