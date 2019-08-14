import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatProgressBarModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

const MODULES = [
  FlexLayoutModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  CommonModule,
  MatTabsModule,
  MatSidenavModule,
  MatCardModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatRadioModule,
  MatInputModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MODULES
  ],
  exports: [
    MODULES,
  ]
})
export class AngularMaterialModule { }
