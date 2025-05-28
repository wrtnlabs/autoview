import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingDeliveryShipper {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        company: null | string;
        name: string;
        mobile: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryShipper;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived formatting for the creation timestamp
  const createdAtDate = new Date(value.created_at);
  const formattedCreatedAt = createdAtDate.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md space-y-3">
      {/* Name */}
      <div className="flex items-center gap-2">
        <LucideReact.User className="text-gray-500" size={20} aria-hidden="true" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
      </div>

      {/* Company (if provided) */}
      {value.company && (
        <div className="flex items-center gap-2">
          <LucideReact.Building className="text-gray-500" size={16} aria-hidden="true" />
          <span className="text-gray-700 truncate">{value.company}</span>
        </div>
      )}

      {/* Mobile */}
      <div className="flex items-center gap-2">
        <LucideReact.Phone className="text-gray-500" size={16} aria-hidden="true" />
        <span className="text-gray-700">{value.mobile}</span>
      </div>

      {/* Created At */}
      <div className="flex items-center gap-2">
        <LucideReact.Calendar className="text-gray-500" size={16} aria-hidden="true" />
        <span className="text-gray-600">{formattedCreatedAt}</span>
      </div>
    </div>
  );
}
