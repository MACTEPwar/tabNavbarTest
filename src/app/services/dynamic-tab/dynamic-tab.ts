import { Type } from '@angular/core';

export class DynamicTab {
  title: string;
  isActive: boolean = false;
  isClosable: boolean = true;

  constructor(public id: string, options: any) {
    this.title = options.title;
  }
}
