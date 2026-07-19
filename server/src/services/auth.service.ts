import Employee from "../models/Employee";


export const loginUser = async (
  email: string,
  password: string
) => {

  // Find employee by email
  const employee = await Employee.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });


  if (!employee) {
    throw new Error(
      "Invalid email or password"
    );
  }


  // Compare entered password
  const isPasswordValid =
    await employee.comparePassword(password);


  if (!isPasswordValid) {
    throw new Error(
      "Invalid email or password"
    );
  }


  return employee;
};