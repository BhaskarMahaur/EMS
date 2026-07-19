import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useEmployees } from "../../hooks/useEmployees";

import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";

import { toast } from "react-hot-toast";

import type { Employee } from "../../types/employee";

import { usePermission } from "../../hooks/usePermission";

function EmployeeTable() {
  const { canCreateEmployee, canEditEmployee, canDeleteEmployee } =
    usePermission();

  const navigate = useNavigate();

  const { mutate: deleteMutation, isPending: deleting } = useDeleteEmployee();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [role, setRole] = useState("");

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useEmployees({
    search,

    status,

    role,

    page,

    limit: 10,
  });

  if (isLoading) {
    return <div className="p-6">Loading employees...</div>;
  }

  if (isError) {
    return (
      <div
        className="
        p-6
        text-red-500
        "
      >
        Failed to load employees
      </div>
    );
  }

  //   const employees:Employee[] =
  //     data?.data ?? [];
  // console.log(
  // "FULL EMPLOYEE RESPONSE",
  // JSON.stringify(data, null, 2)
  // );

  const employees: Employee[] = (() => {
    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (data?.data && "employees" in data.data) {
      return data.data.employees;
    }

    if (Array.isArray(data?.employees)) {
      return data.employees;
    }

    return [];
  })();

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    deleteMutation(id, {
      onSuccess: () => {
        toast.success("Employee deleted successfully");
      },

      onError: () => {
        toast.error("Failed to delete employee");
      },
    });
  };

  return (
    <div>
      <div className=" flex justify-between mb-6 ">
        <div
          className="
          flex
          gap-3
          "
        >
          <input
            value={search}
            onChange={(e) => {
              setPage(1);

              setSearch(e.target.value);
            }}
            placeholder="Search..."
            className="
            border
            rounded
            p-2
            "
          />

          <select
            value={status}
            onChange={(e) => {
              setPage(1);

              setStatus(e.target.value);
            }}
            className="
            border
            rounded
            p-2
            "
          >
            <option value="">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={role}
            onChange={(e) => {
              setPage(1);

              setRole(e.target.value);
            }}
            className="
            border
            rounded
            p-2
            "
          >
            <option value="">All Roles</option>

            <option value="SUPER_ADMIN">Super Admin</option>

            <option value="HR_MANAGER">HR Manager</option>

            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>

        {canCreateEmployee && (
          <button
            onClick={() => navigate("/employees/new")}
            className=" bg-blue-600 text-white px-5 py-2 rounded "
          >
            + Add Employee
          </button>
        )}
      </div>
      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-x-auto
        "
      >
        <table className="w-full">
          <thead
            className="
            bg-gray-100
            "
          >
            <tr>
              <th className="p-3 text-left">ID</th>

              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Email</th>

              <th className="p-3 text-left">Role</th>

              <th className="p-3 text-left">Status</th>

              {canCreateEmployee && <th className="p-3 text-left">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id} className="border-b">
                  <td className="p-3">{employee.employeeId}</td>

                  <td className="p-3">{employee.name}</td>

                  <td className="p-3">{employee.email}</td>

                  <td className="p-3">{employee.role}</td>

                  <td className="p-3">{employee.status}</td>
                  {canEditEmployee && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/employees/${employee._id}/edit`)
                            }
                            className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                          >
                            Edit
                          </button>
                        {canDeleteEmployee && (
                          <button
                            onClick={() => handleDelete(employee._id)}
                            disabled={deleting}
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {deleting ? "Deleting..." : "Delete"}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        className="
        flex
        justify-center
        gap-4
        mt-6
        "
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
          px-4
          py-2
          border
          rounded
          "
        >
          Previous
        </button>

        <span
          className="
          px-4
          py-2
          "
        >
          Page {page}
        </span>

        <button
          disabled={employees.length < 10}
          onClick={() => setPage(page + 1)}
          className="
          px-4
          py-2
          border
          rounded
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default EmployeeTable;
