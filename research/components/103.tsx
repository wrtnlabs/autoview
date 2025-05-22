import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IShoppingSaleReview {
    /**
     * Snapshot content of the review article.
     */
    export type ISnapshot = {
      /**
       * Score of the review.
       *
       * @title Score of the review
       */
      score: number;
      /**
       * Primary Key.
       *
       * @title Primary Key
       */
      id: string;
      /**
       * Creation time of snapshot record.
       *
       * In other words, creation time or update time or article.
       *
       * @title Creation time of snapshot record
       */
      created_at: string;
      /**
       * Format of body.
       *
       * Same meaning with extension like `html`, `md`, `txt`.
       *
       * @title Format of body
       */
      format: "html" | "md" | "txt";
      /**
       * Title of article.
       *
       * @title Title of article
       */
      title: string;
      /**
       * Content body of article.
       *
       * @title Content body of article
       */
      body: string;
      /**
       * List of attachment files.
       *
       * @title List of attachment files
       */
      files: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
    };
  }
  export namespace IAttachmentFile {
    export type ICreate = {
      /**
       * File name, except extension.
       *
       * If there's file `.gitignore`, then its name is an empty string.
       *
       * @title File name, except extension
       */
      name: string;
      /**
       * Extension.
       *
       * Possible to omit like `README` case.
       *
       * @title Extension
       */
      extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
      /**
       * URL path of the real file.
       *
       * @title URL path of the real file
       */
      url: string;
    };
  }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleReview.ISnapshot;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const renderBody = () => {
    if (value.format === "html") {
      return (
        <div
          className="text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: value.body }}
        />
      );
    }
    return (
      <p className="whitespace-pre-wrap text-sm text-gray-700 line-clamp-3">
        {value.body}
      </p>
    );
  };

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {value.title}
      </h2>
      <div className="flex items-center text-gray-500 text-sm mt-1 space-x-4">
        <div className="flex items-center gap-1">
          <LucideReact.Star size={16} className="text-amber-400" />
          <span>{value.score.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </div>
      <div className="mt-2">{renderBody()}</div>
      {value.files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Attachments
          </h3>
          <ul className="space-y-1">
            {value.files.map((file, index) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li
                  key={index}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <LucideReact.FileText
                    size={16}
                    className="text-indigo-500 mr-2"
                  />
                  <span className="truncate">{fileName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
