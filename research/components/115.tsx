import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A page.
   *
   * Collection of records with pagination indformation.
   */
  export type IPageIShoppingSection = {
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
    data: AutoViewInputSubTypes.IShoppingSection[];
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
   * Section information.
   *
   * `IShoppingSection` is a concept that refers to the spatial information of
   * the market.
   *
   * If we compare the section mentioned here to the offline market, it means a
   * spatially separated area within the store, such as the "fruit corner" or
   * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
   * not possible to classify multiple sections simultaneously, but only one section
   * can be classified.
   *
   * By the way, if your shopping mall system requires only one section, then just
   * use only one. This concept is designed to be expandable in the future.
   */
  export type IShoppingSection = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
     */
    code: string;
    /**
     * Representative name of the section.
     *
     * @title Representative name of the section
     */
    name: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
     */
    created_at: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSection;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, limit, records, pages } = pagination;
  const pageSummary = `Page ${current} of ${pages}`;
  const detailSummary = `${limit} per page · ${records} total`;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Pagination Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <LucideReact.ListChecks className="text-blue-500" size={20} />
          <span className="font-medium">{pageSummary}</span>
        </div>
        <div className="mt-2 sm:mt-0 text-gray-500 text-sm">
          {detailSummary}
        </div>
      </div>

      {/* Data List */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No sections available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((section) => (
            <div
              key={section.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {section.name}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <LucideReact.Tag size={16} className="mr-1 text-indigo-500" />
                <span className="truncate">{section.code}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <LucideReact.Calendar size={16} className="mr-1" />
                <span>{formatDate(section.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
