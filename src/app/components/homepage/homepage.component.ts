import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  responsiveOptions:any;
  cars:CarDto[];
  constructor(
    private carService:CarService,
    private carImageService:CarImageService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit(): void {
    this.getCarsDetails()
  }

  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.cars = response.data.slice(0,10);
      this.setPreviewImages(this.cars)
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
