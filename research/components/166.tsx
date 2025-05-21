import { tags } from "typia";
import React from "react";
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
  const { current, limit, records, pages } = value.pagination;
  const start = (current - 1) * limit + 1;
  const end = Math.min(current * limit, records);

  const formattedDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Shopping Sections
        </h2>
        <p className="text-sm text-gray-600 mt-2 sm:mt-0">
          Showing {start}&ndash;{end} of {records} | Page {current}/{pages}
        </p>
      </div>
      <ul role="list" className="space-y-4">
        {value.data.map((section) => (
          <li
            key={section.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <div className="truncate">
              <p className="text-lg font-medium text-gray-900 truncate">
                {section.name}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {section.code.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3 sm:mt-0">
              Created on {formattedDate(section.created_at)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
