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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO date strings into a human-readable format.
  // Falls back to the raw input if parsing fails.
  const formatDate = (iso?: string): string => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { total_count, actions_caches } = input;

  // If there are no cache entries, show a friendly markdown message.
  if (!actions_caches || actions_caches.length === 0) {
    return {
      type: "Markdown",
      content: `**No action caches found.**\n\nYou can configure your workflow to generate caches by adding cache steps to your actions.`,
    };
  }

  // Transform each cache entry into a DataListItemProps.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = actions_caches.map((cache) => {
    // Chip for the version field
    const versionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: cache.version ?? "N/A",
      color: "teal",
      size: "small",
      variant: "outlined",
    };
    // Chip for the size_in_bytes field (converted to KB)
    const sizeLabel =
      typeof cache.size_in_bytes === "number"
        ? `${Math.round(cache.size_in_bytes / 1024)} KB`
        : "N/A";
    const sizeChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: sizeLabel,
      color: "violet",
      size: "small",
      variant: "outlined",
    };
    // Text component for the last accessed date
    const lastAccessText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: `Last accessed: ${formatDate(cache.last_accessed_at)}`,
      variant: "caption",
      color: "gray",
    };
    // Text component for the created date
    const createdText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: `Created: ${formatDate(cache.created_at)}`,
      variant: "caption",
      color: "gray",
    };

    return {
      type: "DataListItem",
      // Use the cache key as the primary label
      label: {
        type: "Text",
        content: cache.key ?? "Unknown key",
        variant: "body1",
      },
      // Display version, size, and timestamps as value components
      value: [versionChip, sizeChip, lastAccessText, createdText],
    };
  });

  // Compose a card with a header and the data list
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Repository Actions Caches",
    description: `${total_count} entr${total_count === 1 ? "y" : "ies"}`,
    startElement: {
      type: "Icon",
      id: "database",
      color: "blue",
      size: 24,
    },
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: listItems,
    },
  };

  // Return a vertical card containing the header and the list of caches
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
