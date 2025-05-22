import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A page.
   *
   * Collection of records with pagination indformation.
   */
  export type IPageIShoppingDeposit = {
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
    data: AutoViewInputSubTypes.IShoppingDeposit[];
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
  export type IShoppingDeposit = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingDeposit;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and formatting utilities
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      {/* Pagination summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          Records:{" "}
          <span className="font-medium">{records.toLocaleString()}</span> | Page{" "}
          <span className="font-medium">{current}</span> of{" "}
          <span className="font-medium">{pages}</span>
        </div>
      </div>

      {data.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  Date
                </div>
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <LucideReact.Tag size={16} className="text-gray-400" />
                  Type
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(item.created_at)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-900">
                  {item.code}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 capitalize">
                  {item.source}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.direction === 1 ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <LucideReact.PlusCircle size={16} aria-label="Deposit" />
                      <span>Deposit</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      <LucideReact.MinusCircle
                        size={16}
                        aria-label="Withdrawal"
                      />
                      <span>Withdrawal</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No transactions found.</span>
        </div>
      )}
    </div>
  );
}
