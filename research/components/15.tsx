import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const date = new Date(value.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const directionLabel = value.direction === 1 ? "Earned" : "Redeemed";
  const rawPoints = value.value;
  const pointsDisplay = rawPoints !== null ? `${rawPoints}` : "N/A";
  const pointsSign = rawPoints !== null
    ? value.direction === 1
      ? "+"
      : "-"
    : "";
  const colorClass = value.direction === 1 ? "text-green-600" : "text-red-600";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 flex flex-col space-y-3">
      <div className="flex items-baseline justify-between">
        <span className={`text-xl font-semibold ${colorClass}`}>
          {pointsDisplay === "N/A"
            ? "N/A"
            : `${pointsSign}${pointsDisplay} pts`}
        </span>
        <span className="text-sm uppercase text-gray-500">
          {directionLabel}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-800">Code:</span>{" "}
          {value.code}
        </div>
        <div>
          <span className="font-medium text-gray-800">Source:</span>{" "}
          {value.source}
        </div>
      </div>
      <time
        dateTime={value.created_at}
        className="text-xs text-gray-500"
      >
        {formattedDate}
      </time>
    </div>
  );
}
