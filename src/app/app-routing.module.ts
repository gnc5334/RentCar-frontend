import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-components/car-detail/car-detail.component';
import { CarComponent } from './components/car-components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { ProfileComponent } from './components/profile-components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:HomepageComponent},
  {path:"cars", component:CarComponent},
  {path:"cardetails/:carId", component:CarDetailComponent},
  {path:"rental/:carId", component:RentalComponent,canActivate:[LoginGuard]},
  {path:"creditcard/:rental", component:CreditCardComponent,canActivate:[LoginGuard]},
  {path:"homepage", component:HomepageComponent},
  {path:"contact", component:ContactComponent},
  {path:"about", component:AboutComponent},
  {path: "admin", component: AdminComponent,canActivate:[AdminGuard]},
  {path: "profile", component:ProfileComponent,canActivate:[LoginGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
