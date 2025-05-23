import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Porter Author
     *
     * @title Porter Author
    */
    export interface porter_author {
        id: number & tags.Type<"int32">;
        remote_id: string;
        remote_name: string;
        email: string;
        name: string;
        url: string & tags.Format<"uri">;
        import_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.porter_author[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const authors = value;
  const authorCount = authors.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (authorCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} className="text-gray-300" />
        <span className="mt-2 text-sm">No authors available.</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Users size={20} className="text-gray-600" />
        <span className="ml-2 text-lg font-semibold text-gray-800">
          {`Authors (${authorCount})`}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div
            key={author.remote_id}
            className="p-4 border border-gray-200 rounded-lg space-y-2"
          >
            <div className="flex items-center text-gray-800">
              <LucideReact.User size={16} className="text-gray-500" />
              <span className="ml-2 font-medium truncate">{author.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <LucideReact.Globe size={16} className="text-gray-400" />
              <span className="ml-2 truncate">{author.remote_name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <LucideReact.Mail size={16} className="text-gray-400" />
              <span className="ml-2 truncate">{author.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <LucideReact.Link size={16} className="text-gray-400" />
              <span className="ml-2 truncate">{author.url}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <LucideReact.ExternalLink size={16} className="text-gray-400" />
              <span className="ml-2 truncate">{author.import_url}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
