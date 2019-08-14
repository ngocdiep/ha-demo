import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  techStack = `* Tech stack:
  + Backend:
      - nestjs (https://nestjs.com/)
      - postgraphile (https://www.graphile.org/postgraphile/)
      - apollographql (https://www.apollographql.com)
      - node-pg-migrate (https://github.com/salsita/node-pg-migrate)
  + Frontend:
      - Angular 8 (https://angular.io/)
      - Angular Material (https://material.angular.io/)
      - angular/flex-layout (https://github.com/angular/flex-layout)
      - Apollo Angular (https://www.apollographql.com/docs/angular/)`;

  ngOnInit() {
  }

}
