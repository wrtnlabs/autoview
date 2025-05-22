import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) +
      ', ' +
      d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    );
  };

  const getDirectionLabel = (dir: -1 | 1): string => (dir === 1 ? 'Deposit' : 'Withdrawal');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 text-sm text-gray-600">
        Page {current} of {pages} · {records} record{records !== 1 ? 's' : ''}
      </div>

      {data.length === 0 ? (
        <div className="py-6 text-center text-gray-500">No records found.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data.map((item) => (
            <li
              key={item.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{item.code}</div>
                <div className="mt-1 flex items-center text-xs text-gray-500 space-x-2">
                  <time dateTime={item.created_at}>{formatDate(item.created_at)}</time>
                  <span className="truncate">{item.source}</span>
                </div>
              </div>
              <span
                className={`mt-2 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.direction === 1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {getDirectionLabel(item.direction)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
