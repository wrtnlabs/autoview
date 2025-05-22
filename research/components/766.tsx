import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Porter Author
   *
   * @title Porter Author
   */
  export type porter_author = {
    id: number & tags.Type<"int32">;
    remote_id: string;
    remote_name: string;
    email: string;
    name: string;
    url: string & tags.Format<"uri">;
    import_url: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.porter_author[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived helper: truncate long text
  const truncate = (str: string, max = 30): string =>
    str.length > max ? `${str.slice(0, max)}...` : str;

  // 2. Empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No authors to display</span>
      </div>
    );
  }

  // 3. Compose the visual structure: grid of author cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {value.map((author) => (
        <div
          key={author.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center px-4 py-3 bg-gray-50 border-b">
            <LucideReact.User className="text-gray-600" size={20} />
            <h2 className="ml-2 font-semibold text-gray-800 truncate">
              {author.name}
            </h2>
          </div>
          <div className="p-4 space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
              <LucideReact.AtSign className="text-gray-400" size={16} />
              <span className="text-sm truncate">{author.remote_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Mail className="text-gray-400" size={16} />
              <span className="text-sm truncate">{author.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.Link className="text-gray-400" size={16} />
              <span
                className="text-sm text-blue-600 hover:underline truncate"
                title={author.url}
              >
                {truncate(author.url)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LucideReact.ArrowUpRight className="text-gray-400" size={16} />
              <span
                className="text-sm text-blue-600 hover:underline truncate"
                title={author.import_url}
              >
                {truncate(author.import_url)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
