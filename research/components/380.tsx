import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesPartner.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation & transformation
  const { total_count, images } = value;
  const averageSize =
    images.length > 0
      ? images.reduce((sum, img) => sum + img.size_gb, 0) / images.length
      : 0;
  const formattedAvgSize = averageSize.toFixed(1);
  const sourceCounts = images.reduce((acc, img) => {
    acc[img.source] = (acc[img.source] || 0) + 1;
    return acc;
  }, {} as Record<"github" | "partner" | "custom", number>);

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Hosted Runner Images</h2>
        <div className="mt-2 flex flex-wrap space-x-4 text-sm text-gray-600">
          <span>
            Total: <span className="font-medium text-gray-800">{total_count}</span>
          </span>
          <span>
            Avg Size: <span className="font-medium text-gray-800">{formattedAvgSize} GB</span>
          </span>
          {(["github", "partner", "custom"] as const).map((source) => (
            <span key={source}>
              {source.charAt(0).toUpperCase() + source.slice(1)}:{" "}
              <span className="font-medium text-gray-800">{sourceCounts[source] || 0}</span>
            </span>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-800 truncate">{img.display_name}</h3>
            <dl className="mt-2 text-sm text-gray-600 space-y-1">
              <div>
                <dt className="inline font-semibold">Platform:</dt>{" "}
                <dd className="inline">{img.platform}</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Size:</dt>{" "}
                <dd className="inline">{img.size_gb} GB</dd>
              </div>
              <div>
                <dt className="inline font-semibold">Source:</dt>{" "}
                <dd className="inline capitalize">{img.source}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
  // 3. Return the React element.
}
