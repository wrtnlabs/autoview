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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: channels } = value;
  const { current, pages, records } = pagination;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  function renderCategories(
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): React.ReactNode {
    return (
      <ul className="mt-2 space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <div className="flex items-start">
              <LucideReact.Tag size={16} className="text-gray-400 flex-shrink-0 mt-1" />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-800">{cat.name}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <LucideReact.Calendar size={12} className="mr-1" />
                  <span>{formatDate(cat.created_at)}</span>
                </div>
              </div>
            </div>
            {cat.children.length > 0 && (
              <ul className="mt-2 pl-4 border-l border-gray-200">
                {renderCategories(cat.children)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <LucideReact.ListOrdered size={16} className="mr-2" />
        <span>
          Page {current} of {pages} &middot; {records} record{records !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Channel List or Empty State */}
      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <LucideReact.AlertCircle size={24} className="text-gray-400 mb-2" />
          <p className="text-gray-500">No shopping channels available.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {channels.map((channel) => (
            <div key={channel.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <LucideReact.ShoppingCart size={20} className="text-indigo-500" />
                  <h2 className="ml-2 text-lg font-semibold text-gray-800">{channel.name}</h2>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>{formatDate(channel.created_at)}</span>
                </div>
              </div>
              {channel.categories.length === 0 ? (
                <p className="mt-4 text-gray-500 text-sm">No categories available.</p>
              ) : (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Categories:</h3>
                  {renderCategories(channel.categories)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
