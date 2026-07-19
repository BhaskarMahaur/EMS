import OrganizationNode from "./OrganizationNode";


import type {
  OrganizationEmployee,
} from "../../types/organization";


interface Props {

  tree: OrganizationEmployee[];

  selectedId?: string;

  onSelect: (
    employee: OrganizationEmployee
  ) => void;

}



function OrganizationTree({

  tree,

  selectedId,

  onSelect,

}: Props){


  return (

    <div>

      {
        tree.map((employee)=>(

          <OrganizationNode

            key={
              employee._id
            }

            employee={
              employee
            }

            selectedId={
              selectedId
            }

            onSelect={
              onSelect
            }

          />

        ))
      }

    </div>

  );

}


export default OrganizationTree;