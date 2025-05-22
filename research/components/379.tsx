import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsHostedRunnersImagesGithubOwned {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      images: AutoViewInputSubTypes.actions_hosted_runner_image[];
    };
  }
  /**
   * Provides details of a hosted runner image
   *
   * @title GitHub-hosted runner image details.
   */
  export type actions_hosted_runner_image = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesGithubOwned.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const images = value.images;
  const countLabel = totalCount === 1 ? "Image" : "Images";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header with total count */}
      <div className="flex items-center mb-4">
        <LucideReact.Image
          size={20}
          className="text-gray-600"
          aria-hidden="true"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          {totalCount} {countLabel}
        </h2>
      </div>

      {/* Empty state */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <LucideReact.AlertCircle
            size={24}
            className="mb-2"
            aria-hidden="true"
          />
          <span>No runner images available</span>
        </div>
      ) : (
        /* Grid of image cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => {
            // Determine badge color based on source
            const badgeStyles =
              img.source === "github"
                ? "bg-gray-200 text-gray-800"
                : img.source === "partner"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800";
            const sourceLabel =
              img.source.charAt(0).toUpperCase() + img.source.slice(1);

            return (
              <div
                key={img.id}
                className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
              >
                {/* Platform */}
                <div className="flex items-center space-x-2">
                  <LucideReact.Server
                    size={16}
                    className="text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {img.platform}
                  </span>
                </div>

                {/* Size */}
                <div className="flex items-center space-x-2 mt-2">
                  <LucideReact.HardDrive
                    size={16}
                    className="text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-600">
                    {img.size_gb} GB
                  </span>
                </div>

                {/* Display name (truncated if too long) */}
                <div className="mt-4 text-sm text-gray-700 line-clamp-2">
                  {img.display_name}
                </div>

                {/* Source badge */}
                <div className="mt-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badgeStyles}`}
                  >
                    {sourceLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
