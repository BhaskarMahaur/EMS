import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useCreateEmployee } from "../hooks/useCreateEmployee";

import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

import { getEmployeeById } from "../services/employee.service";

const schema = z.object({
  employeeId: z.string().min(2, "Employee ID required"),

  name: z.string().min(3, "Name is required"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password minimum 6 characters"),

  phone: z.string().min(10, "Phone number required"),

  department: z.string().min(2, "Department required"),

  designation: z.string().min(2, "Designation required"),

  salary: z.preprocess(
    (value) => Number(value),
    z.number().min(0, "Salary required")
  ),

  joiningDate: z.string().min(1, "Joining date required"),

  role: z.enum(["Employee", "HR Manager", "Super Admin"]),
});

type FormInput = z.input<typeof schema>;

type FormData = z.output<typeof schema>;

function EmployeeForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const { mutate: createEmployee, isPending: createLoading } =
    useCreateEmployee();

  const { mutate: updateEmployee, isPending: updateLoading } =
    useUpdateEmployee();

  const isPending = createLoading || updateLoading;

  const {
    register,

    handleSubmit,

    reset,
  } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      role: "Employee",
    },
  });

  useEffect(() => {
    if (!id) return;

    const loadEmployee = async () => {
      try {
        const response = await getEmployeeById(id);

        const employee = response.employee;

        reset({
          employeeId: employee.employeeId,

          name: employee.name,

          email: employee.email,

          password: "",

          phone: employee.phone,

          department: employee.department,

          designation: employee.designation,

          salary: employee.salary,

          joiningDate: employee.joiningDate?.substring(0, 10),

          role: employee.role,
        });
      } catch {
        toast.error("Unable to load employee");
      }
    };

    loadEmployee();
  }, [id, reset]);

  const onSubmit = (values: FormData) => {
    if (isEdit && id) {
      updateEmployee(
        {
          id,
          data: values,
        },

        {
          onSuccess: () => {
            toast.success("Employee updated successfully");

            navigate("/employees");
          },

          onError: () => {
            toast.error("Update failed");
          },
        }
      );

      return;
    }

    createEmployee(
      values,

      {
        onSuccess: () => {
          toast.success("Employee created successfully");

          navigate("/employees");
        },

        onError: () => {
          toast.error("Creation failed");
        },
      }
    );
  };

  return (
    <div
      className="
max-w-3xl
bg-white
rounded-xl
shadow
p-8
"
    >
      <h1
        className="
text-3xl
font-bold
mb-6
"
      >
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
space-y-4
"
      >
        <input
          {...register("employeeId")}
          placeholder="Employee ID"
          className="w-full border rounded p-3"
        />

        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full border rounded p-3"
        />

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border rounded p-3"
        />

        <input
          {...register("password")}
          type="password"
          placeholder={isEdit ? "Leave empty to keep password" : "Password"}
          className="w-full border rounded p-3"
        />

        <input
          {...register("phone")}
          placeholder="Phone"
          className="w-full border rounded p-3"
        />

        <input
          {...register("department")}
          placeholder="Department"
          className="w-full border rounded p-3"
        />

        <input
          {...register("designation")}
          placeholder="Designation"
          className="w-full border rounded p-3"
        />

        <input
          {...register("salary")}
          type="number"
          placeholder="Salary"
          className="w-full border rounded p-3"
        />

        <input
          {...register("joiningDate")}
          type="date"
          className="w-full border rounded p-3"
        />

        <select
          {...register("role")}
          className="
w-full
border
rounded
p-3
"
        >
          <option value="Employee">Employee</option>

          <option value="HR Manager">HR Manager</option>

          <option value="Super Admin">Super Admin</option>
        </select>

        <button
          disabled={isPending}
          className="
bg-blue-600
text-white
px-6
py-3
rounded
disabled:opacity-50
"
        >
          {isPending
            ? "Saving..."
            : isEdit
            ? "Update Employee"
            : "Save Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
