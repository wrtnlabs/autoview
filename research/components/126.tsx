import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type IShoppingDeliveryShipper = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        company: null | string;
        name: string;
        mobile: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryShipper;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const companyName = value.company ?? "Independent";
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const content = (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 truncate">
        {value.name}
      </h2>
      <p className="mt-1 text-sm text-gray-600 truncate">{companyName}</p>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Mobile:</span>
          <span className="truncate">{value.mobile}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Joined:</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
  return content;
}
