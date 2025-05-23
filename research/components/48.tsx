import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingSection {
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
    export interface IShoppingSection {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { current, limit, records, pages } = value.pagination;
  const startRecord = (current - 1) * limit + 1;
  const endRecord = Math.min(current * limit, records);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="text-gray-700 font-medium">
          Page{' '}
          <span className="font-semibold text-gray-900">{current}</span> of{' '}
          <span className="font-semibold text-gray-900">{pages}</span>
        </div>
        <div className="text-gray-500 text-sm mt-2 sm:mt-0">
          Showing{' '}
          <span className="font-semibold text-gray-900">{startRecord}</span>–
          <span className="font-semibold text-gray-900">{endRecord}</span> of{' '}
          <span className="font-semibold text-gray-900">{records}</span> records
        </div>
      </div>

      {/* List of Shopping Sections */}
      <ul className="space-y-3">
        {value.data.map((section) => {
          const formattedDate = new Date(section.created_at).toLocaleDateString(
            undefined,
            { year: 'numeric', month: 'short', day: 'numeric' }
          );
          return (
            <li
              key={section.id}
              className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              {/* Section Name & Creation Date */}
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-800 font-semibold truncate">
                  {section.name}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1 flex-shrink-0 text-gray-400"
                  />
                  <time dateTime={section.created_at}>
                    {formattedDate}
                  </time>
                </div>
              </div>

              {/* Section Code */}
              <div className="mt-3 sm:mt-0 flex items-center text-sm text-gray-500">
                <LucideReact.Tag
                  size={16}
                  className="mr-1 flex-shrink-0 text-gray-400"
                />
                <span className="truncate">{section.code}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
