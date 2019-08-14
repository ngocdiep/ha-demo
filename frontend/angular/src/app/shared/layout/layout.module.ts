import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
  ]
})
export class LayoutModule { }
