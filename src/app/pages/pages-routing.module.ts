import { NgModule                 } from '@angular/core';
import { RouterModule, Routes     } from '@angular/router';
import { AuthGuard                } from '../guards/auth.guard';
import { PagesComponent           } from './pages.component';
import { DashboardComponent       } from './dashboard/dashboard.component';
import { ProgressComponent        } from './progress/progress.component';
import { Grafica1Component        } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent        } from './promises/promises.component';
import { ObservableComponent      } from './observable/observable.component';
import { RxjsComponent            } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    component:PagesComponent,
    children:[
      { path:''                 , component:DashboardComponent       ,data:{ titulo:'Dashboard'      } },
      { path:'progress'         , component:ProgressComponent        ,data:{ titulo:'Progress'       } },
      { path:'grafica1'         , component:Grafica1Component        ,data:{ titulo:'Grafica1'       } },
      { path:'account-settings' , component:AccountSettingsComponent ,data:{ titulo:'AccountSettings'} },
      { path:'promises'         , component:PromisesComponent        ,data:{ titulo:'Promises'       } },
      { path:'observable'       , component:ObservableComponent      ,data:{ titulo:'Observable'     } },
      { path:'rxjs'             , component:RxjsComponent            ,data:{ titulo:'Rxjs'           } },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
