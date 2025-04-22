import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The public key used for setting Actions Secrets.
     *
     * @title ActionsPublicKey
    */
    export type actions_public_key = {
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
type IAutoViewTransformerInputType = Schema.actions_public_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Helper to create a DataListItem with an icon and text.
   * iconId: FontAwesome icon name (kebab-case, without prefix).
   * label: Label text.
   * value: String value to display.
   */
  function createDataListItem(
    iconId: string,
    label: string,
    value: string
  ): IAutoView.IAutoViewDataListItemProps {
    return {
      type: "DataListItem",
      // Label cell: icon + text
      label: [
        {
          type: "Icon",
          id: iconId,
          color: "teal",
          size: 20,
        },
        {
          type: "Text",
          content: label,
        },
      ],
      // Value cell: plain text
      value: {
        type: "Text",
        content: value,
      },
    };
  }

  // Build list items for fields that exist
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Always display key_id
  dataItems.push(createDataListItem("fingerprint", "Key ID", input.key_id));

  // Optional numeric ID (converted to string)
  if (input.id !== undefined) {
    dataItems.push(
      createDataListItem("hashtag", "Record ID", String(input.id))
    );
  }

  // Optional URL (clickable link)
  if (input.url) {
    dataItems.push(
      createDataListItem("link", "API URL", input.url)
    );
  }

  // Optional creation timestamp (formatted)
  if (input.created_at) {
    // Try to parse into a human-readable form; fallback to raw
    let createdAtText: string;
    try {
      const date = new Date(input.created_at);
      createdAtText = isNaN(date.getTime())
        ? input.created_at
        : date.toLocaleString();
    } catch {
      createdAtText = input.created_at;
    }
    dataItems.push(
      createDataListItem("calendar", "Created At", createdAtText)
    );
  }

  // Card header: show title or default, plus creation date subtitle
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title ?? "Public Key Details",
    description: input.created_at ? new Date(input.created_at).toLocaleDateString() : undefined,
    startElement: {
      type: "Icon",
      id: "key",
      color: "blue",
      size: 24,
    },
  };

  // DataList component to show structured fields
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Markdown component to display the Base64 key in a code block
  const keyMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: [
      "#### Public Key\n",
      "base64\n",
      input.key,
      "\n```",
    ].join(""),
  };

  // Card content aggregates the DataList and the key code block
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList, keyMarkdown],
  };

  // Wrap everything in a vertical card for a responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}
