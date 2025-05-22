import { tags } from "typia";
import React from "react";
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
  const { current, pages, records } = pagination;

  // Format a date-time string into a readable format.
  const formatDateTime = (iso: string): string => {
    const d = new Date(iso);
    return `${d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })} ${d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Shopping Mileage Records
        </h2>
        <p className="mt-1 sm:mt-0 text-sm text-gray-600">
          Page {current} of {pages} &middot; {records.toLocaleString()} records
        </p>
      </div>

      {/* Data Table */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Source
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Direction
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => {
                const isPositive = item.direction === 1;
                const displayValue =
                  item.value !== null
                    ? item.value.toLocaleString()
                    : '—';
                return (
                  <tr key={item.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 truncate">
                      {item.code}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 truncate">
                      {item.source}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                      {displayValue}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${
                          isPositive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isPositive ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                      {formatDateTime(item.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">
          No shopping mileage records available.
        </p>
      )}
    </div>
  );
}
