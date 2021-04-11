import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'filtercar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: CarDto[], filterText:string): CarDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value
    .filter((p:CarDto) => p.description.toLocaleLowerCase().indexOf(filterText) !== -1) 
    : value;
  }

}
