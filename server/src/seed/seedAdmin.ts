import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Employee, {
  Role,
  Status
} from "../models/Employee";

import connectDB from "../config/db";


const seedAdmin = async () => {

  try {

    await connectDB();


    const existingAdmin =
      await Employee.findOne({
        role: Role.SUPER_ADMIN
      });


    if (existingAdmin) {

      console.log(
        "Super Admin already exists"
      );

      process.exit(0);
    }


    const admin = await Employee.create({

      employeeId: "EMP001",

      name: "Super Admin",

      email: "admin@test.com",

      password: "123456",

      phone: "9999999999",

      department: "Management",

      designation: "System Administrator",

      salary: 100000,

      joiningDate: new Date(),

      status: Status.ACTIVE,

      role: Role.SUPER_ADMIN

    });


    console.log(
      "✅ Super Admin created"
    );

    console.log({
      email: admin.email,
      password: "123456"
    });


    process.exit(0);


  } catch(error) {

    console.error(
      "❌ Seed failed",
      error
    );

    process.exit(1);

  }

};


seedAdmin();