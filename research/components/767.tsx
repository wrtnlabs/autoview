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
export type AutoViewInput = AutoViewInputSubTypes.porter_author;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constant: extract hostname from profile URL for contextual display
  const profileHost = (() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md bg-white shadow-sm rounded-lg p-4">
      {/* Author Name */}
      <div className="flex items-center mb-3">
        <LucideReact.User size={24} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Details List */}
      <div className="space-y-2 text-gray-600 text-sm">
        {/* Email */}
        <div className="flex items-center">
          <LucideReact.Mail size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{value.email}</span>
        </div>

        {/* Remote Name */}
        <div className="flex items-center">
          <LucideReact.UserCheck size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{value.remote_name}</span>
        </div>

        {/* Profile URL */}
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{profileHost}</span>
        </div>

        {/* Import URL */}
        <div className="flex items-center">
          <LucideReact.Link size={16} className="text-gray-400 mr-1" />
          <span className="truncate">{value.import_url}</span>
        </div>
      </div>
    </div>
  );
}
