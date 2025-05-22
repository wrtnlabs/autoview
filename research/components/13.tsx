import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A page.
   *
   * Collection of records with pagination indformation.
   */
  export type IPageIShoppingMileage = {
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
    data: AutoViewInputSubTypes.IShoppingMileage[];
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
  export type IShoppingMileage = {
    id: string & tags.Format<"uuid">;
    value: null | number;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingMileage;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;

  // Format ISO date-times to a human-readable form
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Sum positive (credits) and negative (debits) mileage values
  const totalCredit = data
    .filter((item) => item.direction === 1 && item.value !== null)
    .reduce((sum, item) => sum + item.value!, 0);
  const totalDebit = data
    .filter((item) => item.direction === -1 && item.value !== null)
    .reduce((sum, item) => sum + item.value!, 0);

  // Net mileage on this page
  const netValue = totalCredit - totalDebit;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header: Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Mileage Summary</h2>
        <div className="flex space-x-4 mt-3 sm:mt-0 text-sm">
          <div className="flex items-center text-green-600">
            <LucideReact.ArrowUp
              size={16}
              className="mr-1"
              aria-label="Credits"
            />
            <span>{totalCredit}</span>
          </div>
          <div className="flex items-center text-red-600">
            <LucideReact.ArrowDown
              size={16}
              className="mr-1"
              aria-label="Debits"
            />
            <span>{totalDebit}</span>
          </div>
          <div
            className={`flex items-center ${netValue >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {netValue >= 0 ? (
              <LucideReact.ArrowUp
                size={16}
                className="mr-1"
                aria-label="Net positive"
              />
            ) : (
              <LucideReact.ArrowDown
                size={16}
                className="mr-1"
                aria-label="Net negative"
              />
            )}
            <span>{netValue}</span>
          </div>
        </div>
      </div>

      {/* Table of individual records */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t last:border-b hover:bg-gray-50"
              >
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 truncate">{item.code}</td>
                <td className="px-3 py-2 truncate">{item.source}</td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {item.direction === 1 ? (
                      <LucideReact.ArrowUp
                        className="text-green-600"
                        size={16}
                      />
                    ) : (
                      <LucideReact.ArrowDown
                        className="text-red-600"
                        size={16}
                      />
                    )}
                    <span>{item.value ?? 0}</span>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <LucideReact.AlertCircle
                      size={24}
                      className="text-gray-400 mb-2"
                    />
                    <span>No mileage records available.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Pagination info */}
      <div className="mt-4 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between">
        <span>
          Page {pagination.current} of {pagination.pages}
        </span>
        <span className="mt-1 sm:mt-0">
          {pagination.records.toLocaleString()} record
          {pagination.records !== 1 ? "s" : ""} total
        </span>
      </div>
    </div>
  );
}
