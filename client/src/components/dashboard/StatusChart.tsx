import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
];

interface Props {
  active: number;
  inactive: number;
}

function StatusChart({
  active,
  inactive,
}: Props) {

  const data = [
    {
      name: "Active",
      value: active,
    },
    {
      name: "Inactive",
      value: inactive,
    },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-4 text-lg font-semibold">
        Employee Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusChart;