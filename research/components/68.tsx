import { tags } from "typia";
import React from "react";
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
  const date = new Date(value.deposit.created_at);
  const formattedDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const transactionType = value.deposit.direction === 1 ? "Deposit" : "Withdrawal";
  const sign = value.deposit.direction === 1 ? "+" : "-";
  const formattedAmount = value.value.toLocaleString();
  const formattedBalance = value.balance.toLocaleString();
  const maskedMobile = value.citizen.mobile.replace(/\d(?=\d{4})/g, "*");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{transactionType}</h3>
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
        <div className={`text-xl font-bold ${value.deposit.direction === 1 ? "text-green-600" : "text-red-600"}`}>
          {sign}
          {formattedAmount}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-gray-800">Balance</p>
          <p>{formattedBalance}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">Method</p>
          <p className="truncate">{value.deposit.source}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">Code</p>
          <p className="truncate">{value.deposit.code}</p>
        </div>
        <div>
          <p className="font-medium text-gray-800">User</p>
          <p className="truncate">{value.citizen.name}</p>
          <p className="text-gray-500">{maskedMobile}</p>
        </div>
      </div>
    </div>
  );
}
