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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Determine status label and visual styling based on the `enabled` flag
  const statusLabel = input.enabled ? "Enforced" : "Not Enforced";
  const statusColor: 
    | "green"
    | "gray"
    | "red" = input.enabled ? "green" : "gray";

  // Fallback for missing URL (shouldn't happen if the input is valid)
  const urlDisplay = input.url ?? "N/A";

  // Compose a vertical card to present the protected-branch settings:
  // - CardHeader: shows a lock icon, a title, and the branch URL
  // - CardFooter: displays a colored chip to indicate whether enforcement is on
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with an icon and the URL
        type: "CardHeader",
        title: "Protected Branch Admin Enforcement",
        // Display the URL directly; you could use a Markdown component here
        description: urlDisplay,
        // Use a lock icon to visually represent protection
        startElement: {
          type: "Icon",
          id: input.enabled ? "lock" : "unlock",
          color: input.enabled ? "green" : "red",
          size: 24,
        },
      },
      {
        // Footer with a chip showing the enforcement status
        type: "CardFooter",
        childrenProps: {
          type: "Chip",
          label: statusLabel,
          color: statusColor,
          variant: "filled",
        },
      },
    ],
  };
}
