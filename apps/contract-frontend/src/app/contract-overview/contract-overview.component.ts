import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ContractsFacade } from './+state/contracts.facade';
import { Observable } from 'rxjs';
import { Contract } from '@contract-demo/api-interfaces';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'contract-demo-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractOverviewComponent implements OnInit, AfterViewInit {
  contracts$: Observable<Contract[] | undefined> = this.contractsFacade.allContracts$;
  totalElements$: Observable<number | undefined> = this.contractsFacade.totalElements$;
  loaded$: Observable<boolean> = this.contractsFacade.loaded$;
  isError$: Observable<number | undefined> = this.contractsFacade.getContractsError$;

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'contractType'];
  dataSource: MatTableDataSource<Contract> = new MatTableDataSource<Contract>();

  searchTermControl = new FormControl<string>('', { nonNullable: true });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly contractsFacade: ContractsFacade) {
  }

  ngOnInit(): void {
    this.contractsFacade.getContracts();

    this.searchTermControl.valueChanges.subscribe(value => this.applyFilter(value))

    this.contractsFacade.allContracts$.subscribe((contracts) => this.dataSource.data = contracts)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(term: string) {
    this.contractsFacade.getContracts({ term });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
