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
  // Format creation date nicely, fallback to raw string on invalid date
  const formattedDate = input.created_at
    ? (() => {
        const d = new Date(input.created_at);
        return isNaN(d.getTime()) ? input.created_at : d.toLocaleString();
      })()
    : undefined;

  // Card header with icon, title, and creation timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title ?? "Codespaces Public Key",
    description: formattedDate,
    startElement: {
      type: "Icon",
      id: "key",
      color: "teal",
      size: 24,
    },
  };

  // Build a list of key properties: key_id, optional id, optional url
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Always include the key identifier
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Key ID" },
    value: { type: "Text", content: input.key_id },
  });

  // If a numeric record ID is provided, show it as a chip
  if (input.id !== undefined) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Record ID" },
      value: {
        type: "Chip",
        label: input.id.toString(),
        variant: "outlined",
      },
    });
  }

  // If a URL is provided, render it as a link-style button
  if (input.url) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: [
          { type: "Icon", id: "external-link", color: "blue", size: 16 },
          " URL",
        ],
      },
      value: {
        type: "Button",
        label: input.url,
        href: input.url,
        variant: "text",
        startElement: { type: "Icon", id: "link", size: 16 },
      },
    });
  }

  // Assemble the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Show the raw public key in a code block via markdown for readability
  const keyBlock: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: [
      "text",
      input.key,
      "```"
    ].join("\n"),
  };

  // Card content holds the details list and the key code block
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList, keyBlock],
  };

  // Return a vertical card combining header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
