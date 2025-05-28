import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingDepositHistory {
        id: string & tags.Format<"uuid">;
        citizen: AutoViewInputSubTypes.IShoppingCitizen;
        deposit: AutoViewInputSubTypes.IShoppingDeposit;
        source_id: string & tags.Format<"uuid">;
        value: number;
        balance: number;
        created_at: string & tags.Format<"date-time">;
    }
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
    export interface IShoppingCitizen {
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
    }
    export interface IShoppingDeposit {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDepositHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.citizen.name;
  const displayMobile = value.citizen.mobile;
  const transactionDate = new Date(value.created_at).toLocaleString();
  const isDeposit = value.deposit.direction === 1;
  const formattedAmount = new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value.value);
  const formattedBalance = new Intl.NumberFormat(undefined, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value.balance);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Date and transaction type */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-sm space-x-1">
          <LucideReact.Calendar size={16} />
          <span>{transactionDate}</span>
        </div>
        {isDeposit ? (
          <LucideReact.ArrowDownCircle
            size={20}
            className="text-green-500"
            aria-label="Deposit"
          />
        ) : (
          <LucideReact.ArrowUpCircle
            size={20}
            className="text-red-500"
            aria-label="Withdrawal"
          />
        )}
      </div>

      {/* Citizen information */}
      <div className="flex items-center space-x-3">
        <LucideReact.User size={24} className="text-gray-400" aria-label="Citizen" />
        <div className="flex flex-col overflow-hidden">
          <span className="font-medium text-gray-800 truncate">{displayName}</span>
          <div className="flex items-center text-gray-500 text-sm space-x-1">
            <LucideReact.Phone size={14} />
            <span className="truncate">{displayMobile}</span>
          </div>
        </div>
      </div>

      {/* Amount & Balance */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500">Amount</div>
          <div className={`font-semibold ${isDeposit ? "text-green-600" : "text-red-600"}`}>
            {isDeposit ? "+" : "-"}{formattedAmount}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Balance</div>
          <div className="font-semibold text-gray-800">{formattedBalance}</div>
        </div>
      </div>

      {/* Source and Code */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Inbox size={16} className="text-gray-400" />
          <span className="truncate">Source: {value.deposit.source}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span className="truncate">Code: {value.deposit.code}</span>
        </div>
      </div>
    </div>
  );
}
