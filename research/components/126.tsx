import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const joinedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const companyName = value.company ?? "Independent";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.User className="text-gray-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>
      <div className="flex items-center mb-3">
        <LucideReact.Briefcase className="text-gray-500 mr-2" size={18} />
        <span className="text-sm text-gray-700 truncate">{companyName}</span>
      </div>
      <div className="flex items-center mb-3">
        <LucideReact.Phone className="text-gray-500 mr-2" size={18} />
        <span className="text-sm text-gray-700">{value.mobile}</span>
      </div>
      <div className="flex items-center">
        <LucideReact.Calendar className="text-gray-500 mr-2" size={18} />
        <span className="text-sm text-gray-700">Joined on {joinedDate}</span>
      </div>
    </div>
  );
}
