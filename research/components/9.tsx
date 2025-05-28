import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingDeposit {
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
    export interface IShoppingDeposit {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingDeposit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, limit, records, pages } = pagination;
  const countIncoming = data.filter(item => item.direction === 1).length;
  const countOutgoing = data.length - countIncoming;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>
            Page {current} of {pages} (showing {Math.min(limit, data.length)} of {records})
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.ArrowUpCircle size={16} className="text-green-500 mr-1" />
          <span>{countIncoming} incoming</span>
          <LucideReact.ArrowDownCircle size={16} className="text-red-500 ml-4 mr-1" />
          <span>{countOutgoing} outgoing</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Date
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Code
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                Source
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wide">
                Direction
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-700">
                    <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="text-sm text-gray-800 font-medium">{item.code}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="text-sm text-gray-700">{item.source}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-center">
                  {item.direction === 1 ? (
                    <LucideReact.ArrowUpCircle
                      size={18}
                      className="text-green-500 inline-block"
                    />
                  ) : (
                    <LucideReact.ArrowDownCircle
                      size={18}
                      className="text-red-500 inline-block"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
