import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const { data, pagination } = value;
  const totalDeposited = data
    .filter((r) => r.deposit.direction === 1)
    .reduce((sum, r) => sum + r.value, 0);
  const totalWithdrawn = data
    .filter((r) => r.deposit.direction === -1)
    .reduce((sum, r) => sum + Math.abs(r.value), 0);
  const currentBalance = data[0]?.balance ?? 0;
  const citizen = data[0]?.citizen;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatNumber = (num: number) => num.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {citizen && (
        <div className="flex items-center space-x-4">
          <LucideReact.User size={28} className="text-gray-500" />
          <div>
            <div className="text-xl font-semibold text-gray-800">
              {citizen.name}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <LucideReact.Phone size={16} className="mr-1" />
              {citizen.mobile}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
          <LucideReact.ArrowUpCircle size={20} className="text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Total Deposited</div>
            <div className="text-lg font-medium text-gray-800">
              {formatNumber(totalDeposited)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
          <LucideReact.ArrowDownCircle size={20} className="text-red-500" />
          <div>
            <div className="text-sm text-gray-500">Total Withdrawn</div>
            <div className="text-lg font-medium text-gray-800">
              {formatNumber(totalWithdrawn)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
          <LucideReact.Wallet size={20} className="text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Current Balance</div>
            <div className="text-lg font-medium text-gray-800">
              {formatNumber(currentBalance)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-600 text-sm mb-2">
          Page {pagination.current} of {pagination.pages} • {pagination.records}{" "}
          records
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                  Code
                </th>
                <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">
                  Source
                </th>
                <th className="px-2 py-2 text-right text-xs font-semibold text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-2 py-2 text-right text-xs font-semibold text-gray-600 uppercase">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 flex items-center">
                    <LucideReact.Calendar
                      size={16}
                      className="mr-1 text-gray-400"
                    />
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.deposit.code}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.deposit.source}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 text-right flex items-center justify-end">
                    {item.deposit.direction === 1 ? (
                      <LucideReact.ArrowUp
                        size={16}
                        className="mr-1 text-green-500"
                      />
                    ) : (
                      <LucideReact.ArrowDown
                        size={16}
                        className="mr-1 text-red-500"
                      />
                    )}
                    {item.deposit.direction === 1 ? "+" : "-"}
                    {formatNumber(item.value)}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                    {formatNumber(item.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
