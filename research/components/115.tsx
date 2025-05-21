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
  const { pagination, data: sections } = value;
  const { current, limit, records, pages } = pagination;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formattedRecords = records.toLocaleString();
  const formattedLimit = limit.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Shopping Sections</h2>
        <p className="mt-1 text-sm text-gray-600">
          Page{" "}
          <span className="font-medium text-gray-800">
            {current} / {pages}
          </span>
          {" · "}
          <span className="font-medium text-gray-800">
            {formattedRecords} records
          </span>
          {" · "}
          <span className="font-medium text-gray-800">
            {formattedLimit} per page
          </span>
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                Code
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sections.map((section) => (
              <tr key={section.id}>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">
                  {section.name}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                  {section.code}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(section.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
