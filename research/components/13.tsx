import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingMileage {
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
    export interface IShoppingMileage {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingMileage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, limit, records, pages } = pagination;
  const start = (current - 1) * limit + 1;
  const end = Math.min(current * limit, records);

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-gray-800">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-800">{records}</span> records (
        Page{" "}
        <span className="font-medium text-gray-800">{current}</span> of{" "}
        <span className="font-medium text-gray-800">{pages}</span>)
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No mileage records available</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                  Code
                </th>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                  Source
                </th>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase text-right">
                  Mileage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {data.map((record) => {
                const { id, value: val, created_at, code, source, direction } =
                  record;
                const isPositive = direction === 1;
                const valueColor = val != null
                  ? isPositive
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-gray-400";
                return (
                  <tr key={id}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <LucideReact.Calendar size={16} className="text-gray-400" />
                        <span>{formatDate(created_at)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-800">{code}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-700 truncate" title={source}>
                        {source}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div className={`inline-flex items-center gap-1 text-sm font-medium ${valueColor}`}>
                        <span>{val != null ? val : "—"}</span>
                        {val != null && (
                          isPositive ? (
                            <LucideReact.ArrowUp size={16} />
                          ) : (
                            <LucideReact.ArrowDown size={16} />
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
