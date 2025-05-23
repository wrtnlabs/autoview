import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsHostedRunnersImagesGithubOwned {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesGithubOwned.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const sourceCounts = value.images.reduce<Record<AutoViewInputSubTypes.actions_hosted_runner_image["source"], number>>(
    (acc, img) => {
      acc[img.source] = (acc[img.source] || 0) + 1;
      return acc;
    },
    { github: 0, partner: 0, custom: 0 }
  );

  const getSourceIcon = (source: AutoViewInputSubTypes.actions_hosted_runner_image["source"]) => {
    switch (source) {
      case "github":
        return <LucideReact.Github className="text-gray-500" size={16} />;
      case "partner":
        return <LucideReact.Users className="text-gray-500" size={16} />;
      case "custom":
        return <LucideReact.Settings className="text-gray-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-500" size={16} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Runner Images</h2>
        <div className="text-sm text-gray-600">Total: {value.total_count}</div>
      </div>

      {/* Source summary */}
      <div className="flex flex-wrap gap-4 mb-4">
        {(["github", "partner", "custom"] as Array<AutoViewInputSubTypes.actions_hosted_runner_image["source"]>).map(
          (src) =>
            sourceCounts[src] > 0 && (
              <div key={src} className="flex items-center gap-1 text-sm text-gray-600">
                {getSourceIcon(src)}
                <span className="capitalize">{src}</span>
                <span>({sourceCounts[src]})</span>
              </div>
            )
        )}
      </div>

      {/* Image cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.images.map((img) => (
          <div
            key={img.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow transition-shadow"
          >
            <h3 className="text-md font-medium text-gray-800 mb-2 truncate">{img.display_name}</h3>
            <div className="flex flex-wrap text-sm text-gray-600 gap-4">
              <div className="flex items-center gap-1">
                <LucideReact.Server className="text-gray-500" size={16} />
                <span className="capitalize">{img.platform}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.HardDrive className="text-gray-500" size={16} />
                <span>{img.size_gb} GB</span>
              </div>
              <div className="flex items-center gap-1">
                {getSourceIcon(img.source)}
                <span className="capitalize">{img.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
