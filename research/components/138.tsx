import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSaleInquiryAnswer {
        export interface ISnapshot {
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
        }
    }
    export namespace IAttachmentFile {
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleInquiryAnswer.ISnapshot;



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

  function stripHTML(input: string): string {
    return input.replace(/<[^>]+>/g, "");
  }

  const plainTextBody =
    value.format === "html" ? stripHTML(value.body) : value.body;
  const displayBody =
    plainTextBody.length > 200
      ? plainTextBody.slice(0, 200) + "…"
      : plainTextBody;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-sm">
      <header className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <LucideReact.Calendar size={16} className="mr-1" />
          <time dateTime={value.created_at}>{formattedDate}</time>
        </div>
      </header>

      <section className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
        {displayBody}
      </section>

      {value.files.length > 0 && (
        <footer className="border-t pt-3">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Attachments
          </h3>
          <ul className="space-y-1">
            {value.files.map((file, idx) => {
              const fileName = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;
              return (
                <li key={idx}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:underline"
                  >
                    <LucideReact.FileText
                      size={16}
                      className="mr-1 text-indigo-500"
                    />
                    <span className="truncate">{fileName}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </footer>
      )}
    </article>
  );
}
