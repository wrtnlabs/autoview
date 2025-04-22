import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The public key used for setting Codespaces secrets.
     *
     * @title CodespacesPublicKey
    */
    export type codespaces_public_key = {
        /**
         * The identifier for the key.
        */
        key_id: string;
        /**
         * The Base64 encoded public key.
        */
        key: string;
        id?: number & tags.Type<"int32">;
        url?: string;
        title?: string;
        created_at?: string;
    };
}
type IAutoViewTransformerInputType = Schema.codespaces_public_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare the card header, using an icon and fallback title/description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Title or fallback if missing
    title: input.title ?? "Codespaces Public Key",
    // Use created_at as subtitle if provided
    description: input.created_at
      ? `Created: ${new Date(input.created_at).toLocaleString()}`
      : "Created: N/A",
    // Show a key icon to visually indicate this is a key
    startElement: {
      type: "Icon",
      id: "key",        // FontAwesome "key" icon
      color: "cyan",
      size: 24,
    },
  };

  // Build individual data list items for each property
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Key ID
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      variant: "subtitle2",
      content: "Key ID",
    },
    value: {
      type: "Chip",
      label: input.key_id,
      variant: "outlined",
      color: "indigo",
      size: "small",
    },
  });

  // Internal numeric ID (optional)
  if (input.id !== undefined) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Internal ID",
      },
      value: {
        type: "Chip",
        label: String(input.id),
        variant: "outlined",
        color: "gray",
        size: "small",
      },
    });
  }

  // URL (optional)
  if (input.url) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "URL",
      },
      value: {
        type: "Button",
        variant: "text",
        size: "small",
        color: "primary",
        href: input.url,
        startElement: {
          type: "Icon",
          id: "link", // link icon
          color: "blue",
          size: 20,
        },
        label: input.url,
      },
    });
  }

  // The actual Base64 public key, displayed as a code block via Markdown
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      variant: "subtitle2",
      content: "Public Key",
    },
    value: {
      type: "Markdown",
      // Wrap in fenced code block for readability
      content: "base64\n" + input.key + "\n```",
    },
  });

  // Compose the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Wrap everything in a VerticalCard for a responsive, stacked layout
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };
}
