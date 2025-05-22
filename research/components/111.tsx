import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

  const formattedPageInfo = `Page ${pagination.current} of ${pagination.pages} (${pagination.records} records)`;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.List className="mr-2 text-gray-500" size={16} />
          <span className="font-medium">{formattedPageInfo}</span>
        </div>
      </div>

      {/* Channel List or Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} className="text-gray-300" />
          <span className="mt-2">No channels to display.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((channel) => (
            <div
              key={channel.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <h3
                className="text-lg font-semibold text-gray-800 truncate"
                title={channel.name}
              >
                {channel.name}
              </h3>
              <div className="mt-2 flex items-center text-gray-600">
                <LucideReact.Tag
                  className="mr-1 text-blue-500 flex-shrink-0"
                  size={16}
                />
                <span className="text-sm truncate" title={channel.code}>
                  {channel.code}
                </span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <LucideReact.Calendar
                  className="mr-1 text-gray-500 flex-shrink-0"
                  size={16}
                />
                <time className="text-sm" dateTime={channel.created_at}>
                  {formatDate(channel.created_at)}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
