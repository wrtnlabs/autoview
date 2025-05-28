import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingChannel {
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
    export interface IShoppingChannel {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingChannel;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { current, limit, records, pages } = value.pagination;
  const pageSummary = `Page ${current} of ${pages}`;
  const recordSummary = `${records.toLocaleString()} total record${records === 1 ? "" : "s"}`;
  const channelsOnPage = value.data.length;
  const pageCountSummary = `${channelsOnPage} channel${channelsOnPage === 1 ? "" : "s"} on this page`;

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-600 space-y-0.5">
          <div>{pageSummary}</div>
          <div>{recordSummary}</div>
        </div>
        <div className="mt-2 sm:mt-0 text-sm text-gray-600">
          {pageCountSummary}
        </div>
      </div>

      {value.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Code</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  <LucideReact.Calendar size={16} className="inline-block mr-1 text-gray-400" />
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {value.data.map((channel) => (
                <tr key={channel.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700 truncate">{channel.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-500 truncate">{channel.code}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                    {formatDate(channel.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No channels available.</span>
        </div>
      )}
    </div>
  );
}
