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
  const articles = value.data.list;
  const totalArticles = value.data.totalResult;
  const currentPage = value.data.page;
  const totalPages = value.data.totalPage;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Articles ({totalArticles})
        </h2>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Empty State */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={48} className="text-gray-400" />
          <p className="mt-2">No articles available.</p>
        </div>
      ) : (
        /* Article List */
        <ul className="space-y-6">
          {articles.map((item) => {
            // Snippet for contents
            const snippet =
              item.contents.length > 100
                ? item.contents.slice(0, 100) + "..."
                : item.contents;
            // Format createdAt (assuming ISO string)
            const formattedDate = item.createdAt
              ? new Date((item.createdAt as unknown as string)).toLocaleDateString()
              : "";

            return (
              <li key={item.id} className="flex space-x-4">
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt="Article thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x300/f8fafc/475569?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <LucideReact.ImageOff size={24} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-700 line-clamp-2">{snippet}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={16} />
                      <span>{formattedDate}</span>
                    </div>
                    {item.myPick && (
                      <LucideReact.Heart
                        className="text-red-500"
                        size={16}
                        aria-label="Picked"
                      />
                    )}
                    {item.isMine && (
                      <LucideReact.User
                        className="text-blue-500"
                        size={16}
                        aria-label="My Article"
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
