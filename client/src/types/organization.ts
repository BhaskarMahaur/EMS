export interface OrganizationEmployee {

  _id:string;

  name:string;

  email:string;

  role:string;

  department:string;

  designation:string;

  reportingManager?:string;

  children:OrganizationEmployee[];

}