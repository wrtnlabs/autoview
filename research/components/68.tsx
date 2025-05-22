import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type IShoppingDepositHistory = {
    id: string & tags.Format<"uuid">;
    citizen: AutoViewInputSubTypes.IShoppingCitizen;
    deposit: AutoViewInputSubTypes.IShoppingDeposit;
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
  export type IShoppingDeposit = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDepositHistory;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { citizen, deposit, value: amount, balance, created_at } = value;
  const sign = deposit.direction === 1 ? "+" : "-";
  const formattedValue = `${sign}${Math.abs(amount).toLocaleString()}`;
  const formattedBalance = balance.toLocaleString();
  const formattedDate = new Date(created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Citizen Information */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.User size={20} className="text-gray-500" />
          <span className="font-medium text-gray-800 truncate">
            {citizen.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Phone size={20} className="text-gray-400" />
          <span className="text-gray-600 truncate">{citizen.mobile}</span>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          {deposit.direction === 1 ? (
            <LucideReact.ArrowUpCircle size={20} className="text-green-500" />
          ) : (
            <LucideReact.ArrowDownCircle size={20} className="text-red-500" />
          )}
          <div className="ml-2">
            <div className="text-sm text-gray-500">Amount</div>
            <div className="font-semibold text-gray-800">{formattedValue}</div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.CreditCard size={20} className="text-gray-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Source</div>
            <div className="font-semibold text-gray-800 truncate">
              {deposit.source}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.Hash size={20} className="text-gray-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Code</div>
            <div className="font-semibold text-gray-800 truncate">
              {deposit.code}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <LucideReact.DollarSign size={20} className="text-gray-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Balance</div>
            <div className="font-semibold text-gray-800">
              {formattedBalance}
            </div>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} />
        <span className="ml-2">{formattedDate}</span>
      </div>
    </div>
  );
}
