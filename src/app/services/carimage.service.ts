import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl='https://localhost:44303/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>> {
    return this.httpClient
      .get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getall');
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    return this.httpClient
    .get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getallbycarid?carId=' + carId)
  }

  addImage(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carimages/add', formData);
  }

  updateImage(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'carimages/update', formData);
  }

  deleteImage(imageModel: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'delete',
      imageModel
    );
  }

}
