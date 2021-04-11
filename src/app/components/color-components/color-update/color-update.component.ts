import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color: Color;
  colorUpdateForm: FormGroup;

  constructor(    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getColors()
    this.createColorUpdateForm()
  }

  getColors(){
    this.color = this.config.data.color
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      id: [{value:this.color.id, disabled:true}],
      name: [this.color.colorName,Validators.required],
    })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel:Color = Object.assign({},this.colorUpdateForm.getRawValue())
      this.colorService.updateColor(colorModel).subscribe(response=>{
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
