import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    data: { list, count, totalResult, totalPage, page, search },
  } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We display a summary header and a grid of article cards.
  return (
    <div className="px-4 py-6 bg-gray-50">
      {/* Summary */}
      <div className="mb-4 text-gray-600 text-sm">
        Showing <span className="font-medium text-gray-800">{count}</span> of{' '}
        <span className="font-medium text-gray-800">{totalResult}</span> articles
        {search && (
          <span>
            {' '}
            for "<span className="italic">{search}</span>"
          </span>
        )}
        {' · '}Page <span className="font-medium">{page}</span>/
        <span className="font-medium">{totalPage}</span>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((article) => {
          const commentsCount = Array.isArray(article.comments)
            ? article.comments.length
            : 0;
          return (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Thumbnail or Placeholder */}
              {article.thumbnail ? (
                <img
                  src={article.thumbnail}
                  alt={`Article ${article.id} thumbnail`}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-800 text-sm line-clamp-3 break-words">
                  {article.contents}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                  {/* Comments count */}
                  <span className="text-gray-500 text-xs">
                    {commentsCount} comment{commentsCount === 1 ? '' : 's'}
                  </span>
                  {/* Picked badge */}
                  {article.myPick && (
                    <span className="text-red-500 text-xs font-medium">
                      ♥ Picked
                    </span>
                  )}
                  {/* Mine badge */}
                  {article.isMine && (
                    <span className="text-blue-500 text-xs font-medium">
                      My Post
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
