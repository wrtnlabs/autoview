import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsCacheUsageByRepository {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            repository_cache_usages: Schema.actions_cache_usage_by_repository[];
        };
    }
    /**
     * GitHub Actions Cache Usage by repository.
     *
     * @title Actions Cache Usage by repository
    */
    export type actions_cache_usage_by_repository = {
        /**
         * The repository owner and name for the cache usage being shown.
        */
        full_name: string;
        /**
         * The sum of the size in bytes of all the active cache items in the repository.
        */
        active_caches_size_in_bytes: number & tags.Type<"int32">;
        /**
         * The number of active caches in the repository.
        */
        active_caches_count: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsCacheUsageByRepository.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Helper to format bytes into human-readable strings.
function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 B";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${value} ${sizes[i]}`;
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const usages = input.repository_cache_usages || [];

  // If there's no data, display a friendly markdown message.
  if (usages.length === 0) {
    return {
      type: "Markdown",
      content: "_No repository cache usage data available._"
    };
  }

  // Sort repositories by descending total cache size to highlight largest consumers.
  const sorted = [...usages].sort(
    (a, b) => b.active_caches_size_in_bytes - a.active_caches_size_in_bytes
  );

  // Build a DataList where each item shows repo name and two chips: count & size.
  const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map(repo => ({
    type: "DataListItem",
    // Use Markdown for the label to make the repository name stand out.
    label: [
      {
        type: "Markdown",
        content: `**${repo.full_name}**`
      }
    ],
    // Value is an array of chips for count and size.
    value: [
      {
        type: "Chip",
        label: `${repo.active_caches_count}`,
        // Database icon to represent count of caches.
        startElement: {
          type: "Icon",
          id: "database",
          color: "blue",
          size: 16
        },
        variant: "outlined",
        size: "small",
        color: "primary"
      },
      {
        type: "Chip",
        label: formatBytes(repo.active_caches_size_in_bytes),
        // Download icon to represent size in bytes.
        startElement: {
          type: "Icon",
          id: "download",
          color: "teal",
          size: 16
        },
        variant: "outlined",
        size: "small",
        color: "success"
      }
    ]
  }));

  return {
    type: "DataList",
    childrenProps: items
  };
}
