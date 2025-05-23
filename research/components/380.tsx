import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersImagesPartner {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            images: AutoViewInputSubTypes.actions_hosted_runner_image[];
        }
    }
    /**
     * Provides details of a hosted runner image
     *
     * @title GitHub-hosted runner image details.
    */
    export interface actions_hosted_runner_image {
        /**
         * The ID of the image. Use this ID for the `image` parameter when creating a new larger runner.
        */
        id: string;
        /**
         * The operating system of the image.
        */
        platform: string;
        /**
         * Image size in GB.
        */
        size_gb: number & tags.Type<"int32">;
        /**
         * Display name for this image.
        */
        display_name: string;
        /**
         * The image provider.
        */
        source: "github" | "partner" | "custom";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesPartner.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, images } = value;
  const formattedCount = `${total_count} image${total_count === 1 ? '' : 's'}`;

  const getSourceIcon = (
    source: AutoViewInputSubTypes.actions_hosted_runner_image['source']
  ): JSX.Element => {
    switch (source) {
      case 'github':
        return <LucideReact.Github size={14} className="text-gray-600" aria-label="GitHub source" />;
      case 'partner':
        return <LucideReact.Users size={14} className="text-blue-500" aria-label="Partner source" />;
      case 'custom':
        return <LucideReact.Code size={14} className="text-indigo-500" aria-label="Custom source" />;
      default:
        return <LucideReact.File size={14} className="text-gray-600" aria-label="Unknown source" />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total count */}
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.Image size={20} className="mr-2" aria-hidden="true" />
        <h2 className="text-lg font-semibold">{formattedCount}</h2>
      </div>

      {/* Empty state */}
      {images.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
          <p>No runner images available.</p>
        </div>
      ) : (
        // Grid of image cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-md font-medium text-gray-900 truncate">
                {img.display_name}
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-2">
                <LucideReact.Monitor size={14} className="mr-1" aria-hidden="true" />
                <span>{img.platform}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <LucideReact.Archive size={14} className="mr-1" aria-hidden="true" />
                <span>{img.size_gb} GB</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                {getSourceIcon(img.source)}
                <span className="ml-1 capitalize">{img.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
