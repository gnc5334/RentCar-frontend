import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44303/api/';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails";
    return  this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailbrandandcolorid?brandId=+" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
