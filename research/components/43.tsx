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
  const { current, limit, records, pages } = pagination;
  const startIndex = (current - 1) * limit + 1;
  const endIndex = Math.min(current * limit, records);

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex}–{endIndex} of {records} channels
      </div>
      <ul className="space-y-4">
        {data.map((channel) => {
          const { id, name, code, created_at } = channel;
          return (
            <li
              key={id}
              className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
                <p className="text-sm text-gray-500 truncate">Code: {code}</p>
              </div>
              <time
                dateTime={created_at}
                className="text-sm text-gray-500 mt-2 sm:mt-0"
              >
                {formatDate(created_at)}
              </time>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 text-sm text-gray-600">
        Page {current} of {pages}
      </div>
    </div>
  );
}
