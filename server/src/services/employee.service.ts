import Employee from "../models/Employee";


export const createEmployee = async (
  data:any
) => {

  const existingEmployee =
    await Employee.findOne({
      email:data.email
    });


  if(existingEmployee){

    throw new Error(
      "Employee email already exists"
    );

  }


  const employee =
    await Employee.create(data);


  return employee;

};



export const getEmployees = async (
  query:any
) => {


  const {
    search,
    department,
    role,
    status,
    sortBy,
    order,
    page = 1,
    limit = 10
  } = query;



  const filter:any = {
    isDeleted:false
  };



  // Search

  if(search){

    filter.$or = [

      {
        name:{
          $regex:search,
          $options:"i"
        }
      },

      {
        email:{
          $regex:search,
          $options:"i"
        }
      }

    ];

  }



  // Filters

  if(department){

    filter.department = department;

  }


  if(role){

    filter.role = role;

  }


  if(status){

    filter.status = status;

  }



  // Pagination

  const pageNumber =
    Number(page);


  const limitNumber =
    Number(limit);


  const skip =
    (pageNumber - 1)
    *
    limitNumber;



  // Sorting

  let sort:any = {
    createdAt:-1
  };


  if(sortBy){

    sort = {

      [sortBy]:
      order === "asc"
      ? 1
      : -1

    };

  }



  const total =
    await Employee.countDocuments(
      filter
    );



  const employees =
    await Employee.find(filter)

      .populate(
        "reportingManager",
        "name email role"
      )

      .sort(sort)

      .skip(skip)

      .limit(limitNumber);



  return {

    employees,

    pagination:{

      page:pageNumber,

      limit:limitNumber,

      total,

      pages:
        Math.ceil(
          total / limitNumber
        )

    }

  };

};


export const getEmployeeById = async (
  id:string
) => {

  const employee =
    await Employee.findOne({
      _id:id,
      isDeleted:false
    })
    .populate(
      "reportingManager",
      "name email role"
    );


  if(!employee){

    throw new Error(
      "Employee not found"
    );

  }


  return employee;

};



export const updateEmployee = async (
  id:string,
  data:any
) => {


  const employee =
    await Employee.findByIdAndUpdate(
      id,
      data,
      {
        new:true,
        runValidators:true
      }
    );


  if(!employee){

    throw new Error(
      "Employee not found"
    );

  }


  return employee;

};



export const deleteEmployee = async (
  id:string
) => {


  const employee =
    await Employee.findByIdAndUpdate(
      id,
      {
        isDeleted:true
      },
      {
        new:true
      }
    );


  if(!employee){

    throw new Error(
      "Employee not found"
    );

  }


  return employee;

};