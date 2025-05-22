import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IPageIShoppingChannel.IHierarchical;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: channels } = value;
  const formattedDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const countCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    categories.reduce((sum, cat) => sum + 1 + countCategories(cat.children), 0);

  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): React.ReactNode => (
    <ul className="list-disc list-inside">
      {categories.map((cat) => (
        <li key={cat.id} className="truncate">
          <span className="font-medium">{cat.name}</span>
          {cat.children.length > 0 && (
            <div className="ml-4">{renderCategories(cat.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Pagination Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg shadow p-4">
        <div className="flex items-center text-gray-700 space-x-2">
          <LucideReact.ListOrdered size={20} className="text-gray-500" />
          <span className="text-sm">
            Page {pagination.current} of {pagination.pages}
          </span>
        </div>
        <div className="flex items-center text-gray-600 space-x-2 mt-2 sm:mt-0">
          <LucideReact.Database size={20} className="text-gray-500" />
          <span className="text-sm">
            {pagination.records.toLocaleString()} record
            {pagination.records !== 1 && "s"} total
          </span>
        </div>
        <div className="flex items-center text-gray-600 space-x-2 mt-2 sm:mt-0">
          <LucideReact.Slash size={20} className="text-gray-500" />
          <span className="text-sm">
            {pagination.limit.toLocaleString()} per page
          </span>
        </div>
      </div>

      {/* Channel List */}
      {channels.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 p-6 bg-white rounded-lg shadow">
          <LucideReact.AlertCircle size={32} />
          <p className="mt-2 text-sm">No shopping channels available.</p>
        </div>
      ) : (
        channels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {channel.name}
              </h2>
              <span className="mt-1 sm:mt-0 text-sm text-gray-500 truncate">
                {channel.code}
              </span>
            </div>
            <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} />
                <span>{formattedDate(channel.created_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Tag size={16} />
                <span>{countCategories(channel.categories)} categories</span>
              </div>
            </div>
            {channel.categories.length > 0 && (
              <div className="pt-2 border-t border-gray-100 text-sm text-gray-700">
                {renderCategories(channel.categories)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
