import React from "react";
import { interpolateColor, hexToRgb, getBarColor as defaultGetBarColor  } from "../../utils/helper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data, colorRange }) => {
  const amounts = data.map((d) => d.amount);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);

  const [interval, setInterval] = React.useState(9); // Default interval for XAxis ticks

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setInterval(4); // big screen
      else if (width >= 768) setInterval(6); // medium
      else setInterval(9); // small
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



    // Use a custom getBarColor if colorRange is provided
  const getBarColor = (amount, min, max) => {
    if (colorRange && colorRange.length === 2) {
      // Use helper's interpolateColor and hexToRgb
      const color1 = hexToRgb(colorRange[0]);
      const color2 = hexToRgb(colorRange[1]);
      const factor = max === min ? 1 : (amount - min) / (max - min);
      return interpolateColor(color1, color2, factor);
    }
    return defaultGetBarColor(amount, min, max);
  };


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 border border-gray-300 m-0 pl-6 pr-6">
          <p className="txt-xs font-semibold text-green-800 m-0 p-0">
            {payload[0]?.payload?.source ? ` (${payload[0].payload.source}) `: ""}{" "}
            {label}
          </p>

          <p className="text-sm font-medium text-gray-900 m-0 p-0">
            Rs {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#555", dy: 15, dx: 20 }}
            stroke="#ccc"
            interval={interval}
            // angle={-45}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555", dx: -10 }} stroke="#ccc" />
          <Tooltip content={CustomTooltip} />
          <Bar
            dataKey="amount"
            fill="#ff8042"
            radius={[0, 0, 0, 0]}
            activeData={{ r: 8, fill: "yellow" }}
            activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.amount, min, max)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
