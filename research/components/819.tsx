import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The GitHub Pages deployment status.
     *
     * @title GitHub Pages
    */
    export interface page_deployment {
        /**
         * The ID of the GitHub Pages deployment. This is the Git SHA of the deployed commit.
        */
        id: (number & tags.Type<"int32">) | string;
        /**
         * The URI to monitor GitHub Pages deployment status.
        */
        status_url: string;
        /**
         * The URI to the deployed GitHub Pages.
        */
        page_url: string;
        /**
         * The URI to the deployed GitHub Pages preview.
        */
        preview_url?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.page_deployment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const idStr: string = String(value.id);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        GitHub Pages Deployment
      </h2>
      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <span className="ml-2">
            <span className="font-medium">Deployment ID:</span>{" "}
            <span className="break-all">{idStr}</span>
          </span>
        </div>
        <div className="flex items-center text-gray-700 overflow-hidden">
          <LucideReact.Link size={16} className="text-gray-500" />
          <div className="ml-2 flex-1 min-w-0">
            <span className="font-medium text-gray-600">Page URL:</span>{" "}
            <span className="text-blue-600 truncate">{value.page_url}</span>
          </div>
        </div>
        {value.preview_url && (
          <div className="flex items-center text-gray-700 overflow-hidden">
            <LucideReact.Eye size={16} className="text-gray-500" />
            <div className="ml-2 flex-1 min-w-0">
              <span className="font-medium text-gray-600">Preview URL:</span>{" "}
              <span className="text-blue-600 truncate">{value.preview_url}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
