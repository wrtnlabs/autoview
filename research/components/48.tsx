import * as LucideReact from "lucide-react";
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
  const { pagination, data: sections } = value;
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const sectionsOnPage = sections.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Shopping Sections
        </h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span>
            Page {pagination.current} of {pagination.pages}
          </span>
          <span className="flex items-center">
            <LucideReact.Database size={16} className="text-gray-400 mr-1" />
            {pagination.records} total
          </span>
          <span className="flex items-center">
            <LucideReact.List size={16} className="text-gray-400 mr-1" />
            {sectionsOnPage} on this page
          </span>
        </div>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <li
            key={section.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col"
          >
            <h3
              className="text-md font-medium text-gray-800 truncate"
              title={section.name}
            >
              {section.name}
            </h3>
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <LucideReact.Tag
                size={16}
                className="text-blue-500 mr-2 flex-shrink-0"
              />
              <span className="truncate">{section.code}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <LucideReact.Calendar
                size={16}
                className="text-gray-400 mr-2 flex-shrink-0"
              />
              <time dateTime={section.created_at}>
                {formatDate(section.created_at)}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
