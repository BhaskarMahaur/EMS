import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import ProtectedRoute from "./routes/ProtectedRoute";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";

import EmployeeForm from "./pages/EmployeeForm";
import Layout from "./components/Layout";
import Organization from "./pages/Organization";



function App() {


  return (

    <Routes>


      {/* Public Route */}

      <Route path="/" element={
          <Login />
        }
      />




      {/* Protected Routes */}

      {/* <Route

        element={
          <ProtectedRoute /> 
           
        }

      > */}
        <Route element={
          <Layout />
        }>


              <Route

                path="/dashboard"

                element={
                  <Dashboard />
                }

              />



              <Route

                path="/employees"

                element={
                  <Employees />
                }

              />



              <Route

                path="/employees/new"

                element={
                  <ProtectedRoute roles={["Super Admin", "HR Manager"]}>
                    <EmployeeForm />
                  </ProtectedRoute>
                }

              />

               
              <Route

                path="/employees/:id/edit"

                element={
                  <ProtectedRoute roles={["Super Admin", "HR Manager"]}>
                    <EmployeeForm />
                  </ProtectedRoute>
                }

              />

              <Route

                path="/organization"

                element={
                  // <ProtectedRoute roles={["Super Admin", "HR Manager"]}>
                    <Organization />
                  // </ProtectedRoute>
                
                }

              />


        </Route>


      {/* </Route> */}





      {/* Default Route */}

      <Route

        path="*"

        element={

          <Navigate
            to="/dashboard"
            replace
          />

        }

      />


    </Routes>

  );

}


export default App;