import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
   menu?:any[]=[
    {
      title:'Dashboard',
      icon:'fa-solid fa-gauge',
      sudmenu:[
        {
          icon:'fa-solid fa-house',
          title:'main',
          url:'' },
        {
          icon:'fa-solid fa-spinner',
          title:'progreso',
          url:'progress'
        },
        {
          icon:'fa-solid fa-chart-pie',
          title:'grafica 1',
          url:'grafica1'
        },
        {
          icon:'fa-solid fa-gears',
          title:'account settings',
          url:'account-settings'
        },
      ]
    }

  ]
  constructor() { }
}
