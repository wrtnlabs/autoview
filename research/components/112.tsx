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

  // Format ISO date to "MMM d, yyyy"
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Recursive renderer for hierarchical categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode => {
    return categories.map((cat) => {
      const indent = level * 16; // px
      return (
        <div
          key={cat.id}
          style={indent ? { marginLeft: indent } : undefined}
          className="mb-1"
        >
          <div className="flex items-center gap-1 text-sm">
            <LucideReact.Tag size={14} className="text-gray-400" />
            <span className="font-medium text-gray-700">{cat.name}</span>
            <span className="text-gray-500">({cat.code})</span>
          </div>
          {cat.children.length > 0 && renderCategories(cat.children, level + 1)}
        </div>
      );
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 space-y-6">
      {/* Pagination Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Shopping Channels
        </h2>
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-2 sm:mt-0">
          <div className="flex items-center gap-1">
            <LucideReact.FileText size={16} className="text-gray-500" />
            <span>
              Page {pagination.current} of {pagination.pages}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.ListChecks size={16} className="text-gray-500" />
            <span>{pagination.records} records</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Slash size={16} className="text-gray-500" />
            <span>{pagination.limit} per page</span>
          </div>
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <div key={channel.id} className="bg-white p-4 rounded-lg shadow">
            {/* Header: Channel Name & Code */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {channel.name}
              </h3>
              <span className="text-sm text-gray-500 truncate">
                ({channel.code})
              </span>
            </div>

            {/* Creation Date */}
            <div className="flex items-center text-sm text-gray-500 mt-1 gap-1">
              <LucideReact.Calendar size={14} />
              <span>{formatDate(channel.created_at)}</span>
            </div>

            {/* Categories Hierarchy */}
            <div className="mt-3">
              <div className="flex items-center gap-1 mb-1">
                <LucideReact.Tag size={16} className="text-gray-600" />
                <span className="font-medium text-gray-700 text-sm">
                  Categories
                </span>
              </div>
              {channel.categories.length > 0 ? (
                <div>{renderCategories(channel.categories)}</div>
              ) : (
                <div className="text-gray-400 italic text-sm">
                  No categories available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
