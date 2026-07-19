import { useState } from "react";

import OrganizationTree from "../components/organization/OrganizationTree";

import EmployeeDetails from "../components/organization/EmployeeDetails";

import { useOrganizationTree } from "../hooks/useOrganizationTree";

import type { OrganizationEmployee } from "../types/organization";

function flattenEmployees(
  employees: OrganizationEmployee[]
): OrganizationEmployee[] {
  const result: OrganizationEmployee[] = [];

  const traverse = (nodes: OrganizationEmployee[]) => {
    nodes.forEach((employee) => {
      result.push(employee);

      if (employee.children && employee.children.length > 0) {
        traverse(employee.children);
      }
    });
  };

  traverse(employees);

  return result;
}

function getChildIds(employee: OrganizationEmployee): string[] {
  const ids: string[] = [];

  const traverse = (node: OrganizationEmployee) => {
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        ids.push(child._id);

        traverse(child);
      });
    }
  };

  traverse(employee);

  return ids;
}

function Organization() {
  const { data: tree = [], isLoading, isError } = useOrganizationTree();

  const employees = flattenEmployees(tree);

  const [selectedEmployee, setSelectedEmployee] =
    useState<OrganizationEmployee | null>(null);

  if (isLoading) {
    return <div className="p-6">Loading organization hierarchy...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Failed to load organization hierarchy.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Hierarchy</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div
          className="
lg:col-span-2
rounded-xl
bg-white
shadow
p-6
"
        >
          <OrganizationTree
            tree={tree}
            selectedId={selectedEmployee?._id}
            onSelect={setSelectedEmployee}
          />
        </div>

        <div>
          {selectedEmployee ? (
            <EmployeeDetails
              employee={selectedEmployee}
              employees={employees}
              blockedManagerIds={
                selectedEmployee ? getChildIds(selectedEmployee) : []
              }
            />
          ) : (
            <div
              className="
rounded-xl
bg-white
shadow
p-8
text-center
text-gray-500
"
            >
              Select an employee from hierarchy.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Organization;
