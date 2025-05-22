import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsHostedRunnersImagesPartner {
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
  AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesPartner.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalImages = value.total_count;
  const totalSize = value.images.reduce((sum, img) => sum + img.size_gb, 0);
  const avgSize = value.images.length
    ? (totalSize / value.images.length).toFixed(1)
    : "0";
  const sourceStyles: Record<"github" | "partner" | "custom", string> = {
    github: "bg-gray-100 text-gray-800",
    partner: "bg-green-100 text-green-800",
    custom: "bg-blue-100 text-blue-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.images.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <LucideReact.AlertCircle
          aria-hidden="true"
          size={48}
          className="mx-auto text-gray-400"
        />
        <p className="mt-4 text-gray-500">No runner images available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center text-gray-700 text-sm mb-4 space-x-6">
        <div className="flex items-center">
          <LucideReact.Image
            aria-hidden="true"
            size={16}
            className="mr-1 text-gray-500"
          />
          <span>Total Images: {totalImages}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.BarChart2
            aria-hidden="true"
            size={16}
            className="mr-1 text-gray-500"
          />
          <span>Avg Size: {avgSize} GB</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.images.map((img) => (
          <div
            key={img.id}
            className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {img.display_name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-1">
              <LucideReact.Computer
                aria-hidden="true"
                size={16}
                className="mr-1"
              />
              <span className="capitalize">{img.platform}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <LucideReact.HardDrive
                aria-hidden="true"
                size={16}
                className="mr-1"
              />
              <span>{img.size_gb} GB</span>
            </div>
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wide rounded-full ${sourceStyles[img.source]}`}
            >
              {img.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
