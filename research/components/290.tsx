import * as LucideReact from "lucide-react";
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
  // 1. Data aggregation/transformation
  const { list, count, totalResult, totalPage, search, page } = value.data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const renderArticleCard = (
    article: AutoViewInputSubTypes.ArticleType.Element,
  ) => {
    // Format createdAt to a readable date
    const formattedDate = (() => {
      try {
        const d = new Date(article.createdAt as unknown as string);
        return d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch {
        return "";
      }
    })();

    return (
      <li
        key={article.id}
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="w-full md:w-24 h-40 md:h-24 bg-gray-100 flex-shrink-0 relative">
          {article.thumbnail ? (
            <img
              src={article.thumbnail}
              alt="Article thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/150x150/e2e8f0/1e293b?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <LucideReact.Image size={32} strokeWidth={1.5} />
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="text-gray-800 text-sm line-clamp-2">
            {article.contents}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              {article.myPick ? (
                <LucideReact.Heart className="text-red-500" size={14} />
              ) : (
                <LucideReact.Heart className="text-gray-300" size={14} />
              )}
              <span>Pick</span>
            </div>
          </div>
        </div>
      </li>
    );
  };

  // 3. Return the React element.
  return (
    <div className="p-4 space-y-6">
      {/* Pagination summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
        <div>
          Showing {list.length} of {totalResult} articles
          {search ? <span className="ml-2 italic">for "{search}"</span> : null}
        </div>
        <div className="mt-1 sm:mt-0">
          Page {page} of {totalPage}
        </div>
      </div>

      {/* Empty state */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-4 text-sm">No articles found.</p>
        </div>
      ) : (
        <ul className="space-y-4">{list.map(renderArticleCard)}</ul>
      )}
    </div>
  );
}
