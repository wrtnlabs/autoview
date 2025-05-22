import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IBbsArticle {
    /**
     * Snapshot of article.
     *
     * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
     * the article, as mentioned in {@link IBbsArticle}, the contents of the article
     * are separated from the article record to keep evidence and prevent fraud.
     */
    export type ISnapshot = {
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
export type AutoViewInput = AutoViewInputSubTypes.IBbsArticle.ISnapshot;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const formatLabel =
    value.format === "html"
      ? "HTML"
      : value.format === "md"
        ? "Markdown"
        : "Text";

  const formatIcon =
    value.format === "html" ? (
      <LucideReact.Code size={16} className="text-indigo-500" />
    ) : value.format === "md" ? (
      <LucideReact.FileText size={16} className="text-green-500" />
    ) : (
      <LucideReact.FileText size={16} className="text-gray-500" />
    );

  const hasFiles = Array.isArray(value.files) && value.files.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md w-full max-w-full">
      <header>
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mt-1">
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="mr-1" />
            <time dateTime={value.created_at}>{formattedDate}</time>
          </div>
          <div className="flex items-center">
            {formatIcon}
            <span className="ml-1">{formatLabel}</span>
          </div>
        </div>
      </header>

      <section className="mt-4 text-gray-700 text-sm overflow-hidden">
        {value.format === "html" ? (
          <div
            className="prose line-clamp-4"
            dangerouslySetInnerHTML={{ __html: value.body }}
          />
        ) : (
          <p className="whitespace-pre-wrap line-clamp-4">{value.body}</p>
        )}
      </section>

      {hasFiles && (
        <footer className="mt-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Attachments
          </h3>
          <div className="flex flex-wrap gap-2">
            {value.files.map((file, idx) => {
              const filenameExt = `${file.name}${file.extension ? `.${file.extension}` : ""}`;
              return (
                <div
                  key={idx}
                  className="flex items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded-md"
                  title={filenameExt}
                >
                  <LucideReact.FileText
                    size={14}
                    className="text-gray-500 mr-1"
                  />
                  <span className="truncate">{filenameExt}</span>
                </div>
              );
            })}
          </div>
        </footer>
      )}
    </article>
  );
}
