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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-sm text-gray-600">
        <span>Total Channels: {pagination.records}</span>
        <span className="mt-1 sm:mt-0">
          Page {pagination.current} of {pagination.pages} (showing {data.length}
          )
        </span>
      </div>

      {/* Channel List */}
      <ul className="divide-y divide-gray-200">
        {data.map((channel) => (
          <li
            key={channel.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="block font-medium text-gray-900 truncate">
                {channel.name}
              </span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <LucideReact.Tag size={16} />
                <span className="truncate">{channel.code}</span>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>{formatDate(channel.created_at)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
