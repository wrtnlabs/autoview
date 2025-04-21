import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Repository actions caches
     *
     * @title Repository actions caches
    */
    export type actions_cache_list = {
        /**
         * Total number of caches
        */
        total_count: number & tags.Type<"int32">;
        /**
         * Array of caches
        */
        actions_caches: {
            id?: number & tags.Type<"int32">;
            ref?: string;
            key?: string;
            version?: string;
            last_accessed_at?: string & tags.Format<"date-time">;
            created_at?: string & tags.Format<"date-time">;
            size_in_bytes?: number & tags.Type<"int32">;
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.actions_cache_list;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a list of repository action caches into a rich UI description
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no caches, display a friendly markdown message
  if (!input.actions_caches || input.actions_caches.length === 0) {
    return {
      type: "Markdown",
      content: "### No Caches Found\nNo repository action caches to display."
    };
  }

  // Build a DataListItem for each cache entry
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.actions_caches.map(cache => {
    // Safely format date and size if present
    const dateLabel = cache.last_accessed_at
      ? new Date(cache.last_accessed_at).toLocaleDateString()
      : undefined;
    const sizeLabel = cache.size_in_bytes != null
      ? `${cache.size_in_bytes.toLocaleString()} bytes`
      : undefined;

    // Assemble a list of chips for version, size, and last-accessed date
    const chipChildren: IAutoView.IAutoViewChipProps[] = [];
    if (cache.version) {
      chipChildren.push({
        type: "Chip",
        label: cache.version,
        color: "primary",
        size: "small"
      });
    }
    if (sizeLabel) {
      chipChildren.push({
        type: "Chip",
        label: sizeLabel,
        color: "secondary",
        size: "small"
      });
    }
    if (dateLabel) {
      chipChildren.push({
        type: "Chip",
        label: dateLabel,
        color: "info",
        size: "small"
      });
    }

    return {
      type: "DataListItem",
      // Use the cache key or fallback to ref or ID as the label
      label: {
        type: "Text",
        variant: "body1",
        content: cache.key || cache.ref || `#${cache.id}`
      },
      // Display chips if available, otherwise fallback to a simple text
      value: chipChildren.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: chipChildren
          }
        : {
            type: "Text",
            variant: "body2",
            content: "No details available"
          }
    };
  });

  // Header of the card summarizing the total count
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Repository Actions Caches",
    description: `Total caches: ${input.total_count}`,
    startElement: {
      type: "Icon",
      id: "database",   // FontAwesome icon name without prefix
      color: "blue",
      size: 24
    }
  };

  // Wrap the DataList inside CardContent for consistent padding
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems
    }
  };

  // A vertical card that holds the header and the content list
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
