import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace shared {
        export interface StringView {
            result?: string;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.shared.StringView;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived display text and presence flag
  const text = value.result?.trim() ?? '';
  const hasText = text.length > 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow sm:flex sm:items-start">
      <div className="flex-shrink-0">
        {hasText ? (
          <LucideReact.FileText size={24} className="text-gray-500" aria-hidden="true" />
        ) : (
          <LucideReact.AlertCircle size={24} className="text-gray-400" aria-hidden="true" />
        )}
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-4 flex-1">
        <h3 className="text-lg font-medium text-gray-900">Result</h3>
        {hasText ? (
          <p className="mt-2 text-gray-700 whitespace-pre-wrap line-clamp-3">{text}</p>
        ) : (
          <p className="mt-2 text-gray-500">No result available</p>
        )}
      </div>
    </div>
  );
}
