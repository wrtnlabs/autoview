import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type IShoppingMileageHistory = {
    id: string & tags.Format<"uuid">;
    citizen: AutoViewInputSubTypes.IShoppingCitizen;
    mileage: AutoViewInputSubTypes.IShoppingMileage;
    source_id: string & tags.Format<"uuid">;
    value: number;
    balance: number;
    created_at: string & tags.Format<"date-time">;
  };
  /**
   * Citizen verification information.
   *
   * `IShoppingCitizen` is an entity that records the user's
   * {@link name real name} and {@link mobile} input information.
   *
   * For reference, in South Korea, real name authentication is required for
   * e-commerce participants, so the name attribute is important. However, the
   * situation is different overseas, so in reality, mobile attributes are the
   * most important, and identification of individual person is also done based
   * on this mobile.
   *
   * Of course, real name and mobile phone authentication information are
   * encrypted and stored.
   */
  export type IShoppingCitizen = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
     */
    created_at: string;
    /**
     * Mobile number.
     *
     * @title Mobile number
     */
    mobile: string;
    /**
     * Real name, or equivalent nickname.
     *
     * @title Real name, or equivalent nickname
     */
    name: string;
  };
  export type IShoppingMileage = {
    id: string & tags.Format<"uuid">;
    value: null | number;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileageHistory;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const transactionDate = new Date(value.created_at);
  const formattedDate = transactionDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const changeAmount = value.value;
  const isPositive = changeAmount >= 0;
  const absChange = Math.abs(changeAmount);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      {/* Citizen Info */}
      <div className="flex items-center gap-3">
        <LucideReact.User size={24} className="text-gray-500" />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 truncate">
            {value.citizen.name}
          </span>
          <span className="text-sm text-gray-500">{value.citizen.mobile}</span>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="flex items-center gap-6">
        <div
          className={`flex items-center gap-1 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <LucideReact.ArrowUp size={16} />
          ) : (
            <LucideReact.ArrowDown size={16} />
          )}
          <span className="font-medium">{absChange}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <LucideReact.Gift size={16} />
          <span className="text-sm">{value.mileage.code}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <LucideReact.Calendar size={16} />
          <span className="text-sm">{formattedDate}</span>
        </div>
      </div>

      {/* Balance */}
      <div className="text-right text-sm text-gray-500">
        Balance:{" "}
        <span className="font-medium text-gray-900">{value.balance}</span>
      </div>
    </div>
  );
}
