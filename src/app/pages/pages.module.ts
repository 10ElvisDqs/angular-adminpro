import {     NgModule         } from '@angular/core';
import {     CommonModule     } from '@angular/common';
import {     RouterModule     } from '@angular/router';
import {     FormsModule      } from '@angular/forms';



import {     SharedModule     } from '../shared/shared.module';
import {    ComponetsModule   } from '../components/componets.module';

import {   DashboardComponent } from './dashboard/dashboard.component';
import {   ProgressComponent  } from './progress/progress.component';
import {   Grafica1Component  } from './grafica1/grafica1.component';
import {   PagesComponent     } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObservableComponent } from './observable/observable.component';
import { RxjsComponent } from './rxjs/rxjs.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObservableComponent,
    RxjsComponent,
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObservableComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponetsModule,

  ]
})
export class PagesModule { }
