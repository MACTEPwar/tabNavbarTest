import { DynamicTabService } from './dynamic-tab.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTabComponent } from './dynamic-tab/dynamic-tab.component';

@NgModule({
  declarations: [DynamicTabComponent],
  imports: [CommonModule],
  providers: [DynamicTabService],
  exports: [DynamicTabComponent],
})
export class DynamicTabModule {}
