import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_CategoryType {
        export interface FindAllResponse_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_CategoryType.FindAllResponse_gt_;
        }
    }
    export namespace PaginationResponseType_lt_CategoryType {
        export interface FindAllResponse_gt_ {
            list: AutoViewInputSubTypes.CategoryType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        }
    }
    export namespace CategoryType {
        export interface Element {
            /**
             * 카테고리의 이름으로, 디자인 계열의 카테고리 이름
            */
            name: string;
            id: number;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_CategoryType.FindAllResponse_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { data } = value;
  const { list, count, totalResult, totalPage, search, page } = data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with title and pagination info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        <div className="mt-2 sm:mt-0 text-sm text-gray-500">
          Page {page} of {totalPage}
        </div>
      </div>

      {/* Optional search query display */}
      {search && (
        <div className="mb-2 text-sm text-gray-600">
          Search results for: <span className="font-medium">"{search}"</span>
        </div>
      )}

      {/* Summary of results */}
      <div className="mb-4 text-sm text-gray-600">
        Showing <span className="font-medium">{list.length}</span> of{' '}
        <span className="font-medium">{totalResult}</span> results
      </div>

      {/* List or empty state */}
      {list.length > 0 ? (
        <ul className="space-y-2">
          {list.map((category) => (
            <li
              key={category.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <LucideReact.Tag
                className="text-blue-500 flex-shrink-0"
                size={16}
                aria-label="Category icon"
              />
              <span className="text-gray-800 truncate">{category.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} aria-label="No data" />
          <p className="mt-2 text-sm">No categories found.</p>
        </div>
      )}
    </div>
  );
}
