import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_ArticleType {
        export interface GetAllArticlesReponse_gt_ {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_ArticleType.GetAllArticlesReponse_gt_;
        }
    }
    export namespace PaginationResponseType_lt_ArticleType {
        export interface GetAllArticlesReponse_gt_ {
            list: AutoViewInputSubTypes.ArticleType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        }
    }
    export namespace ArticleType {
        export interface Element {
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
        }
    }
    export interface Date {
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    list: articles,
    count: countAll,
    totalResult: totalResults,
    totalPage: totalPages,
    page: currentPage,
  } = value.data;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600">
        <span>
          Showing {articles.length} of {totalResults} articles
        </span>
        <span className="mt-1 sm:mt-0">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Article List */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No articles available</span>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            // Format createdAt
            const dateObj = article.createdAt
              ? new Date(article.createdAt as unknown as string)
              : null;
            const formattedDate = dateObj
              ? dateObj.toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Unknown';

            return (
              <div
                key={article.id}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] w-full bg-gray-100">
                  <img
                    src={
                      article.thumbnail ||
                      'https://placehold.co/400x300/f1f5f9/64748b?text=No+Image'
                    }
                    alt="Article thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://placehold.co/400x300/f1f5f9/64748b?text=No+Image';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <p className="text-gray-800 text-sm line-clamp-2">
                    {article.contents}
                  </p>

                  {/* Metadata */}
                  <div className="mt-4 flex items-center text-sm text-gray-500 space-x-3">
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={16} className="text-gray-400" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {article.myPick ? (
                        <LucideReact.Heart
                          size={16}
                          className="text-red-500"
                          aria-label="Liked"
                        />
                      ) : (
                        <LucideReact.Heart
                          size={16}
                          className="text-gray-300"
                          aria-label="Not liked"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.MessageSquare size={16} className="text-gray-400" />
                      <span>{article.comments.length}</span>
                    </div>
                    {article.isMine && (
                      <span className="ml-auto flex items-center text-xs text-blue-500 font-medium">
                        <LucideReact.User size={12} />
                        <span className="ml-1">You</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
