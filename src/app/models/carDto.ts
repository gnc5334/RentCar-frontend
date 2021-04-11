export interface CarDto
{
   id:number;
   description:string;
   brandName:string;
   colorName:string;
   dailyPrice:number;
   modelYear:number;
   previewImagePath:string;
   minFindeksScore?:number;
   abs:number;
   fuel:number;
   gear:number;
   parkingSensor:number;
   status?:boolean;
}