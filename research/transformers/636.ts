import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export type protected_branch_admin_enforced = {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.protected_branch_admin_enforced;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { url, enabled } = input;

  // Create a header with a lock icon and branch title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Protected Branch Admin Enforced",
    description: url,
    startElement: {
      type: "Icon",
      id: "lock",
      color: "blue",
      size: 24,
    },
  };

  // Use markdown to render a clickable link and a chip to reflect the enforcement status
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        // Emphasize the branch URL and render as a markdown link
        content: `**Branch URL:** [${url}](${url})`,
      },
      {
        type: "Chip",
        label: enabled ? "Enforced" : "Disabled",
        color: enabled ? "green" : "red",
        variant: "filled",
      },
    ],
  };

  // Footer with a button linking to the branch URL
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // Single childProps is allowed: presenting a button
    childrenProps: {
      type: "Button",
      label: "Open Branch",
      href: url,
      variant: "text",
      color: "primary",
      size: "small",
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        color: "blue",
        size: 16,
      },
    },
  };

  // Compose into a vertical card for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
