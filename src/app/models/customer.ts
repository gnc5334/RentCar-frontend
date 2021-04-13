export interface Customer {
  customerId: number;
  userId: number;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  phoneNumber?:string;
  address?:string;
  findeksScore?:number;
}
