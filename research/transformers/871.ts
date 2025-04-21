import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type secret_scanning_push_protection_bypass = {
        reason?: Schema.secret_scanning_push_protection_bypass_reason;
        /**
         * The time that the bypass will expire in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        expire_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The token type this bypass is for.
        */
        token_type?: string;
    };
    /**
     * The reason for bypassing push protection.
    */
    export type secret_scanning_push_protection_bypass_reason = "false_positive" | "used_in_tests" | "will_fix_later";
}
type IAutoViewTransformerInputType = Schema.secret_scanning_push_protection_bypass;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map bypass reasons to human-readable labels and color codes
  const reasonMap: Record<string, { label: string; color: IAutoView.IAutoViewChipProps["color"] }> = {
    false_positive: { label: "False Positive", color: "success" },
    used_in_tests: { label: "Used in Tests", color: "info" },
    will_fix_later: { label: "Will Fix Later", color: "warning" },
  };

  // Determine human-readable reason and its visual color
  const rawReason = input.reason ?? "";
  const { label: reasonLabel, color: reasonColor } =
    reasonMap[rawReason] ?? { label: "Unknown Reason", color: "gray" };

  // Create a Chip to represent the bypass reason
  const reasonChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: reasonLabel,
    color: reasonColor,
    variant: "outlined",
    size: "medium",
  };

  // Handle expiration date: parse and format or show "No Expiry"
  const expireRaw = input.expire_at;
  let expireLabel: string;
  if (expireRaw == null) {
    expireLabel = "No Expiry";
  } else {
    // Attempt to format in user's locale; fallback to raw string on error
    try {
      const dt = new Date(expireRaw);
      expireLabel = isNaN(dt.getTime())
        ? expireRaw
        : dt.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      expireLabel = expireRaw;
    }
  }
  const expireChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: expireLabel,
    color: expireRaw == null ? "darkGray" : "primary",
    variant: expireRaw == null ? "filled" : "outlined",
    size: "small",
  };

  // Token type chip
  const tokenTypeLabel = input.token_type?.trim() || "Unknown Token";
  const tokenTypeChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: tokenTypeLabel,
    color: "secondary",
    variant: "outlined",
    size: "small",
  };

  // Compose a DataList to display the three fields
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Field name
        label: {
          type: "Text",
          content: "Reason",
          variant: "subtitle2",
          color: "tertiary",
        },
        // Visual chip for reason
        value: reasonChip,
      },
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Expires At",
          variant: "subtitle2",
          color: "tertiary",
        },
        value: expireChip,
      },
      {
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Token Type",
          variant: "subtitle2",
          color: "tertiary",
        },
        value: tokenTypeChip,
      },
    ],
  };

  // Card header with icon and title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Push Protection Bypass",
    description: "Overview of the bypass settings",
    // Unlock icon as a visual cue
    startElement: {
      type: "Icon",
      id: "unlock",
      color: "blue",
      size: 24,
    },
  };

  // Card content wrapping the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Combine header and content into a vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
