import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() userID: number;
  @Output() customerID = new EventEmitter<number>();
  customer: Customer;
  customerUpdateForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomerByUserID();
  }

  getCustomerByUserID(): void {
    this.customerService.getByUserID(this.userID).subscribe(
      (response) => {
        this.customer = response.data;
        this.customerID.emit(this.customer.customerId);
        this.createCustomerUpdateForm();
      },
      (responseError) => {}
    );
  }

  createCustomerUpdateForm(): void {
    this.customerUpdateForm = this.formBuilder.group({
      customerID: [this.customer.customerId],
      userID: [this.userID],
      companyName: [this.customer.companyName, Validators.required],
      phoneNumber: [this.customer.phoneNumber, Validators.required],
      address: [this.customer.address, Validators.required],
    });
  }

  updateCustomer(): void {
    if (this.customerUpdateForm.valid) {
      this.customerUpdateForm.addControl("FindeksScore",new FormControl(this.customer.findeksScore))
      const customerModel = Object.assign({}, this.customerUpdateForm.value);
      this.customerService.update(customerModel).subscribe(
        (response) => {
          this.toastrService.success('Müşteri Bilgileri Güncellendi')
          setTimeout(function(){
            location.reload()
          },400)
        },
        (responseError) => {
          console.log(responseError.error)
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}
