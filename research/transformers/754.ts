import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The hierarchy between files in a Git repository.
     *
     * @title Git Tree
    */
    export type git_tree = {
        sha: string;
        url?: string & tags.Format<"uri">;
        truncated: boolean;
        /**
         * Objects specifying a tree structure
        */
        tree: {
            path: string;
            mode: string;
            type: string;
            sha: string;
            size?: number & tags.Type<"int32">;
            url?: string;
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.git_tree;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each tree entry into a DataListItem, with an icon + path on the left and
  // file metadata (size + sha) as chips on the right for blobs.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.tree.map((entry) => {
    // Choose folder vs. file icon
    const icon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: entry.type === "tree" ? "folder" : "file",
      color: entry.type === "tree" ? "yellow" : "gray",
      size: 20,
    };

    // For file blobs, show size and short SHA as small chips
    const metadata: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (entry.type === "blob") {
      metadata.push({
        type: "Chip",
        label: `${entry.size ?? 0} B`,
        variant: "outlined",
        size: "small",
        color: "gray",
      });
      metadata.push({
        type: "Chip",
        label: entry.sha.slice(0, 7),
        variant: "outlined",
        size: "small",
        color: "secondary",
      });
    }

    return {
      type: "DataListItem",
      // label can be an array of presentation components: icon + file/folder name
      label: [
        icon,
        {
          type: "Text",
          content: entry.path,
          variant: "body2",
        },
      ],
      // empty metadata array collapses to undefined (optional property)
      value: metadata.length > 0 ? metadata : undefined,
    };
  });

  // Wrap the list in a simple card with header + content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Git Repository Tree",
        description: `${input.tree.length} item${input.tree.length !== 1 ? "s" : ""}`,
      },
      {
        type: "CardContent",
        // The content is a DataList of all entries
        childrenProps: {
          type: "DataList",
          childrenProps: items,
        },
      },
    ],
  };
}
