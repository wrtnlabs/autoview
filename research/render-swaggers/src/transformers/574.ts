import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.actions_cache_usage_by_repository;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to convert bytes to a human-readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);
    // Round to one decimal place, remove trailing .0
    return `${parseFloat(value.toFixed(1))} ${sizes[i]}`;
  };

  // Compute human-readable size
  const humanSize = formatBytes(input.active_caches_size_in_bytes);

  // Card header with GitHub icon and repository name
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.full_name,
    startElement: {
      type: "Icon",
      id: "github",
      size: 24,
      color: "gray",
    },
    // Show total size in description as a quick glance
    description: humanSize,
  };

  // Build a DataList of metrics: count and total size
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Label as text
      label: {
        type: "Text",
        content: "Active Cache Count",
        variant: "body2",
      },
      // Value as a colored chip to stand out
      value: {
        type: "Chip",
        label: input.active_caches_count.toString(),
        color: "primary",
        variant: "outlined",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Active Cache Size",
        variant: "body2",
      },
      value: {
        type: "Chip",
        label: humanSize,
        color: "secondary",
        variant: "filled",
        size: "small",
      },
    },
  ];

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card content wrapping the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Compose a vertical card: header + content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}
