import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';
import { Tab1Page } from '../tab1/tab1.page'

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'tab1',
        // loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
        component: Tab1Page
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'add-profile',
        loadChildren: () => import('../add-profile/add-profile.module').then(m => m.AddProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule { }
