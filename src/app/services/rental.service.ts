import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44303/api/';

  constructor(
    private httpClient: HttpClient,
    private customerService: CustomerService) { }

  getAllRentalDetail():Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "rentals/getallrentaldetails"
    return this.httpClient
      .get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getallbycarid?carid=" + carId
    return this.httpClient
    .get<ListResponseModel<Rental>>(newPath);
  }
  
  addRental(rental:Rental){
    let newPath = this.apiUrl + "rentals/add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  getLastByCarId(carId:number):Observable<Rental>{
    let newPath = this.apiUrl + "rentals/getlastbycarid?carid=" + carId
    return this.httpClient.get<Rental>(newPath);
  }

  getAllByCustomerID(id: number): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      this.apiUrl + 'rentals/getallbycustomerid?customerId=' + id
    );
  }


  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
