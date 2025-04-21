import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A public SSH key used to sign Git commits
     *
     * @title SSH Signing Key
    */
    export type ssh_signing_key = {
        key: string;
        id: number & tags.Type<"int32">;
        title: string;
        created_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.ssh_signing_key[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no keys to display, render a simple markdown notice.
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "_No SSH signing keys available._",
    };
  }

  // Sort keys by creation date (newest first) for better UX.
  const sortedKeys = [...input].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Map each SSH key to a DataListItem component.
  const items: IAutoView.IAutoViewDataListItemProps[] = sortedKeys.map(
    (key) => {
      // Format the creation timestamp for end users.
      const date = new Date(key.created_at);
      const formattedDate = isNaN(date.getTime())
        ? key.created_at
        : date.toLocaleString();

      return {
        type: "DataListItem",
        // Label contains an icon, the key title, and a chip with the ID.
        label: [
          {
            type: "Icon",
            id: "key",           // font-awesome key icon
            color: "blue",       // visually highlight the icon
            size: 20,
          },
          {
            type: "Text",
            content: key.title,  // the human-readable name/title
            variant: "body1",
            color: "primary",
          },
          {
            type: "Chip",
            label: `#${key.id}`, // display the numeric ID
            variant: "outlined",
            size: "small",
            color: "info",
          },
        ],
        // Value shows when the key was created.
        value: {
          type: "Text",
          content: formattedDate,
          variant: "body2",
          color: "gray",
        },
      };
    }
  );

  // Wrap all items in a DataList for a clean, responsive layout on all devices.
  return {
    type: "DataList",
    childrenProps: items,
  };
}
