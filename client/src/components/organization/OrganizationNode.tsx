import {
  useState,
} from "react";

import type {
  OrganizationEmployee,
} from "../../types/organization";

interface Props {

  employee: OrganizationEmployee;

  selectedId?: string;

  onSelect: (
    employee: OrganizationEmployee
  ) => void;

}

function OrganizationNode({

  employee,

  selectedId,

  onSelect,

}: Props) {

  const [
    expanded,
    setExpanded,
  ] = useState(true);

  const hasChildren =
    employee.children.length > 0;

  const roleColor = () => {

    switch (employee.role) {

      case "Super Admin":
        return "bg-purple-100 border-purple-500";

      case "HR Manager":
        return "bg-blue-100 border-blue-500";

      default:
        return "bg-white border-gray-300";

    }

  };

  return (

    <div className="ml-6">

      {/* Employee Row */}

      <div className="flex items-start gap-3">

        {/* Expand Button */}

        <div className="w-8">

          {

            hasChildren

            ?

            <button

              type="button"

              onClick={() =>

                setExpanded(
                  !expanded
                )

              }

              className="
              w-7
              h-7
              rounded-full
              bg-gray-200
              hover:bg-gray-300
              text-sm
              font-bold
              "

            >

              {

                expanded

                ?

                "−"

                :

                "+"

              }

            </button>

            :

            <div className="w-7 h-7" />

          }

        </div>

        {/* Employee Card */}

        <div

          onClick={() =>

            onSelect(employee)

          }

          className={`
            flex-1
            cursor-pointer
            rounded-xl
            border-2
            px-5
            py-4
            shadow-sm
            transition-all
            hover:shadow-md
            ${roleColor()}
            ${
              selectedId === employee._id
                ? "ring-2 ring-blue-500"
                : ""
            }
          `}

        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold">

                {employee.name}

              </h3>

              <p className="text-sm text-gray-600">

                {employee.role}

              </p>

            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">

              {employee.department}

            </span>

          </div>

          <p className="mt-2 text-sm text-gray-500">

            {employee.designation}

          </p>

        </div>

      </div>

      {/* Children */}

      {

        expanded &&
        hasChildren &&

        <div
          className="
          ml-10
          mt-3
          border-l-2
          border-gray-300
          pl-6
          space-y-3
          "
        >

          {

            employee.children.map(

              (child) => (

                <OrganizationNode

                  key={child._id}

                  employee={child}

                  selectedId={selectedId}

                  onSelect={onSelect}

                />

              )

            )

          }

        </div>

      }

    </div>

  );

}

export default OrganizationNode;