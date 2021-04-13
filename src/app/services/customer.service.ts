import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44303/api/';

  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getall'
    return this.httpClient
      .get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(id:number):Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getbyid?id=" + id
    return this.httpClient
    .get<SingleResponseModel<Customer>>(newPath)
  }

  getByUserID(id: number): Observable<SingleResponseModel<Customer>> {
    return this.httpClient.get<SingleResponseModel<Customer>>(
      this.apiUrl + 'customers/getbyuserid?id=' + id
    );
  }

  add(customerModel: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'customers/add',
      customerModel
    );
  }

  update(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update"
    return this.httpClient
    .put<ResponseModel>(newPath,customer)
  }

  delete(customerModel: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'customers/delete',
      customerModel
    );
  }

}
