import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ChatTagsView = {
            next?: string;
            chatTags?: Schema.ChatTag[];
        };
    }
    export type ChatTag = {
        id?: string;
        channelId?: string;
        colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
        name: string;
        key: string;
        description?: string;
        /**
         * @deprecated
        */
        followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        createdAt?: number;
    };
}
type IAutoViewTransformerInputType = Schema.desk.ChatTagsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to map backend colorVariant to AutoView chip color
  const mapColor = (variant?: Schema.ChatTag["colorVariant"]): IAutoView.IAutoViewChipProps["color"] => {
    switch (variant) {
      case "red": return "red";
      case "orange": return "orange";
      case "yellow": return "yellow";
      case "olive": return "lime";
      case "green": return "green";
      case "cobalt": return "blue";
      case "purple": return "violet";
      case "pink": return "pink";
      case "navy": return "indigo";
      default: return "gray";
    }
  };

  // If no tags provided or empty, show a friendly markdown message
  const tagsList = input.chatTags;
  if (!tagsList || tagsList.length === 0) {
    return {
      type: "Markdown",
      content: "**No tags available**",
    };
  }

  // Compose each tag into a DataListItem: label is a colored chip, value is description or key
  const items: IAutoView.IAutoViewDataListItemProps[] = tagsList.map((tag) => {
    // Chip for the tag name
    const chip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: tag.name,
      color: mapColor(tag.colorVariant),
      size: "small",
      variant: "filled",
    };

    // Description or fallback to key, using markdown for richer styling if description exists
    const valueComponent: IAutoView.IAutoViewPresentationComponentProps = tag.description
      ? {
          type: "Markdown",
          content: tag.description,
        }
      : {
          type: "Text",
          content: tag.key,
          variant: "body2",
          color: "gray",
        };

    return {
      type: "DataListItem",
      label: chip,
      value: valueComponent,
    };
  });

  // Wrap items in a DataList for display
  return {
    type: "DataList",
    childrenProps: items,
  };
}
