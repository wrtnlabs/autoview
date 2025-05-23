import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingChannel {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export interface IHierarchical {
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
        }
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
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export interface IHierarchical {
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
        }
    }
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export interface IHierarchical {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingChannel.IHierarchical;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Recursive renderer for hierarchical categories
  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
    level = 0,
  ): React.ReactNode => {
    if (categories.length === 0) return null;

    return (
      <ul className="mt-2 space-y-1">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`flex items-start space-x-2 ${
              level > 0 ? `pl-${level * 4}` : ""
            }`}
          >
            <LucideReact.Tag
              className="text-gray-400 mt-0.5 flex-shrink-0"
              size={16}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800 truncate">
                {cat.name}
              </div>
              <div className="text-xs text-gray-500">
                Code: {cat.code} · {formatDate(cat.created_at)}
              </div>
              {cat.children.length > 0 &&
                renderCategories(cat.children, level + 1)}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title & Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <LucideReact.Server className="text-blue-500" size={20} />
          <span>Shopping Channels</span>
        </h2>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <LucideReact.ListOrdered className="text-gray-400" size={16} />
            <span>
              Page {current} of {pages}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Database className="text-gray-400" size={16} />
            <span>Total: {records}</span>
          </div>
        </div>
      </div>

      {/* Channel List */}
      <ul className="space-y-6">
        {data.map((channel) => (
          <li key={channel.id} className="border-t pt-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              {/* Channel Title & Code */}
              <div className="flex items-center space-x-2">
                <LucideReact.Layers
                  className="text-indigo-500 flex-shrink-0"
                  size={18}
                />
                <span className="text-md font-medium text-gray-900">
                  {channel.name}
                </span>
                <span className="text-sm text-gray-500">({channel.code})</span>
              </div>
              {/* Creation Date */}
              <div className="mt-1 md:mt-0 flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Calendar size={14} className="text-gray-400" />
                <span>{formatDate(channel.created_at)}</span>
              </div>
            </div>

            {/* Nested Categories */}
            <div className="mt-3">{renderCategories(channel.categories)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
