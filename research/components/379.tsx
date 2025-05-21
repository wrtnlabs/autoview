import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsHostedRunnersImagesGithubOwned.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const imageCount = value.total_count;
  const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Hosted Runner Images</h2>
      <p className="text-sm text-gray-600 mb-4">
        {imageCount} image{imageCount !== 1 ? "s" : ""}
      </p>

      {value.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.images.map((img) => (
            <div
              key={img.id}
              className="p-4 bg-gray-50 rounded border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {img.display_name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Platform:{" "}
                  <span className="font-medium text-gray-800">{img.platform}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Size:{" "}
                  <span className="font-medium text-gray-800">
                    {img.size_gb} GB
                  </span>
                </p>
              </div>
              <span
                className={
                  "inline-block mt-3 px-2 py-1 text-xs font-semibold text-white rounded " +
                  (img.source === "github"
                    ? "bg-blue-500"
                    : img.source === "partner"
                    ? "bg-green-500"
                    : "bg-gray-500")
                }
              >
                {capitalize(img.source)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images available.</p>
      )}
    </div>
  );
}
