import mongoose, {
  Schema,
  Document
} from "mongoose";

import bcrypt from "bcrypt";


export enum Role {
  SUPER_ADMIN = "Super Admin",
  HR_MANAGER = "HR Manager",
  EMPLOYEE = "Employee",
}


export enum Status {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}


export interface IEmployee extends Document {

  employeeId: string;

  name: string;

  email: string;

  password: string;

  phone: string;

  department: string;

  designation: string;

  salary: number;

  joiningDate: Date;

  status: Status;

  role: Role;

  reportingManager?: mongoose.Types.ObjectId;

  profileImage?: string;

  isDeleted: boolean;


  comparePassword(
    password: string
  ): Promise<boolean>;

}



const employeeSchema = new Schema<IEmployee>(
{

  employeeId:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },


  name:{
    type:String,
    required:true,
    trim:true
  },


  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },


  password:{
    type:String,
    required:true
  },


  phone:{
    type:String,
    required:true,
    trim:true
  },


  department:{
    type:String,
    required:true
  },


  designation:{
    type:String,
    required:true
  },


  salary:{
    type:Number,
    required:true,
    min:0
  },


  joiningDate:{
    type:Date,
    required:true
  },


  status:{
    type:String,
    enum:Object.values(Status),
    default:Status.ACTIVE
  },


  role:{
    type:String,
    enum:Object.values(Role),
    default:Role.EMPLOYEE
  },


  reportingManager:{
    type:Schema.Types.ObjectId,
    ref:"Employee"
  },


  profileImage:{
    type:String,
    default:null
  },


  isDeleted:{
    type:Boolean,
    default:false
  }


},
{
  timestamps:true
});



// Hash password before saving
employeeSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});


// Compare password during login
employeeSchema.methods.comparePassword =
async function(
  password:string
):Promise<boolean>{

  return bcrypt.compare(
    password,
    this.password
  );

};



const Employee = mongoose.model<IEmployee>(
  "Employee",
  employeeSchema
);


export default Employee;