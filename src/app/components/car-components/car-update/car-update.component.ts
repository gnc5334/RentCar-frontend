import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup;

  brands: Brand[];
  colors: Color[];

  carDetail: CarDto;

  selectedBrand: string;
  selectedColor: string;
  selectedFuel: string;
  selectedGear: string;
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private colorService:ColorService,
    private carService:CarService,
    private config: DynamicDialogConfig,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCar()
    this.createCarUpdateForm()
    this.getBrands()
    this.getColors()
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id: [{value:this.carDetail.id,disabled:true}],
      brand: [this.carDetail.brandName, Validators.required],
      color: [this.carDetail.colorName, Validators.required],
      modelYear: [this.carDetail.modelYear, Validators.required],
      dailyPrice: [this.carDetail.dailyPrice, Validators.required],
      description: [this.carDetail.description, Validators.required],
      abs: [this.carDetail.colorName, Validators.required],
      fuel: [this.carDetail.modelYear, Validators.required],
      gear: [this.carDetail.dailyPrice, Validators.required],
      parkingSensor: [this.carDetail.description, Validators.required],
      minFindeksScore: [this.carDetail.minFindeksScore,  [Validators.required, Validators.min(0), Validators.max(1900)]]
    })
  }

  getCar(){
    this.carDetail = this.config.data.carDetail
    this.selectedBrand = this.carDetail.brandName
    this.selectedColor = this.carDetail.colorName
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      this.carUpdateForm.addControl("brandId",new FormControl(this.carUpdateForm.get("brand").value.id, Validators.required))
      this.carUpdateForm.addControl("colorId",new FormControl(this.carUpdateForm.get("color").value.id, Validators.required))
      let carModel:Car = Object.assign({},this.carUpdateForm.getRawValue())
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(function(){
          location.reload()
        },400)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i = 0;i < responseError.error.ValidationErrors.length;i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
      
    }else{
      this.toastrService.error("Formu doldurmanız gerekli","Hata")
    }
  }

}
