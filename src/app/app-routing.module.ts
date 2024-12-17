import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/*
  Please check the article below for understanding how to structure modules
  https://medium.com/swlh/angular-organizing-features-and-modules-e582611a720e
*/

const routes: Routes = [
  { path: '', redirectTo: 'tab', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/example-feature/example-feature.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tab',
    loadChildren: () => import('./pages/tab/tab.module').then(m => m.TabPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then(m => m.Tab1PageModule)
  },



  // {
  //   path: 'pages',
  //   loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
