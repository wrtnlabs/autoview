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
  const {
    pagination: { current, limit, records, pages },
    data,
  } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with title and summary */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Shopping Sections</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-2 md:mt-0 space-y-1 md:space-y-0 md:space-x-6">
          <div>
            Showing <span className="font-medium">{data.length}</span> of{' '}
            <span className="font-medium">{records}</span> sections
          </div>
          <div className="flex items-center">
            <LucideReact.ChevronLeft size={16} className="text-gray-400" />
            <span className="mx-1">
              Page <span className="font-medium">{current}</span> of{' '}
              <span className="font-medium">{pages}</span>
            </span>
            <LucideReact.ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* List of sections */}
      <div className="divide-y divide-gray-200">
        {data.map((section) => (
          <div
            key={section.id}
            className="flex flex-col md:flex-row justify-between py-4"
          >
            <div className="md:flex-1">
              <h3 className="text-md font-medium text-gray-900 truncate">
                {section.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 truncate">
                Code: {section.code}
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-3 md:mt-0">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>{formatDate(section.created_at)}</span>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {data.length === 0 && (
          <div className="flex flex-col items-center py-8 text-gray-500">
            <LucideReact.AlertCircle size={48} />
            <span className="mt-2">No sections available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
