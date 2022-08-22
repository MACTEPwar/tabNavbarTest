import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tabNavbarTest';

  constructor(private route: ActivatedRoute) {
    console.log(this.route.url);
    console.log(window.location.href);
    // this.route.queryParams.subscribe((params) => {
    //   console.log(params);
    // });
  }
}
