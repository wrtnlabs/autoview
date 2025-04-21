import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export type deploy_key = {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.deploy_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format timestamps for display
  const createdAt = new Date(input.created_at).toLocaleString();
  const lastUsed = input.last_used ? new Date(input.last_used).toLocaleString() : undefined;

  // Build a list of key/value pairs to show in a DataList
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  dataItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "ID" },
    value: { type: "Text", content: input.id.toString() },
  });

  // Created At
  dataItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At" },
    value: { type: "Text", content: createdAt },
  });

  // Last Used (optional)
  if (lastUsed) {
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Last Used" },
      value: { type: "Text", content: lastUsed },
    });
  }

  // Added By (optional)
  if (input.added_by) {
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Added By" },
      value: { type: "Text", content: input.added_by },
    });
  }

  // Verification status as a colored chip
  dataItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Verified" },
    value: {
      type: "Chip",
      label: input.verified ? "Yes" : "No",
      color: input.verified ? "success" : "error",
      variant: "filled",
    },
  });

  // Read-only status as a chip
  dataItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Read Only" },
    value: {
      type: "Chip",
      label: input.read_only ? "Yes" : "No",
      color: input.read_only ? "warning" : "primary",
      variant: "outlined",
    },
  });

  // Enabled status as a chip (if provided)
  if (typeof input.enabled === "boolean") {
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Enabled" },
      value: {
        type: "Chip",
        label: input.enabled ? "Yes" : "No",
        color: input.enabled ? "success" : "error",
        variant: "filled",
      },
    });
  }

  // Repository URL as a text button with an icon
  dataItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Repository URL" },
    value: {
      type: "Button",
      variant: "text",
      href: input.url,
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        color: "teal",
        size: 16,
      },
      label: "Open",
    },
  });

  // Assemble the card header, summarizing key properties
  const headerDescriptionParts: string[] = [];
  headerDescriptionParts.push(input.read_only ? "Read‑only" : "Read/write");
  headerDescriptionParts.push(input.verified ? "Verified" : "Unverified");
  const headerDescription = headerDescriptionParts.join(" • ");

  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: headerDescription,
    startElement: {
      type: "Icon",
      id: "key",
      color: "cyan",
      size: 24,
    },
  };

  // The main content: first a DataList, then the raw SSH key in a markdown code block
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "DataList",
        childrenProps: dataItems,
      },
      {
        type: "Markdown",
        content: [
          "ssh",
          input.key,
          "```",
        ].join("\n"),
      },
    ],
  };

  // Return a vertical card containing header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}
