import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand-components/brand/brand.component';
import { ColorComponent } from './components/color-components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FilterBrandPipe } from './pipes/filterbrand-pipe.pipe';
import { FilterColorPipe } from './pipes/filtercolor-pipe.pipe';
import { BrandAddComponent } from './components/brand-components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-components/color-add/color-add.component';
import { LoginComponent } from './components/sign-components/login/login.component';
import { RegisterComponent } from './components/sign-components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreditCardComponent } from './components/creditcard/creditcard.component';
import { CarComponent } from './components/car-components/car/car.component';
import { CarDetailComponent } from './components/car-components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car-components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-components/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand-components/brand-update/brand-update.component';
import { FilterCarPipe } from './pipes/filtercar.pipe';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserInfosComponent } from './components/profile-components/user-infos/user-infos.component';
import { ChangePasswordComponent } from './components/profile-components/change-password/change-password.component';
import { ProfileComponent } from './components/profile-components/profile/profile.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { AdminBrandComponent } from './components/admin-components/admin-brand/admin-brand.component';
import { AdminCarComponent } from './components/admin-components/admin-car/admin-car.component';
import { AdminColorComponent } from './components/admin-components/admin-color/admin-color.component';
import { ColorUpdateComponent } from './components/color-components/color-update/color-update.component';
import { CarImagesComponent } from './components/car-components/car-images/car-images.component';
import { RentalDetailComponent } from './components/rental/rental-detail/rental-detail.component';
import { CustomerAddComponent } from './components/customer/customer-add/customer-add.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    CarDetailComponent,
    RentalComponent,
    NaviComponent,
    VatAddedPipe,
    FilterPipePipe,
    FilterBrandPipe,
    FilterColorPipe,
    CarAddComponent,
    CarUpdateComponent,
    BrandAddComponent,
    ColorAddComponent,
    LoginComponent,
    RegisterComponent,
    CreditCardComponent,
    BrandUpdateComponent,
    FilterCarPipe,
    HomepageComponent,
    UserInfosComponent,
    ChangePasswordComponent,
    ProfileComponent,
    AdminComponent,
    AdminBrandComponent,
    AdminCarComponent,
    AdminColorComponent,
    ColorUpdateComponent,
    CarImagesComponent,
    RentalDetailComponent,
    CustomerAddComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    CarouselModule,
    ButtonModule,
    CardModule,
    SplitButtonModule,
    MenuModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    DynamicDialogModule,
    PasswordModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},
    DatePipe,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
