import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';


const routes: Routes = [
    // { path: '', component: HomePage }
    { path: '', component: LoginPage }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginPageRoutingModule {
    // static components = [HomePage];
}
