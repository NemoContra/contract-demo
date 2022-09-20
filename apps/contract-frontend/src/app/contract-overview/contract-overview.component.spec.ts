import { ContractOverviewComponent } from './contract-overview.component';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ContractsFacade } from './+state/contracts.facade';
import { FilterResult } from '@contract-demo/api-interfaces';
import { Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';

describe('ContractOverviewComponent', () => {
  let spectator: Spectator<ContractOverviewComponent>;
  let loader: HarnessLoader;

  const contractsFacadeMock = {
    getContracts: jest.fn(),
    allContracts$: new Subject<FilterResult | undefined>(),
    loaded$: new Subject<boolean>(),
    getContractsError$: new Subject<number | undefined>(),
  };

  const createComponent = createRoutingFactory({
    component: ContractOverviewComponent,
    imports: [
      ReactiveFormsModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
    ],
    providers: [
      {
        provide: ContractsFacade,
        useValue: contractsFacadeMock,
      },
    ],
    detectChanges: false,
  });

  it('should show correct initial headline and table', () => {
    spectator = createComponent();
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should show correct contracts content within the table', async () => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    spectator.detectChanges();
    contractsFacadeMock.allContracts$.next(mockContracts);
    contractsFacadeMock.loaded$.next(true);
    contractsFacadeMock.getContractsError$.next(undefined);
    spectator.detectChanges();
    const table = await loader.getHarness(MatTableHarness);

    const rows = await table.getRows();

    expect(rows.length).toEqual(2);
    const row1 = await rows[0].getCells();
    expect(row1.length).toEqual(4);
    expect(await row1[0].getText()).toEqual('1');
    expect(await row1[1].getText()).toEqual('Arya');
    expect(await row1[2].getText()).toEqual('Skywalker');
    expect(await row1[3].getText()).toEqual('bAV');

    const row2 = await rows[1].getCells();
    expect(row2.length).toEqual(4);
    expect(await row2[0].getText()).toEqual('2');
    expect(await row2[1].getText()).toEqual('Bart');
    expect(await row2[2].getText()).toEqual('Stark');
    expect(await row2[3].getText()).toEqual('Krankenversicherung');

    const paginator = await loader.getHarness(MatPaginatorHarness);

    expect(await paginator.getRangeLabel()).toEqual('1 – 2 of 2');
    expect(await paginator.getPageSize()).toEqual(5);
  });

  it('should show a loading spinner while content is loading', async () => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    contractsFacadeMock.loaded$.next(false);
    spectator.detectChanges();

    expect(await loader.getHarness(MatProgressSpinnerHarness)).not.toBeNull();

    contractsFacadeMock.loaded$.next(true);
    spectator.detectChanges();

    expect(spectator.query('mat-spinner')).toBeNull();
  });

  it('should show correct error message', () => {
    spectator = createComponent();
    spectator.detectChanges();
    contractsFacadeMock.getContractsError$.next(500);
    spectator.detectChanges();

    expect(spectator.query('table')).toBeNull();
    expect(spectator.query('.error')?.textContent).toEqual(
      'Search failed with HTTP-Error 500'
    );
  });
});

const mockContracts: FilterResult = {
  contracts: [
    {
      id: '1',
      person: {
        lastname: 'Skywalker',
        firstname: 'Arya',
      },
      type: 'bAV',
    },
    {
      id: '2',
      person: {
        lastname: 'Stark',
        firstname: 'Bart',
      },
      type: 'Krankenversicherung',
    },
  ],
  totalElements: 2,
};
