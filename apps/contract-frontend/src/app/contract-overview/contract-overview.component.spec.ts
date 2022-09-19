import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ContractOverviewComponent } from './contract-overview.component';

describe('ContractOverviewComponent', () => {
  let spectator: Spectator<ContractOverviewComponent>;
  const createComponent = createComponentFactory(ContractOverviewComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
