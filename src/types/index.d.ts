interface IEmployeeAddresses {
  streetName: string;
  postalCode: string;
  apartmentNumber: number;
  state: string;
  country: string;
}
interface IEmployeeFields {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  addresses?: [IEmployeeAddresses];
}
