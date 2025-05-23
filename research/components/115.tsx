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

  const firstItem = records === 0 ? 0 : (current - 1) * limit + 1;
  const lastItem = Math.min(current * limit, records);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <LucideReact.ListOrdered size={16} className="text-gray-400" aria-hidden="true" />
          <span>
            Showing {firstItem}&ndash;{lastItem} of {records} records
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 gap-1 mt-2 md:mt-0">
          <LucideReact.ChevronsLeft size={16} className="text-gray-400" aria-hidden="true" />
          <span>
            Page {current} of {pages}
          </span>
          <LucideReact.ChevronsRight size={16} className="text-gray-400" aria-hidden="true" />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Code</th>
              <th className="px-4 py-2 font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 font-medium text-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((section) => (
              <tr key={section.id} className="border-t">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 truncate">
                    <LucideReact.Hash size={16} className="text-gray-400" aria-hidden="true" />
                    <span className="truncate">{section.code}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className="font-medium text-gray-800 truncate">{section.name}</span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <LucideReact.Calendar size={16} className="text-gray-400" aria-hidden="true" />
                    <time
                      dateTime={section.created_at}
                      className="text-gray-600"
                    >
                      {new Date(section.created_at).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </time>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
