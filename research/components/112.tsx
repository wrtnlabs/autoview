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
  const formattedPage = `Page ${pagination.current} of ${pagination.pages}`;
  const formattedRecords = pagination.records.toLocaleString();

  const countCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): number =>
    categories.reduce(
      (acc, cat) => acc + 1 + countCategories(cat.children),
      0,
    );

  const renderCategories = (
    categories: AutoViewInputSubTypes.IShoppingChannelCategory.IHierarchical[],
  ): JSX.Element | null => {
    if (categories.length === 0) return null;
    return (
      <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
        {categories.map((cat) => (
          <li key={cat.id}>
            <div className="flex items-center text-gray-700">
              <LucideReact.Tag size={16} className="text-gray-500 mr-1" />
              <span className="font-medium">{cat.name}</span>
              <span className="ml-2 text-sm text-gray-400">({cat.code})</span>
            </div>
            {renderCategories(cat.children)}
          </li>
        ))}
      </ul>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
          <LucideReact.List size={16} className="mr-1" />
          <span>{formattedPage}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Database size={16} className="mr-1" />
          <span>{formattedRecords} records</span>
        </div>
      </div>
      <ul className="space-y-4">
        {channels.map((channel) => (
          <li key={channel.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center">
                <LucideReact.ShoppingCart
                  size={20}
                  className="text-indigo-500 mr-2"
                />
                <span className="text-lg font-semibold">{channel.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({channel.code})
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 sm:mt-0">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>
                    {new Date(channel.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Tag size={16} className="mr-1" />
                  <span>
                    {countCategories(channel.categories)}{' '}
                    {countCategories(channel.categories) === 1
                      ? 'category'
                      : 'categories'}
                  </span>
                </div>
              </div>
            </div>
            {channel.categories.length > 0 && (
              <div className="mt-3">{renderCategories(channel.categories)}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
