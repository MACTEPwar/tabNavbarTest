import { TestView2Component } from './../../views/test-view2/test-view2.component';
import { TestView1Component } from './../../views/test-view1/test-view1.component';

export const routes: any[] = [
  {
    path: '',
    title: 'test empty',
    component: TestView1Component,
  },

  {
    path: '/t1',
    title: 'test t1',
    component: TestView1Component,
  },

  {
    path: '/t2',
    title: 'test t2',
    component: TestView2Component,
  },
];
