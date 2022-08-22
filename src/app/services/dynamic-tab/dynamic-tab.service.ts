import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector, ViewContainerRef
} from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { generateGuidv4 } from 'src/app/helpers/guid-helper';
import { DynamicTab } from './dynamic-tab';
import { DynamicTabContext } from './dynamic-tab.context';
import { routes } from './routes';

@Injectable()
export class DynamicTabService {
  public tabs: BehaviorSubject<Array<DynamicTab>> = new BehaviorSubject<
    Array<DynamicTab>
  >([]);

  public components: ComponentRef<any>[] = [];

  private parentContainer: ViewContainerRef | null = null;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  registerParentContainer(container: ViewContainerRef): void {
    this.parentContainer = container;
  }

  open(path: string, linkToNewTab = true): Observable<any> {
    if (!this.parentContainer) {
      return throwError('No view container');
    }

    const route = routes.find((f) => f.path === path);
    const injector = Injector.create({
      providers: [{ provide: DynamicTabContext }],
    });
    const context = injector.get(DynamicTabContext);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      route.component
    );
    const newComp = this.parentContainer.createComponent(factory, 0, injector);

    const newGuid = generateGuidv4();

    context.id = newGuid;

    this.addTabToArray(newGuid, { title: route.title });

    this.components.push(newComp);

    this.hideAll();

    if (linkToNewTab) {
      this.activateTab(newGuid);
    }

    return context.show();
  }

  linkToTab(guid: string): void {
    this.hideAll();
    this.activateTab(guid);
  }

  close(guid: string): void {
    const component = this.components.find(
      (f) => f.injector.get(DynamicTabContext).id === guid
    ) as ComponentRef<any>;

    const ctx = component.injector.get(DynamicTabContext);

    this.deactivateTab(guid);

    this.destroyTab(component, guid);

    ctx.reject();
  }

  private addTabToArray(guid: string, options: any = {}): void {
    const n = new DynamicTab(guid, { title: options.title });
    this.tabs.next([...this.tabs.getValue(), n]);
  }

  private removeTabFromArray(guid: string): void {
    this.tabs.next(this.tabs.getValue().filter((f) => f.id !== guid));
  }

  private destroyTab(component: ComponentRef<any>, guid: string): void {
    component.destroy();
    this.removeTabFromArray(guid);
  }

  private hideAll(): void {
    this.components.forEach((f) => {
      const vcr: ViewContainerRef = f.injector.get(ViewContainerRef);
      vcr.element.nativeElement.style.setProperty('display', 'none');
    });

    this.tabs.getValue().forEach((f) => (f.isActive = false));
  }

  private activateTab(guid: string): void {
    const vcr: ViewContainerRef = (
      this.components.find(
        (f) => f.injector.get(DynamicTabContext).id === guid
      ) as ComponentRef<any>
    ).injector.get(ViewContainerRef);
    vcr.element.nativeElement.style.setProperty('display', 'block');

    this.tabs.getValue().find((f) => f.id === guid)!.isActive = true;
  }

  private deactivateTab(guid: string): void {
    const tempTabs = this.tabs.getValue();
    // если табов больше чем 1
    if (tempTabs.length > 1) {
      const currTabInd = tempTabs.findIndex((f) => f.id === guid);
      // если таб первый
      if (currTabInd === 0) {
        this.linkToTab(tempTabs[1].id);
      } else {
        this.linkToTab(tempTabs[currTabInd - 1].id);
      }
    }
  }
}
