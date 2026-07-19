import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";


import {
  Toaster,
} from "react-hot-toast";


import "./index.css";


import App from "./App";


import {
  AuthProvider,
} from "./context/AuthProvider";


import QueryProvider from "./providers/QueryProvider";



ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>


    <BrowserRouter>


      <QueryProvider>


        <AuthProvider>


          <Toaster
            position="top-right"
          />


          <App />


        </AuthProvider>


      </QueryProvider>


    </BrowserRouter>


  </React.StrictMode>

);