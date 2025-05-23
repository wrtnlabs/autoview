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
  const { current, limit, pages, records } = value.pagination;
  const channelCount = value.data.length;
  const formattedDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="mb-4 text-gray-700 text-sm flex flex-wrap items-center gap-x-2">
        <span className="font-semibold">Page {current} of {pages}</span>
        <span>•</span>
        <span>{channelCount} channels shown</span>
        <span>•</span>
        <span>{records} total channels</span>
      </div>

      {/* Empty State */}
      {channelCount === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No channels available.</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {value.data.map((channel) => (
            <li
              key={channel.id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Channel Name */}
              <div className="flex items-center space-x-2 truncate">
                <LucideReact.FileText className="text-gray-500" size={20} />
                <span className="font-medium text-gray-800 truncate">{channel.name}</span>
              </div>

              {/* Channel Metadata */}
              <div className="mt-2 sm:mt-0 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1 truncate">
                  <LucideReact.Code className="text-gray-400" size={16} />
                  <span className="truncate">{channel.code}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar className="text-gray-400" size={16} />
                  <time dateTime={channel.created_at}>{formattedDate(channel.created_at)}</time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
