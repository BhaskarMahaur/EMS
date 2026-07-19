import { body } from "express-validator";


export const employeeValidator = [

  body("employeeId")
    .notEmpty()
    .withMessage("Employee ID is required"),


  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
      min:3
    })
    .withMessage(
      "Name must be at least 3 characters"
    ),


  body("email")
    .notEmpty()
    .withMessage(
      "Email is required"
    )
    .isEmail()
    .withMessage(
      "Invalid email format"
    ),


  body("phone")
    .notEmpty()
    .withMessage(
      "Phone is required"
    )
    .isLength({
      min:10,
      max:10
    })
    .withMessage(
      "Phone must be 10 digits"
    ),


  body("salary")
    .isNumeric()
    .withMessage(
      "Salary must be a number"
    )
    .custom(
      (value)=>{
        if(value <= 0){
          throw new Error(
            "Salary must be greater than zero"
          );
        }

        return true;
      }
    ),


  body("role")
    .isIn([
      "Super Admin",
      "HR Manager",
      "Employee"
    ])
    .withMessage(
      "Invalid role"
    )

];