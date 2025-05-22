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
  const startIndex = records > 0 ? (current - 1) * limit + 1 : 0;
  const endIndex = Math.min(current * limit, records);

  // Date formatter for created_at fields
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Pagination Summary */}
      <div className="mb-4 text-sm text-gray-600">
        {records === 0 ? (
          "No sections available."
        ) : (
          <>
            Showing{" "}
            <span className="font-medium text-gray-800">{startIndex}</span>–{" "}
            <span className="font-medium text-gray-800">{endIndex}</span> of{" "}
            <span className="font-medium text-gray-800">{records}</span> sections
            (Page{" "}
            <span className="font-medium text-gray-800">{current}</span> of{" "}
            <span className="font-medium text-gray-800">{pages}</span>)
          </>
        )}
      </div>
      {/* Sections List */}
      <div className="space-y-4">
        {value.data.map((section) => (
          <div
            key={section.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {section.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 truncate">{section.code}</p>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4 text-sm text-gray-500 whitespace-nowrap">
              Created on{" "}
              <time dateTime={section.created_at}>
                {dateFormatter.format(new Date(section.created_at))}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
