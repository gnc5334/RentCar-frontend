import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44303/api/';

  constructor(private httpClient: HttpClient) { }

  getCarById(id:Number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/GetById?id=" + id
    return this.httpClient
    .get<SingleResponseModel<Car>>(newPath)
  }

  getCarDetailsByCarId(carId:Number):Observable<SingleResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbycarid?id=" + carId
    return this.httpClient
    .get<SingleResponseModel<CarDto>>(newPath)
  }

  getCarsDetails(brands?:number[],colors?:number[],carId?:number):Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    let queryParams = new HttpParams()
    brands?.forEach(element => {
      let brand = String(element)
      queryParams = queryParams.append("brandid",brand)
    });
    colors?.forEach(element => {
      let color = String(element)
      queryParams = queryParams.append("colorid",color)
    })
    return this.httpClient
      .get<ListResponseModel<CarDto>>(newPath, {params: queryParams});
  }

  addCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient
    .post<ResponseModel>(newPath,car)
  }

  deleteCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete"
    return this.httpClient
    .request<ResponseModel>("DELETE",newPath,{
      body: car
    })
  }

  updateCar(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update"
    return this.httpClient
    .put<ResponseModel>(newPath,car)
  }
}
