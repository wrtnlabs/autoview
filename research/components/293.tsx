import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace TryPagination_lt_CategoryType {
    export type FindAllResponse_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.PaginationResponseType_lt_CategoryType.FindAllResponse_gt_;
    };
  }
  export namespace PaginationResponseType_lt_CategoryType {
    export type FindAllResponse_gt_ = {
      list: AutoViewInputSubTypes.CategoryType.Element[];
      count: number;
      totalResult: number;
      totalPage: number;
      search?: string;
      page: number;
    };
  }
  export namespace CategoryType {
    export type Element = {
      /**
       * 카테고리의 이름으로, 디자인 계열의 카테고리 이름
       */
      name: string;
      id: number;
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.TryPagination_lt_CategoryType.FindAllResponse_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation
  const { data } = value;
  const { list, count, totalResult, totalPage, page, search } = data;
  const displayedCount = list.length;
  const startIndex = (page - 1) * count + 1;
  const endIndex = startIndex + displayedCount - 1;
  const summaryText = `Showing ${startIndex}-${endIndex} of ${totalResult} categories`;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-xl font-semibold text-gray-800">
          <LucideReact.Tag className="mr-2 text-indigo-500" size={20} />
          Categories
        </h2>
        <span className="text-sm text-gray-500">{summaryText}</span>
      </div>

      {search && (
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-medium text-gray-800">Filter:</span> {search}
        </div>
      )}

      {displayedCount > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {list.map((category) => (
            <li
              key={category.id}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
            >
              <LucideReact.Tag className="text-gray-400" size={16} />
              <span className="text-sm text-gray-800 truncate">
                {category.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center text-gray-500 text-sm">
          <LucideReact.AlertCircle className="mr-2" size={20} />
          No categories found.
        </div>
      )}

      <div className="mt-4 flex justify-end items-center text-sm text-gray-500">
        <span>
          Page {page} of {totalPage}
        </span>
      </div>
    </div>
  );
}
