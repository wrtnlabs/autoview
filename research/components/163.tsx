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

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Recursive renderer for categories
  const renderCategory = (
    category: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical,
    level: number = 0,
  ): React.ReactNode => (
    <div
      key={category.id}
      style={{ paddingLeft: level * 16 }}
      className="py-1"
    >
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-800">{category.name}</span>
        <span className="text-xs text-gray-500">({category.code})</span>
      </div>
      {category.children.length > 0 &&
        category.children.map((child) => renderCategory(child, level + 1))}
    </div>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Pagination Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="text-sm text-gray-600">
          Page{" "}
          <span className="font-medium text-gray-800">
            {pagination.current}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-800">{pagination.pages}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1 sm:mt-0">
          Showing{" "}
          <span className="font-medium text-gray-800">{pagination.limit}</span>{" "}
          per page of{" "}
          <span className="font-medium text-gray-800">
            {pagination.records}
          </span>{" "}
          records
        </div>
      </div>

      {/* Channels List */}
      <div className="grid gap-4">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="p-4 bg-gray-50 rounded-md border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {channel.name}
              </h2>
              <div className="text-sm text-gray-500">Code: {channel.code}</div>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              Created: {formatDate(channel.created_at)}
            </div>
            {channel.categories.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Categories
                </div>
                <div>{channel.categories.map((cat) => renderCategory(cat))}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
