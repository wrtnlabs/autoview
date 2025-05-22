import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The GitHub Pages deployment status.
     *
     * @title GitHub Pages
    */
    export type page_deployment = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.page_deployment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Derive a shortened commit SHA or ID for concise display
  const commitIdStr = value.id.toString();
  const shortCommitId = commitIdStr.length > 7 ? commitIdStr.slice(0, 7) + '…' : commitIdStr;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        GitHub Pages Deployment
      </h2>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="font-medium text-gray-700">Deployment ID</dt>
          <dd className="font-mono text-gray-900">{shortCommitId}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Site URL</dt>
          <dd className="truncate text-blue-600">{value.page_url}</dd>
        </div>
        {value.preview_url && (
          <div>
            <dt className="font-medium text-gray-700">Preview URL</dt>
            <dd className="truncate text-blue-600">{value.preview_url}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium text-gray-700">Status Monitor URL</dt>
          <dd className="truncate text-gray-500">{value.status_url}</dd>
        </div>
      </dl>
    </section>
  );
}
