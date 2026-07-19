import { useState } from "react";

import { toast } from "react-hot-toast";

import type { OrganizationEmployee } from "../../types/organization";

import { useReportees } from "../../hooks/useReportees";

import { useAssignManager } from "../../hooks/useAssignManager";

import { usePermission } from "../../hooks/usePermission";

interface Props {
  employee: OrganizationEmployee;

  employees: OrganizationEmployee[];

  blockedManagerIds: string[];
}

function EmployeeDetails({ employee, employees, blockedManagerIds }: Props) {
  const { canAssignManager } = usePermission();

  const {
    data: reportees = [],

    isLoading: reporteesLoading,

    isError: reporteesError,
  } = useReportees(employee._id);

  const [selectedManager, setSelectedManager] = useState("");

  const {
    mutate: assignManager,

    isPending,
  } = useAssignManager();

  const roleBadge = () => {
    switch (employee.role) {
      case "Super Admin":
        return "bg-purple-100 text-purple-700";

      case "HR Manager":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAssignManager = () => {
    if (!selectedManager) {
      toast.error("Please select manager");

      return;
    }

    assignManager(
      {
        employeeId: employee._id,

        managerId: selectedManager,
      },

      {
        onSuccess: () => {
          toast.success("Reporting manager updated");

          setSelectedManager("");
        },

        onError: () => {
          toast.error("Failed to update manager");
        },
      }
    );
  };

  return (
    <div
      className="
rounded-xl
bg-white
shadow
p-6
sticky
top-6
"
    >
      <h2
        className="
text-2xl
font-bold
mb-6
"
      >
        Employee Details
      </h2>

      <div
        className="
flex
justify-center
mb-6
"
      >
        <div
          className="
h-24
w-24
rounded-full
bg-blue-500
flex
items-center
justify-center
text-white
text-3xl
font-bold
"
        >
          {employee.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">Name</p>

          <p className="font-semibold text-lg">{employee.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>

          <p>{employee.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>

          <span
            className={`
inline-block
mt-1
rounded-full
px-3
py-1
text-sm
font-medium
${roleBadge()}
`}
          >
            {employee.role}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department</p>

          <p>{employee.department}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Designation</p>

          <p>{employee.designation}</p>
        </div>

        <hr />

        {/* Assign Manager */}
        {canAssignManager && (
          <>
            <div>
              <h3
                className="
        text-lg
        font-semibold
        mb-3
        "
              >
                Reporting Manager
              </h3>

              <select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                className="
        w-full
        border
        rounded
        p-3
        "
              >
                <option value="">Select Manager</option>

                {employees
                  .filter(
                    (emp) =>
                      emp._id !== employee._id &&
                      !blockedManagerIds.includes(emp._id)
                  )
                  .map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name}-{manager.role}
                    </option>
                  ))}
              </select>

              <button
                onClick={handleAssignManager}
                disabled={isPending}
                className="
        mt-3
        bg-blue-600
        text-white
        px-5
        py-2
        rounded
        disabled:opacity-50
        "
              >
                {isPending ? "Saving..." : "Save Manager"}
              </button>
            </div>

            <hr />
          </>
        )}

        {/* Direct Reports */}

        <div>
          <h3
            className="
text-lg
font-semibold
mb-3
"
          >
            Direct Reports
          </h3>

          {reporteesLoading && (
            <p className="text-gray-500">Loading reportees...</p>
          )}

          {reporteesError && (
            <p className="text-red-500">Failed to load reportees.</p>
          )}

          {!reporteesLoading && !reporteesError && reportees.length === 0 && (
            <p className="text-gray-500">No direct reports.</p>
          )}

          <div className="space-y-3">
            {reportees.map((person) => (
              <div
                key={person._id}
                className="
border
rounded-lg
p-3
"
              >
                <p className="font-medium">{person.name}</p>

                <p className="text-sm text-gray-500">{person.role}</p>

                <p className="text-xs text-gray-400">{person.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
