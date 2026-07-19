import DashboardCard from "../components/dashboard/DashboardCard";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import StatusChart from "../components/dashboard/StatusChart";

import {
  useDashboard,
} from "../hooks/useDashboard";



function Dashboard(){


  const {
    data,
    isLoading,
    isError,
  } =
    useDashboard();



  if(isLoading){

    return (

      <div className="p-6">

        Loading...

      </div>

    );

  }



  if(isError){

    return (

      <div className="p-6">

        Failed to load dashboard

      </div>

    );

  }



  const dashboard = data;

  if (!dashboard) {
    return (
      <div className="p-6">
        No dashboard data available.
      </div>
    );
  }

  return (

    <div>


      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >

        Dashboard

      </h1>



      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >


        <DashboardCard

          title="Total Employees"

          value={
            dashboard.totalEmployees
          }

          color="bg-blue-600"

        />


        <DashboardCard

          title="Active Employees"

          value={
            dashboard.activeEmployees
          }

          color="bg-green-600"

        />


        <DashboardCard

          title="Inactive Employees"

          value={
            dashboard.inactiveEmployees
          }

          color="bg-red-600"

        />


        <DashboardCard

          title="Departments"

          value={
            dashboard.departmentCount
          }

          color="bg-purple-600"

        />


      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <DepartmentChart
          data={dashboard.departmentStats}
        />

        <StatusChart
          active={dashboard.activeEmployees}
          inactive={dashboard.inactiveEmployees}
        />

      </div>

    </div>

  );

}


export default Dashboard;