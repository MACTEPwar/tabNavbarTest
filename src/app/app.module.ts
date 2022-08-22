import { DynamicTabModule } from './services/dynamic-tab/dynamic-tab.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestView1Component } from './views/test-view1/test-view1.component';
import { TestView2Component } from './views/test-view2/test-view2.component';
import { RouteServiceModule } from './services/route-service/route-service.module';

@NgModule({
  declarations: [AppComponent, TestView1Component, TestView2Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicTabModule,
    RouteServiceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
