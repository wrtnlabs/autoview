import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingDepositHistory = {
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
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
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
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingDepositHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;

  // Format ISO date-time into a readable string
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Format numbers with thousand separators
  const formatNumber = (n: number): string =>
    new Intl.NumberFormat().format(n);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with pagination info */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Deposit History
        </h2>
        <p className="text-sm text-gray-600">
          Page {pagination.current} of {pagination.pages} &bull; Total{" "}
          {formatNumber(pagination.records)} record
          {pagination.records !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table container for responsiveness */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Citizen
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Method
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                Amount
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => {
              const isDeposit = record.deposit.direction === 1;
              const sign = isDeposit ? "+" : "-";
              const amount = `${sign}${formatNumber(record.value)}`;

              return (
                <tr
                  key={record.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {formatDate(record.created_at)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <div className="truncate max-w-xs">
                      {record.citizen.name} ({record.citizen.mobile})
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {record.deposit.source}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap text-right ${
                      isDeposit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {amount}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-right whitespace-nowrap">
                    {formatNumber(record.balance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
