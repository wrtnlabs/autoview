import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export type diff_entry = {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number & tags.Type<"int32">;
        deletions: number & tags.Type<"int32">;
        changes: number & tags.Type<"int32">;
        blob_url: string & tags.Format<"uri">;
        raw_url: string & tags.Format<"uri">;
        contents_url: string & tags.Format<"uri">;
        patch?: string;
        previous_filename?: string;
    };
}
type IAutoViewTransformerInputType = Schema.diff_entry[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of diff entries into a visual DataList component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no diffs, show a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "### No changes detected\n\nThere are no modifications to display."
    };
  }

  // Map git status to icon names and colors
  const statusMap: Record<
    Schema.diff_entry["status"],
    { id: string; color: IAutoView.IAutoViewIconProps["color"] }
  > = {
    added: { id: "plus", color: "green" },
    removed: { id: "trash", color: "red" },
    modified: { id: "pen", color: "orange" },
    renamed: { id: "exchange-alt", color: "blue" },
    copied: { id: "copy", color: "teal" },
    changed: { id: "arrows-alt-h", color: "gray" },
    unchanged: { id: "minus", color: "gray" }
  };

  // Build a DataListItemProps for each diff entry
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((entry) => {
    // Pick an icon + color for the entry's status (fallback to generic file icon)
    const statusInfo = statusMap[entry.status] ?? { id: "file", color: "gray" };

    // Label area: [ status icon, filename text ]
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: statusInfo.id,
        color: statusInfo.color,
        size: 16
      },
      {
        type: "Text",
        content: entry.filename,
        variant: "body1"
      }
    ];

    // Value area: chips showing additions, deletions, changes + a "View" button
    const value: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Chip",
        label: `+${entry.additions}`,
        color: "green",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Chip",
        label: `-${entry.deletions}`,
        color: "red",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Chip",
        label: `${entry.changes} change(s)`,
        color: "teal",
        size: "small",
        variant: "outlined"
      },
      {
        type: "Button",
        label: "View",
        href: entry.blob_url,
        startElement: {
          type: "Icon",
          id: "eye",
          size: 16,
          color: "blue"
        },
        variant: "text",
        color: "primary",
        size: "small"
      }
    ];

    return {
      type: "DataListItem",
      label,
      value
    };
  });

  // Return a responsive DataList wrapping all items
  return {
    type: "DataList",
    childrenProps: items
  };
}
