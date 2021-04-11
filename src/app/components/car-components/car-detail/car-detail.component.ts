import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carimage';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carimage.service';
import { RentalComponent } from '../../rental/rental.component';
import { CarUpdateComponent } from '../car-update/car-update.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  isAdmin:boolean;
  carImages: CarImage[] = [];
  carImagePaths: string[] = [];
  car: CarDto;
  dataLoaded = false;
  isLogged:Boolean;
  imageUrl = "https://localhost:44303/";
  constructor(private carService: CarService,
    private carImageService: CarImageService, 
    private activatedRoute:ActivatedRoute,
    private dialogService: DialogService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
    this.setIsLogged()
    this.setIsAdmin()
  }
  getCarDetail(carId:number) {
    this.carService.getCarsDetails(undefined,undefined,carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImages(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  update(car:CarDto){
    const ref = this.dialogService.open(CarUpdateComponent, {
      data: {
        carDetail: car
      },
      width: '80%',
      styleClass:'dlgCSS'
    });
  }

  rent(){
    const ref = this.dialogService.open(RentalComponent, {
      data: {
        carId: this.car.id
      },
      width: '30%',
      styleClass:'dlgCSS'
    });
  }

  setIsLogged(){
    this.isLogged = this.authService.loggedIn()
  }

  async setIsAdmin(){
    this.isAdmin = await this.authService.haveRole("admin")
  }


}
