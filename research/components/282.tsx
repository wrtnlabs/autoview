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
  const { data } = value;
  const { list, totalResult, totalPage, page } = data;

  const infoText = `Showing ${list.length} of ${totalResult} articles (Page ${page}/${totalPage})`;

  const formatDate = (dateValue: any): string => {
    const d = new Date(dateValue);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <div className="text-sm text-gray-600">{infoText}</div>
      <ul className="space-y-6">
        {list.map((article) => (
          <li key={article.id} className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              {article.thumbnail ? (
                <img
                  src={article.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {article.contents}
                </h3>
                {article.isMine && (
                  <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                    Your Article
                  </span>
                )}
              </div>
              <p className="mt-1 text-gray-700 text-sm line-clamp-2">
                {article.contents}
              </p>
              <div className="mt-3 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
                <span>{formatDate(article.createdAt)}</span>
                <span>{article.comments.length} comments</span>
                {article.myPick && (
                  <span className="flex items-center text-red-500">
                    <svg
                      className="w-4 h-4 mr-1 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    Liked
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
