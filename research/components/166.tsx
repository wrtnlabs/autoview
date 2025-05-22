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
  const startRecord = (current - 1) * limit + 1;
  const endRecord = Math.min(current * limit, records);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="text-sm text-gray-600">
          Showing {startRecord}&ndash;{endRecord} of {records} records
        </div>
        <div className="mt-2 md:mt-0 text-sm text-gray-600">
          Page {current} of {pages}
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {data.map((section) => {
          const formattedDate = new Date(section.created_at).toLocaleDateString(
            undefined,
            { year: "numeric", month: "short", day: "numeric" },
          );
          return (
            <li
              key={section.id}
              className="py-4 flex flex-col sm:flex-row sm:justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {section.name}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <LucideReact.Tag size={16} className="mr-1 text-gray-400" />
                  <span className="truncate">{section.code}</span>
                </div>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 text-sm text-gray-500">
                <LucideReact.Calendar
                  size={16}
                  className="mr-1 text-gray-400"
                />
                <time dateTime={section.created_at}>{formattedDate}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
