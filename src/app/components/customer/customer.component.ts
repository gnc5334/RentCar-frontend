import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers : Customer[] = [];
  currentCustomer:Customer;
  dataLoaded=false;

  title = 'Müşteriler';
  message: string;
  success: boolean;
  customerToDelete: Customer;

  
  constructor(private customerService:CustomerService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
        this.customers = response.data;
        this.message = response.message;
        this.success = response.success;
        this.dataLoaded = true;
    })
  }

  deleteCustomer() {
    this.customerService.delete(this.customerToDelete).subscribe(() => {
      this.toastrService.success('Musteri bilgileri silindi');
      document.getElementById('deleteCustomerModal').click();
      this.customerToDelete = void 0;
    });
  }

  setCustomerToDelete(customer: Customer): void {
    this.customerToDelete = customer;
  }



}
