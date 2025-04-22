import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * License
     *
     * @title License
    */
    export type license = {
        key: string;
        name: string;
        spdx_id: string | null;
        url: (string & tags.Format<"uri">) | null;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        description: string;
        implementation: string;
        permissions: string[];
        conditions: string[];
        limitations: string[];
        body: string;
        featured: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.license;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a GitHub license object into an AutoView UI component props
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Card Header: show license name, SPDX ID and a featured badge if applicable.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.spdx_id ?? "N/A",
    // If this license is featured, display a star badge
    endElement: input.featured
      ? {
          type: "Badge",
          dot: true,
          childrenProps: {
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 20,
          },
        }
      : undefined,
  };

  // 2. Markdown section for description and implementation details
  const markdownContent = [
    "**Description:**",
    input.description || "_No description provided._",
    "",
    "**Implementation:**",
    "`" + input.implementation + "`",
  ].join("\n\n");
  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownContent,
  };

  // Utility: create a DataListItem with plain text value
  const createTextItem = (
    label: string,
    value: string | null,
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: label, variant: "subtitle2" },
    value: { type: "Text", content: value ?? "N/A", variant: "body2" },
  });

  // Utility: create a DataListItem whose value is a group of chips
  const createChipGroupItem = (
    label: string,
    items: string[],
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: label, variant: "subtitle2" },
    value: {
      type: "ChipGroup",
      childrenProps: items.map((item) => ({
        type: "Chip",
        label: item,
        size: "small",
        variant: "outlined",
      })),
    },
  });

  // 3. Metadata list: key, node ID, SPDX ID
  const metadataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      createTextItem("Key", input.key),
      createTextItem("Node ID", input.node_id),
      createTextItem("SPDX ID", input.spdx_id),
    ],
  };

  // 4. Tag lists: permissions, conditions, limitations
  const tagItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.permissions?.length) {
    tagItems.push(createChipGroupItem("Permissions", input.permissions));
  }
  if (input.conditions?.length) {
    tagItems.push(createChipGroupItem("Conditions", input.conditions));
  }
  if (input.limitations?.length) {
    tagItems.push(createChipGroupItem("Limitations", input.limitations));
  }
  const tagsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: tagItems,
  };

  // 5. Card Content: combine markdown and all data lists
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [markdown, metadataList].concat(tagItems.length ? [tagsList] : []),
  };

  // 6. Card Footer: link to the GitHub HTML URL
  const footerButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: ["View on GitHub"],
    startElement: {
      type: "Icon",
      id: "external-link-alt",
      color: "blue",
      size: 16,
    },
    href: input.html_url,
    variant: "text",
    size: "small",
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButton,
  };

  // 7. Assemble the VerticalCard with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
