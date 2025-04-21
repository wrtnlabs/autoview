import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An autolink reference.
     *
     * @title Autolink reference
    */
    export type autolink = {
        id: number & tags.Type<"int32">;
        /**
         * The prefix of a key that is linkified.
        */
        key_prefix: string;
        /**
         * A template for the target URL that is generated if a key was found.
        */
        url_template: string;
        /**
         * Whether this autolink reference matches alphanumeric characters. If false, this autolink reference only matches numeric characters.
        */
        is_alphanumeric: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.autolink[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no autolinks, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No autolink references found.**"
    };
  }

  // Map each autolink entry to a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((link) => {
    // Badge around the link icon to show the autolink ID
    const badge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: link.id,
      // show the link icon as the badge child
      childrenProps: {
        type: "Icon",
        id: "link",
        color: "blue",
        size: 20,
      },
      // don't show zero badge, but IDs start from 1
      showZero: false,
    };

    // Chip to indicate whether this autolink matches alphanumeric or numeric-only
    const alnumChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: link.is_alphanumeric ? "Alphanumeric" : "Numeric Only",
      color: link.is_alphanumeric ? "success" : "info",
      size: "small",
      variant: "outlined",
    };

    // Compose the list item
    return {
      type: "ListItem",
      title: link.key_prefix,
      description: link.url_template,
      // visually emphasize the ID+icon at the start
      startElement: badge,
      // show the type of match as a chip at the end
      endElement: alnumChip,
    };
  });

  // Return the list container with all items
  return {
    type: "List",
    childrenProps: listItems,
  };
}
