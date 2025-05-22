import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace TryPagination_lt_ArticleType {
    export type GetAllArticlesReponse_gt_ = {
      result: true;
      code: 1000;
      requestToResponse?: string;
      data: AutoViewInputSubTypes.PaginationResponseType_lt_ArticleType.GetAllArticlesReponse_gt_;
    };
  }
  export namespace PaginationResponseType_lt_ArticleType {
    export type GetAllArticlesReponse_gt_ = {
      list: AutoViewInputSubTypes.ArticleType.Element[];
      count: number;
      totalResult: number;
      totalPage: number;
      search?: string;
      page: number;
    };
  }
  export namespace ArticleType {
    export type Element = {
      id: number;
      contents: string;
      createdAt: AutoViewInputSubTypes.Date;
      thumbnail: string | null;
      /**
       * 내가 pick(좋아요) 한 게시글인지 아닌지 여부를 의미하며 기본 값은 false이다.
       */
      myPick: boolean;
      isMine: boolean;
      writer: any;
      comments: any[];
    };
  }
  export type Date = {};
}
export type AutoViewInput =
  AutoViewInputSubTypes.TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { data } = value;
  const { list, count, totalResult, totalPage, page } = data;

  // Helper to format ISO date strings
  const formatDate = (iso: unknown): string => {
    try {
      const d = new Date(iso as string);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Placeholder image URL for missing or broken thumbnails
  const placeholderUrl =
    "https://placehold.co/400x300/f1f5f9/64748b?text=Article";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Pagination summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600">
        <span>
          Page {page} of {totalPage}
        </span>
        <span className="mt-1 sm:mt-0">
          Showing {count} of {totalResult} articles
        </span>
      </div>
      {/* Article list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((item) => {
          const formattedDate = formatDate(item.createdAt);
          return (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              {/* "Yours" badge */}
              {item.isMine && (
                <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  Yours
                </span>
              )}
              {/* Thumbnail */}
              <div className="w-full aspect-[4/3] bg-gray-100">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt="Article Thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        placeholderUrl;
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <LucideReact.ImageOff className="text-gray-400" size={48} />
                  </div>
                )}
              </div>
              {/* Content snippet */}
              <div className="flex-1 p-4 flex flex-col">
                <p className="text-gray-800 text-sm line-clamp-3 mb-4">
                  {item.contents}
                </p>
                {/* Metadata row */}
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <LucideReact.Heart
                        size={16}
                        className={
                          item.myPick ? "text-red-500" : "text-gray-400"
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.MessageCircle size={16} />
                      <span>{item.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
            <LucideReact.AlertCircle size={48} />
            <span className="mt-2">No articles found</span>
          </div>
        )}
      </div>
    </div>
  );
}
