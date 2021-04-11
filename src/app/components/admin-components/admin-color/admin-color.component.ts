import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { ColorAddComponent } from '../../color-components/color-add/color-add.component';
import { ColorUpdateComponent } from '../../color-components/color-update/color-update.component';

@Component({
  selector: 'app-admin-color',
  templateUrl: './admin-color.component.html',
  styleUrls: ['./admin-color.component.css']
})
export class AdminColorComponent implements OnInit {

  colors: Color[];
  cols: any[];

  constructor(
    private colorService: ColorService,
    private config: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private toastrService: ToastrService) { }

  ngOnInit() {
      this.getColors();
      this.setColumns();
      this.setConfig();
  }

  getColors(){
    this.colorService.getColors().subscribe(response => this.colors = response.data);
  }

  setColumns(){
    this.cols = [
      { field: 'id', header: 'No' },
      { field: 'name', header: 'Renk' },
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

  delete(color:Color) {
    this.confirmationService.confirm({
        message: '<br> <strong> ' + color.colorName + ' </strong> rengi silmek istediğinize emin misiniz?',
        icon: 'fa fa-question-circle',
        header: 'Renk Silme İşlemi ',
        accept: () => {
          this.colorService.deleteColor(color).subscribe(response => {
            this.toastrService.success(response.message,"Başarılı")
            setTimeout(function(){
              location.reload()
            },400)
          })
        }
    });
  }

  update(color:Color) {
    const ref = this.dialogService.open(ColorUpdateComponent, {
      data: {
        color: color
      },
      header: '',
      width: '30%',
      styleClass:'dlgCSS'
    });
  }

  add() {
    const ref = this.dialogService.open(ColorAddComponent, {
        header: '',
        width: '30%',
        styleClass:'dlgCSS'
    });
  }

}
