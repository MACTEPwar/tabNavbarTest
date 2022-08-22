import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { RouteCustomStrategyService } from './route-custom-strategy.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteCustomStrategyService,
    },
  ],
})
export class RouteServiceModule {}
