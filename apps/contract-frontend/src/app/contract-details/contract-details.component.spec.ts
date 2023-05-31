import { ContractDetailsComponent } from './contract-details.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { Subject } from "rxjs";
import { GroupcontractOverviewData } from "@contract-demo/api-interfaces";
import { createRoutingFactory, Spectator } from "@ngneat/spectator/jest";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatProgressSpinnerHarness } from "@angular/material/progress-spinner/testing";
import { ContractDetailsFacade } from "./+state/contract-details.facade";

describe('ContractDetailsComponent', () => {
  let spectator: Spectator<ContractDetailsComponent>;
  let loader: HarnessLoader;

  const contractDetailsFacadeMock = {
    getContractDetailsData: jest.fn(),
    contractDetailsData$: new Subject<GroupcontractOverviewData | undefined>(),
    getContractDetailsLoading$: new Subject<boolean>(),
    getContractDetailsError$: new Subject<number | undefined>(),
  };

  const createComponent = createRoutingFactory({
    component: ContractDetailsComponent,
    imports: [
      MatProgressSpinnerModule,
    ],
    providers: [
      {
        provide: ContractDetailsFacade,
        useValue: contractDetailsFacadeMock,
      },
    ],
    detectChanges: false,
  });

  it('should show correct data', () => {
    spectator = createComponent();
    spectator.detectChanges();
    contractDetailsFacadeMock.contractDetailsData$.next(mockContractDetailsData);
    contractDetailsFacadeMock.getContractDetailsLoading$.next(false);
    contractDetailsFacadeMock.getContractDetailsError$.next(undefined);
    spectator.detectChanges();
    expect(spectator.fixture).toMatchSnapshot();

    expect(spectator.query('.title-container h1')).toHaveText('ID-1');
    expect(spectator.query('.data-container p')).toHaveText('this is a nice description of the data.');
  });

  it('should show a loading spinner while content is loading', async () => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    spectator.detectChanges();
    contractDetailsFacadeMock.getContractDetailsLoading$.next(true);
    spectator.detectChanges();

    expect(await loader.getHarness(MatProgressSpinnerHarness)).not.toBeNull();

    contractDetailsFacadeMock.getContractDetailsLoading$.next(false);
    spectator.detectChanges();

    expect(spectator.query('mat-spinner')).toBeNull();
  });

  it('should show correct error message', () => {
    spectator = createComponent();
    spectator.detectChanges();
    contractDetailsFacadeMock.getContractDetailsError$.next(500);
    spectator.detectChanges();

    expect(spectator.query('.title-container')).toBeNull();
    expect(spectator.query('.data-container')).toBeNull();
    expect(spectator.query('.loading')).toBeNull();
    expect(spectator.query('.error')?.textContent).toEqual(
      'Search failed with HTTP-Error 500'
    );
  });
});

const mockContractDetailsData: GroupcontractOverviewData =
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
