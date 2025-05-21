import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.porter_author;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const personalHost = React.useMemo(() => {
    try {
      return new URL(value.url).hostname;
    } catch {
      return value.url;
    }
  }, [value.url]);

  const importHost = React.useMemo(() => {
    try {
      return new URL(value.import_url).hostname;
    } catch {
      return value.import_url;
    }
  }, [value.import_url]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      {value.remote_name && (
        <p className="mt-1 text-sm text-gray-500 truncate">{value.remote_name}</p>
      )}
      <div className="mt-4 space-y-2 text-gray-700">
        <div className="flex items-center">
          <span className="font-medium w-24">Email:</span>
          <a
            href={`mailto:${value.email}`}
            className="text-blue-600 hover:underline truncate"
          >
            {value.email}
          </a>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-24">Website:</span>
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            {personalHost}
          </a>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-24">Import From:</span>
          <a
            href={value.import_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            {importHost}
          </a>
        </div>
      </div>
    </div>
  );
}
