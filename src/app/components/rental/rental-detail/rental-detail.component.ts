import { Component, Input, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  @Input() customerID: number;
  rentals: Rental[];
  cars: CarDto[] = [];
  car: CarDto
  baseUrl: string = environment.apiURL;

  constructor(
    private rentalService: RentalService,
    private carImageService: CarImageService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getAllByCustomerID();
  }

  getAllByCustomerID(): void {
    this.rentalService
      .getAllByCustomerID(this.customerID)
      .subscribe((response) => {
        this.rentals = response.data;
        this.getCarDetails();
      });
  }

  getCarDetails(): void {
    this.rentals.forEach((rental) => {
      this.carService.getCarsDetails(undefined,undefined,rental.carId).subscribe((response) => {
        const car = response.data[0];
        this.setPreviewImages(car)
        this.cars.push(car);
      });
    });
  }

  setPreviewImages(car:CarDto){
      this.carImageService.getCarImageByCarId(car.id).subscribe((response) => {
        car.previewImagePath = response.data[0].imagePath;
      });
    
  }

}
