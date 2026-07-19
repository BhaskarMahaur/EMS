import {
  useForm,
} from "react-hook-form";


import {
  zodResolver,
} from "@hookform/resolvers/zod";


import {
  z,
} from "zod";


import {
  useNavigate,
} from "react-router-dom";


import {
  toast,
} from "react-hot-toast";


import {
  login,
} from "../services/auth.service";


import {
  useAuth,
} from "../hooks/useAuth";


const schema =
  z.object({

    email:
      z.string()
      .email(
        "Invalid email"
      ),


    password:
      z.string()
      .min(
        6,
        "Password minimum 6 characters"
      ),

  });



type LoginForm =
  z.infer<typeof schema>;



function Login(){


  const navigate =
    useNavigate();


  const {
    login:saveToken,
  } = useAuth();



  const {
    register,
    handleSubmit,
    formState:{
      errors,
      isSubmitting,
    },
  } = useForm<LoginForm>({

    resolver:
      zodResolver(schema),

  });





  const onSubmit =
  async(data:LoginForm)=>{


    try {


      const response =
        await login(data);



      /*
        Expected backend response:

        {
          token:"jwt_token"
        }

      */


      saveToken(
        response.token
      );



      toast.success(
        "Login successful"
      );



      navigate(
        "/dashboard"
      );



    } catch{


      toast.error(
        "Invalid email or password"
      );


    }


  };





  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      "
    >

      <form

        onSubmit={
          handleSubmit(onSubmit)
        }

        className="
        bg-white
        shadow-lg
        rounded-xl
        p-8
        w-96
        "

      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          text-center
          "
        >
          EMS Login
        </h1>



        <input

          {...register("email")}

          placeholder="Email"

          className="
          w-full
          border
          rounded
          p-3
          mb-2
          "

        />


        {
          errors.email &&
          (
            <p className="text-red-500 text-sm">

              {errors.email.message}

            </p>
          )
        }




        <input

          {...register("password")}

          type="password"

          placeholder="Password"

          className="
          w-full
          border
          rounded
          p-3
          mt-4
          mb-2
          "

        />



        {
          errors.password &&
          (
            <p className="text-red-500 text-sm">

              {errors.password.message}

            </p>
          )
        }





        <button

          disabled={
            isSubmitting
          }

          className="
          w-full
          bg-blue-600
          text-white
          rounded
          p-3
          mt-6
          hover:bg-blue-700
          "

        >

          {
            isSubmitting
            ?
            "Logging in..."
            :
            "Login"
          }


        </button>


      </form>


    </div>

  );

}


export default Login;