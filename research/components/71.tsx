import { tags } from "typia";
import React from "react";
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
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const transactionType = value.mileage.source || value.mileage.code;
  const amount = value.value;
  const isCredit = value.mileage.direction === 1;
  const sign = isCredit ? "+" : "-";
  const amountDisplay = `${sign}${amount}`;
  const amountColor = isCredit ? "text-green-600" : "text-red-600";
  const balanceDisplay = new Intl.NumberFormat().format(value.balance);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Citizen Info & Date */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {value.citizen.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {value.citizen.mobile}
          </p>
        </div>
        <p className="mt-2 sm:mt-0 text-sm text-gray-600">{formattedDate}</p>
      </div>

      {/* Details Grid */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="mt-1 text-base text-gray-800 truncate">
            {transactionType}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className={`mt-1 text-base font-medium ${amountColor}`}>
            {amountDisplay}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="mt-1 text-base text-gray-800">{balanceDisplay}</p>
        </div>
      </div>
    </div>
  );
}
