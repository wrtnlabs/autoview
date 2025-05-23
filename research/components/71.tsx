import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface IShoppingMileageHistory {
        id: string & tags.Format<"uuid">;
        citizen: AutoViewInputSubTypes.IShoppingCitizen;
        mileage: AutoViewInputSubTypes.IShoppingMileage;
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
    export interface IShoppingMileage {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingMileageHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { citizen, mileage, value: txnValue, balance, created_at } = value;
  const formattedDate = new Date(created_at).toLocaleString();
  const isPositive = txnValue >= 0;
  const displayAmount = `${isPositive ? '+' : '-'}${Math.abs(txnValue)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Citizen Info */}
      <div className="flex items-center space-x-3">
        <LucideReact.User size={24} className="text-gray-600" />
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 truncate">
            {citizen.name}
          </p>
          <div className="flex items-center text-gray-500 text-sm">
            <LucideReact.Phone size={16} className="mr-1" />
            <span className="truncate">{citizen.mobile}</span>
          </div>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span className="truncate">{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="mr-1" />
          <span className="capitalize truncate">{mileage.source}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Code size={16} className="mr-1" />
          <span className="uppercase truncate">{mileage.code}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Hash size={16} className="mr-1" />
          <span className="truncate">{mileage.id.slice(0, 8)}…</span>
        </div>
      </div>

      {/* Transaction & Balance */}
      <div className="mt-4 border-t pt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-2xl font-semibold text-gray-800">
          {isPositive ? (
            <LucideReact.PlusCircle size={24} className="text-green-500 mr-1" />
          ) : (
            <LucideReact.MinusCircle size={24} className="text-red-500 mr-1" />
          )}
          <span>{displayAmount}</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center text-gray-700 text-sm">
          <span className="mr-1">Balance:</span>
          <span className="font-medium">{balance}</span>
        </div>
      </div>
    </div>
  );
}
