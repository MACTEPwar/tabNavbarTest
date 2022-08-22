import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TestView2Component } from 'src/app/views/test-view2/test-view2.component';
import { DynamicTab } from '../dynamic-tab';
import { TestView1Component } from './../../../views/test-view1/test-view1.component';
import { DynamicTabService } from './../dynamic-tab.service';

@Component({
  selector: 'app-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.scss'],
})
export class DynamicTabComponent implements OnInit {
  @ViewChild('contentContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;
  tabs: Observable<Array<DynamicTab>>;
  // context: ModalContext<any>;
  constructor(
    private dynamicTabService: DynamicTabService,
    private resolver: ComponentFactoryResolver
  ) {
    this.tabs = dynamicTabService.tabs;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dynamicTabService.registerParentContainer(this.container);
    this.dynamicTabService.open('').toPromise();

    // this.dynamicTabService.open2('').subscribe((res) => console.log);
    // this.test(TestView1Component);
  }

  linkToTab(guid: string): void {
    this.dynamicTabService.linkToTab(guid);
  }

  close(guid: string): void {
    this.dynamicTabService.close(guid);
  }

  test(): void {
    this.dynamicTabService.open('/t2').toPromise();
  }
}
