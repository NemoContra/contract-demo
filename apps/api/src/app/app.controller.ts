import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { ContractType, FilterResult } from '@contract-demo/api-interfaces';
import { delay, Observable, of } from 'rxjs';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contracts')
  getData(
    @Query('term') term: string | undefined,
    @Query('contract-type') type: ContractType | undefined
  ): Observable<FilterResult> {
    return of(this.appService.getContracts(term, type)).pipe(delay(500));
  }
}
