import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { CarAddComponent } from '../../car-components/car-add/car-add.component';
import { CarUpdateComponent } from '../../car-components/car-update/car-update.component';

@Component({
  selector: 'app-admin-car',
  templateUrl: './admin-car.component.html',
  styleUrls: ['./admin-car.component.css']
})
export class AdminCarComponent implements OnInit {

  cars: CarDto[];
    cols: any[];

    constructor(
      private carService: CarService,
      private config: PrimeNGConfig,
      private confirmationService: ConfirmationService,
      private dialogService: DialogService,
      private toastrService: ToastrService) { }

    ngOnInit() {
        this.getCars();
        this.setColumns();
        this.setConfig();
    }

    getCars(){
      this.carService.getCarsDetails().subscribe(response => this.cars = response.data);
    }

    setColumns(){
      this.cols = [
        { field: 'id', header: 'No' },
        { field: 'description', header: 'Araba'},
        { field: 'brand', header: 'Marka' },
        { field: 'color', header: 'Renk' },
        { field: 'modelYear', header: 'Model'},
        { field: 'dailyPrice', header: 'G.Fiyat'},
        { field: 'abs', header: 'ABS'},
        { field: 'fuel', header: 'Yakıt'},
        { field: 'gear', header: 'Vites'},
        { field: 'parkingSensor', header: 'Park Sensörü'}
    ];
    }

    setConfig(){
      this.config.filterMatchModeOptions = {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.DATE_IS,
            FilterMatchMode.DATE_IS_NOT,
            FilterMatchMode.DATE_BEFORE,
            FilterMatchMode.DATE_AFTER
        ]
      }
    }

    delete(car:CarDto) {
      this.confirmationService.confirm({
          message:'<br> <strong> ' + car.modelYear + ' ' +car.description + ' </strong> adlı arabayı silmek istediğinize emin misiniz?',
          accept: () => {
            
            let deletedCar:Car = {id:car.id};
            this.carService.deleteCar(deletedCar).subscribe(response => {
              this.toastrService.success(response.message,"Başarılı")
              setTimeout(function(){
                location.reload()
              },400)
            })
          }
      });
    }

    update(car:CarDto){
      const ref = this.dialogService.open(CarUpdateComponent, {
        data: {
          carDetail: car
        },
        header: '',
        width: '80%',
        styleClass:'dlgCSS'
      });
    }

    add() {
      const ref = this.dialogService.open(CarAddComponent, {

          width: '30%',
          styleClass:'dlgCSS'
      });
    }

}
