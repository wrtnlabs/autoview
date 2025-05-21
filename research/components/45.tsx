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

  // Format ISO date to a human-readable form.
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Recursively count total categories in the tree.
  const countCategories = (
    cats: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[]
  ): number => {
    let count = 0;
    for (const cat of cats) {
      count++;
      if (cat.children.length) {
        count += countCategories(cat.children);
      }
    }
    return count;
  };

  // Recursively render a nested list of categories.
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[]
  ): React.ReactNode => (
    <ul className="list-disc list-inside ml-4 mt-1">
      {categories.map((cat) => (
        <li key={cat.id} className="mt-1">
          <span className="font-medium text-gray-700 truncate">{cat.name}</span>
          {cat.children.length > 0 && renderCategories(cat.children)}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const { current, pages, records } = value.pagination;

  return (
    <section className="p-4 bg-gray-50 rounded-lg">
      {/* Pagination summary */}
      <div className="mb-4 text-sm text-gray-600">
        Page{" "}
        <span className="font-semibold text-gray-800">{current}</span> of{" "}
        <span className="font-semibold text-gray-800">{pages}</span> (Total{" "}
        <span className="font-semibold text-gray-800">{records}</span> records)
      </div>

      {/* Channels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.data.map((channel) => {
          const totalCats = countCategories(channel.categories);

          return (
            <div
              key={channel.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {channel.name}
              </h2>
              <div className="mt-1 text-sm text-gray-600">
                Code: <span className="font-medium">{channel.code}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Created:{" "}
                <span className="font-medium">
                  {formatDate(channel.created_at)}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                Categories: <span className="font-medium">{totalCats}</span>
              </div>

              {channel.categories.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-800">
                    Category Tree:
                  </div>
                  {renderCategories(channel.categories)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
