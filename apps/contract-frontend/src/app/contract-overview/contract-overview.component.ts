import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContractsFacade } from './+state/contracts.facade';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Contract, FilterResult } from '@contract-demo/api-interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'contract-demo-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  filterResult$: Observable<FilterResult | undefined> =
    this.contractsFacade.allContracts$;
  loading$: Observable<boolean> = this.contractsFacade.loading$;
  isError$: Observable<number | undefined> =
    this.contractsFacade.getContractsError$;

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'contractType'];
  dataSource: MatTableDataSource<Contract> = new MatTableDataSource<Contract>();

  searchTermControl = new FormControl<string>('', { nonNullable: true });

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private destroy$ = new Subject<void>();

  constructor(private readonly contractsFacade: ContractsFacade) {}

  ngOnInit(): void {
    this.contractsFacade.getContracts();

    this.searchTermControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchterm: string) => this.applyFilter(searchterm));

    this.contractsFacade.allContracts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (filterResult) => (this.dataSource.data = filterResult?.contracts)
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  applyFilter(term: string): void {
    this.contractsFacade.getContracts({ term });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
