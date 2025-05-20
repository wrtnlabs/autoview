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
  const { current, pages, records } = value.pagination;
  
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Pagination Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Page {current}/{pages} · {records} records
      </div>
      {/* List of Deposits */}
      <ul className="space-y-4">
        {value.data.map((item) => {
          // Format date-time
          const dateStr = new Date(item.created_at).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          });
          // Map direction to label and color
          const isCredit = item.direction === 1;
          const directionLabel = isCredit ? 'Credit' : 'Debit';
          const directionColor = isCredit ? 'text-green-500' : 'text-red-500';

          return (
            <li key={item.id} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                {/* Deposit Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-medium text-gray-800 truncate">
                    {item.code}
                  </div>
                  <div className="text-sm text-gray-500">
                    {dateStr}
                  </div>
                </div>
                {/* Source and Direction */}
                <div className="ml-4 text-right">
                  <div className={`text-sm font-semibold ${directionColor}`}>
                    {directionLabel}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.source}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  // 3. Return the React element.
}
