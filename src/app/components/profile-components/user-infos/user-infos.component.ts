import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { Customer } from 'src/app/models/customer';
import { PasswordChangeModel } from 'src/app/models/passwordChangeModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit {

  user: User;
  updateUserForm: FormGroup;
  passwordUpdateForm: FormGroup;
  customer: Customer;
  customerID: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getUser(this.authService.getCurrentUserId());
    });

    this.createPasswordUpdateForm();
  }

  createUpdateUserForm(): void {
    this.updateUserForm = this.formBuilder.group({
      userID: [this.user.id],
      email: [this.user.email, [Validators.required, Validators.email]],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
    });
  }

  createPasswordUpdateForm(){
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  updateUser(): void {
    if (this.updateUserForm.valid) {
      this.updateUserForm.addControl("id",new FormControl(this.user.id))
      const userModel: User = Object.assign(this.updateUserForm.value);
      this.userService.updateInfos(userModel).subscribe(
        (response) => {
          this.toastrService.success('Kullanıcı güncellendi');
        },
        (responseError) => {
          this.toastrService.error('Hata');
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  getUser(userID: number): void {
    this.userService.getbyid(userID).subscribe((response) => {
      this.user = response.data;
      this.createUpdateUserForm();
    });
  }

  getCustomer(){
    this.customerService.getCustomerById(this.authService.getCurrentUserId()).subscribe(response => {
      this.customer = response.data
    })
  }

  getCustomerID($event: number): void {
    this.customerID = $event;
  }


  updatePassword(){
    if(this.passwordUpdateForm.valid){
      this.passwordUpdateForm.addControl("userId",new FormControl(this.authService.getCurrentUserId()))
      let passwordModel:PasswordChangeModel = Object.assign({},this.passwordUpdateForm.value)
      this.authService.changePassword(passwordModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError => {
        this.toastrService.error(responseError.error.message,"Hata")

      })
    }else{
      this.toastrService.error("Tüm alanları doldurmanız gerekli","Hata")
    }
  }


}
