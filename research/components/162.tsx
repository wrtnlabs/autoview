import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingChannel = {
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
        data: AutoViewInputSubTypes.IShoppingChannel[];
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
    /**
     * Channel information.
     *
     * `IShoppingChannel` is a concept that shapes the distribution channel in the
     * market. Therefore, the difference in the channel in this e-commerce system
     * means that it is another site or application.
     *
     * By the way, if your shopping mall system requires only one channel, then
     * just use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingChannel = {
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
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Name of the channel.
         *
         * @title Name of the channel
        */
        name: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingChannel;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  // Format a date string into a more readable form, e.g., "Jan 1, 2024"
  function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full bg-white rounded-lg shadow-md p-4 flex flex-col space-y-4">
      {/* Header: summary of pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="text-gray-700">
          <p className="text-lg font-semibold">Shopping Channels</p>
          <p className="text-sm">
            Total: <span className="font-medium">{records}</span> channels
          </p>
        </div>
        <div className="mt-2 sm:mt-0 text-sm text-gray-500">
          Page <span className="font-medium">{current}</span> of{' '}
          <span className="font-medium">{pages}</span>
        </div>
      </div>

      {/* List of channels */}
      <ul className="divide-y divide-gray-200">
        {data.map((channel) => (
          <li
            key={channel.id}
            className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex flex-col">
              <p className="text-gray-900 font-medium truncate">{channel.name}</p>
              <p className="text-gray-500 text-sm truncate">{channel.code}</p>
            </div>
            <p className="mt-1 sm:mt-0 text-gray-400 text-sm">
              Created: {formatDate(channel.created_at)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
