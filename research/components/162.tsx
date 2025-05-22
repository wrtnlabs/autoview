import * as LucideReact from "lucide-react";
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
  const { current, pages, records } = pagination;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header with title and pagination summary */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Shopping Channels
        </h2>
        <div className="text-sm text-gray-600 mt-2 md:mt-0">
          <span>
            Page {current} of {pages}
          </span>
          <span className="mx-2">|</span>
          <span>{records} total</span>
        </div>
      </div>

      {/* Table for channel list */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="text-xs font-medium text-gray-500 uppercase">
              <th className="px-3 py-2 w-1/3">Name</th>
              <th className="px-3 py-2 w-1/3">Code</th>
              <th className="px-3 py-2 w-1/3">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((channel) => (
              <tr key={channel.id} className="hover:bg-gray-50">
                <td className="px-3 py-3 text-gray-700 truncate">
                  {channel.name}
                </td>
                <td className="px-3 py-3 text-gray-700 uppercase">
                  {channel.code}
                </td>
                <td className="px-3 py-3 flex items-center text-gray-600">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1 text-gray-400"
                  />
                  <span>{formatDate(channel.created_at)}</span>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  <LucideReact.AlertCircle
                    size={24}
                    className="mx-auto mb-2 text-gray-400"
                  />
                  No channels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
