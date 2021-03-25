
export interface Rental
{

    carName:string;

    id?:number,
    carId:number,
    brandName:string,
    colorName:string,
    userName?:string;
    companyName?:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    rentDate:Date,
    returnDate:Date,
    customerId?:number,
}