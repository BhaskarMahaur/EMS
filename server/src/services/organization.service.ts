import Employee from "../models/Employee";


// Assign reporting manager
export const assignManager = async (
  employeeId:string,
  managerId:string
)=>{


  if(employeeId === managerId){

    throw new Error(
      "Employee cannot report to itself"
    );

  }


  // Check manager exists

  const manager =
    await Employee.findById(
      managerId
    );


  if(!manager){

    throw new Error(
      "Manager not found"
    );

  }



  // Prevent circular reporting

  let currentManager =
    manager;


  while(
    currentManager.reportingManager
  ){

    if(
      currentManager.reportingManager.toString()
      === employeeId
    ){

      throw new Error(
        "Circular reporting not allowed"
      );

    }


    const next =
      await Employee.findById(
        currentManager.reportingManager
      );


    if(!next){
      break;
    }


    currentManager = next;

  }



  const employee =
    await Employee.findByIdAndUpdate(
      employeeId,
      {
        reportingManager:managerId
      },
      {
        new:true
      }
    );


  return employee;

};



// Get direct reports

export const getReportees = async (
  employeeId:string
)=>{


  return Employee.find({

    reportingManager:
      employeeId,

    isDeleted:false

  });

};



// Build organization tree

export const getOrganizationTree = async ()=>{


  const employees =
    await Employee.find({
      isDeleted:false
    })
    .lean();



  const map:any = {};



  employees.forEach(emp=>{

    map[
      emp._id.toString()
    ] = {

      ...emp,

      children:[]

    };

  });



  const tree:any[] = [];



  employees.forEach(emp=>{


    if(emp.reportingManager){

      const managerId =
        emp.reportingManager.toString();


      if(map[managerId]){

        map[managerId]
          .children
          .push(
            map[
              emp._id.toString()
            ]
          );

      }


    }else{


      tree.push(
        map[
          emp._id.toString()
        ]
      );


    }


  });



  return tree;

};