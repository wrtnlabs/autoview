import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * License
 *
 * @title License
*/
type license = {
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
type IAutoViewTransformerInputType = license;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare markdown content sections by using the input fields.
  // Build bullet lists for arrays if they exist.
  const buildBulletList = (items: string[] | undefined): string => {
    if (!items || items.length === 0) return "None";
    return items.map(item => `- ${item}`).join("\n");
  };

  // Compose a markdown string with license details.
  const markdownContent = `
# License Details

**Key:** ${input.key}
**Name:** ${input.name}
**SPDX ID:** ${input.spdx_id ? input.spdx_id : "N/A"}
**Description:** ${input.description}

## Implementation

${input.implementation}

## Permissions
${buildBulletList(input.permissions)}

## Conditions
${buildBulletList(input.conditions)}

## Limitations
${buildBulletList(input.limitations)}

[View more details](${input.html_url})
  `.trim();

  // Create a CardHeader component to visually highlight the license title.
  // The startElement uses an icon to emphasize this is a license detail.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.spdx_id ? `SPDX ID: ${input.spdx_id}` : undefined,
    // Using an icon as the start element for visual appeal.
    startElement: {
      type: "Icon",
      id: "file-alt", // Assumes an appropriate icon is available in the icon library.
      color: "blue",
      size: 24,
    }
  };

  // Create a CardContent component that contains the markdown view of the license details.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    }
  };

  // Compose the final VerticalCard component that holds header and content.
  // VerticalCard is chosen for its flexibility and responsiveness.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  return verticalCard;
}
