import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Results of a successful merge upstream request
     *
     * @title Merged upstream
    */
    export type merged_upstream = {
        message?: string;
        merge_type?: "merge" | "fast-forward" | "none";
        base_branch?: string;
    };
}
type IAutoViewTransformerInputType = Schema.merged_upstream;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input with defaults
  const { base_branch, merge_type, message } = input;
  // Determine merge type value, default to "none" if missing
  const typeKey = merge_type ?? "none";

  // Human-friendly labels for merge types
  const mergeLabels: Record<string, string> = {
    merge: "Merged",
    "fast-forward": "Fast-Forward",
    none: "No Merge",
  };

  // FontAwesome icon IDs to represent each merge type visually
  const iconIds: Record<string, string> = {
    merge: "code-branch",
    "fast-forward": "arrow-right",
    none: "ban",
  };

  // Color scheme for each merge type
  const colors: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    merge: "green",
    "fast-forward": "blue",
    none: "red",
  };

  const label = mergeLabels[typeKey];
  const iconId = iconIds[typeKey];
  const color = colors[typeKey];

  // Card header with icon, branch name, and merge status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Show base branch or a generic title if unspecified
    title: base_branch ? `Base Branch: ${base_branch}` : "Upstream Merge Result",
    description: label,
    startElement: {
      type: "Icon",
      id: iconId,
      color,
      size: 32,
    },
  };

  // Card content: either markdown of the message or fallback text
  const contentChild: IAutoView.IAutoViewPresentationComponentProps = message
    ? {
        type: "Markdown",
        content: message!,
      }
    : {
        type: "Text",
        content: "No additional message provided.",
        variant: "body2",
        color: "gray",
      };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChild,
  };

  // Footer chip summarizing the merge type
  const footerChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label,
    color: color as any, // Chip color accepts the same string union
    size: "small",
    variant: "filled",
    startElement: {
      type: "Icon",
      id: iconId,
      color,
      size: 16,
    },
  };

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChip,
  };

  // Compose a vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
