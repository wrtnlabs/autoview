import * as LucideReact from "lucide-react";
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
  const totalChannels = channels.length;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode => {
    const indentClass = level > 0 ? "ml-4 border-l border-gray-200 pl-4" : "";
    return (
      <ul className={`mt-2 space-y-1 ${indentClass}`}>
        {categories.map((cat) => (
          <li key={cat.id} className="text-sm text-gray-700">
            <span>{cat.name}</span>
            <span className="ml-1 text-xs text-gray-500">({cat.code})</span>
            {cat.children.length > 0 &&
              renderCategories(cat.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  // 2. Handle empty state
  if (totalChannels === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-4 text-lg">No shopping channels to display.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Shopping Channels
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.Users size={16} className="text-gray-500" />
            <span>
              {totalChannels} channel{totalChannels > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.ListChecks size={16} className="text-gray-500" />
            <span>{pagination.records.toLocaleString()} records total</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.ChevronLeft size={16} className="text-gray-500" />
            <span>
              Page {pagination.current} of {pagination.pages}
            </span>
            <LucideReact.ChevronRight size={16} className="text-gray-500" />
          </div>
        </div>
      </header>

      {/* Channel Cards */}
      <div className="space-y-6">
        {channels.map((channel) => (
          <article
            key={channel.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            {/* Channel Title & Meta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-xl font-medium text-gray-800 truncate">
                {channel.name}
              </h3>
              <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LucideReact.Tag size={16} className="text-blue-500" />
                  <span>{channel.code}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <time dateTime={channel.created_at}>
                    {formatDate(channel.created_at)}
                  </time>
                </div>
              </div>
            </div>

            {/* Categories Tree */}
            {channel.categories.length > 0 && (
              <section className="mt-4">
                <h4 className="text-md font-semibold text-gray-700">
                  Categories ({channel.categories.length})
                </h4>
                {renderCategories(channel.categories)}
              </section>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
