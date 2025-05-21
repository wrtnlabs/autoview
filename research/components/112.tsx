import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingChannel {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type IHierarchical = {
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
            data: AutoViewInputSubTypes.IShoppingChannel.IHierarchical[];
        };
    }
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
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export type IHierarchical = {
            /**
             * Children categories with hierarchical structure.
             *
             * @title Children categories with hierarchical structure
            */
            categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];
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
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export type IHierarchical = {
            /**
             * List of children categories with hierarchical structure.
             *
             * @title List of children categories with hierarchical structure
            */
            children: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
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
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingChannel.IHierarchical;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: channels } = value;
  const { current, limit, records, pages } = pagination;
  const startRecord = (current - 1) * limit + 1;
  const endRecord = Math.min(current * limit, records);

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    depth = 0,
  ): React.ReactNode {
    return (
      <ul
        className={`${
          depth > 0 ? "ml-4 border-l border-gray-200 pl-2" : "mt-2"
        } list-none`}
      >
        {categories.map((cat) => (
          <li key={cat.id} className="py-1">
            <div className="text-sm text-gray-700">
              {cat.name}
              <span className="text-xs text-gray-500 ml-1">({cat.code})</span>
            </div>
            {cat.children.length > 0 &&
              renderCategories(cat.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 text-gray-800 text-sm">
        Showing {startRecord}–{endRecord} of {records} channels (Page {current} of{" "}
        {pages})
      </div>
      <div className="space-y-6">
        {channels.map((channel) => (
          <div key={channel.id} className="border-b border-gray-200 pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {channel.name}
                </h3>
                <div className="text-sm text-gray-500">
                  Code: {channel.code} &bull; Created:{" "}
                  {formatDate(channel.created_at)}
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                Top-level Categories: {channel.categories.length}
              </div>
            </div>
            {renderCategories(channel.categories)}
          </div>
        ))}
      </div>
    </div>
  );
}
