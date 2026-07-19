import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type {
  DepartmentStat,
} from "../../types/dashboard";

interface Props {
  data: DepartmentStat[];
}

function DepartmentChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-lg font-semibold">
        Employees by Department
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>

          <XAxis dataKey="department" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="employees"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default DepartmentChart;