import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  filterCarText:string;
  cars: CarDto[] = [];
  carImages: CarImage[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=>{
      this.getCarsDetails(params["brands"],params["colors"])
    })
  }


  getCarsDetails(brands:number[],colors:number[]) {
    this.carService.getCarsDetails(brands, colors).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.setPreviewImages(this.cars)
    });
  }

  getCarImages(){
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
    });
  }

  setPreviewImages(cars:CarDto[]){
    cars.forEach(car => {
      this.carImageService.getCarImageByCarId(car.id).subscribe((response) => {
        car.previewImagePath = "https://localhost:44303/" + response.data[0].imagePath;
      });
    });
  }


}
