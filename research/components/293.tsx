import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_CategoryType.FindAllResponse_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    list,
    count,
    totalResult,
    totalPage,
    search,
    page,
  } = value.data;

  // Determine header title and summary text
  const title = search
    ? `Search results for "${search}"`
    : "Categories";
  const summary = `${count} item${count !== 1 ? "s" : ""}` +
    (totalResult > count ? ` of ${totalResult}` : "") +
    ` · Page ${page} of ${totalPage}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0">{summary}</p>
      </header>

      {list.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {list.map((category) => (
            <span
              key={category.id}
              className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full truncate"
              title={category.name}
            >
              {category.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500">No categories found.</p>
      )}
    </section>
  );
}
