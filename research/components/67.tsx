import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingDepositHistory {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: AutoViewInputSubTypes.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: AutoViewInputSubTypes.IShoppingDepositHistory[];
    }
    export namespace IPage {
        /**
         * Page information.
        */
        export interface IPagination {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingDepositHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="text-sm text-gray-600">
          Page {current} of {pages}
        </div>
        <div className="text-sm text-gray-600 mt-1 sm:mt-0">
          Total Records: {records}
        </div>
      </div>

      {/* Records List */}
      <ul className="space-y-4">
        {data.map((record) => {
          // Format date and amounts
          const formattedDate = new Date(record.created_at).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          });
          const signedAmount = record.value * record.deposit.direction;
          const formattedAmount = `${signedAmount >= 0 ? "+" : "-"}${Intl.NumberFormat().format(
            Math.abs(signedAmount),
          )}`;
          const balanceFormatted = Intl.NumberFormat().format(record.balance);

          return (
            <li
              key={record.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              {/* Left: Citizen & Deposit Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <LucideReact.User size={16} className="text-gray-500" aria-label="Citizen" />
                  <span className="font-medium text-gray-800">{record.citizen.name}</span>
                  <LucideReact.Phone size={16} className="text-gray-400" aria-label="Mobile" />
                  <span className="text-gray-600">{record.citizen.mobile}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-gray-600">
                  <LucideReact.FileText size={16} aria-label="Deposit Code" />
                  <span>{record.deposit.code}</span>
                  <LucideReact.Tag size={16} className="text-gray-400" aria-label="Source" />
                  <span>{record.deposit.source}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <LucideReact.Calendar size={16} aria-label="Date" />
                  <time dateTime={record.created_at}>{formattedDate}</time>
                </div>
              </div>

              {/* Right: Amount & Balance */}
              <div className="mt-3 md:mt-0 text-right">
                <div className={`text-lg font-semibold ${signedAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formattedAmount}
                </div>
                <div className="text-sm text-gray-500">Balance: {balanceFormatted}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
