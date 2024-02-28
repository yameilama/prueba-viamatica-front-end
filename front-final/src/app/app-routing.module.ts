import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { RoleGuard } from "./role-guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //  { path: 'welcome', component: WelcomeComponent },
    // { path: 'dashboard', component: WelcomeComponent }
    { path: 'welcome', component: WelcomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'USUARIO' } },
    { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMINISTRADOR' } },
    { path: 'unauthorized', component: UnauthorizedComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}