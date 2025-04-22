import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Information about the seat breakdown and policies set for an organization with a Copilot Business or Copilot Enterprise subscription.
     *
     * @title Copilot Organization Details
    */
    export type copilot_organization_details = {
        seat_breakdown: Schema.copilot_organization_seat_breakdown;
        /**
         * The organization policy for allowing or blocking suggestions matching public code (duplication detection filter).
        */
        public_code_suggestions: "allow" | "block" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot Chat in the IDE.
        */
        ide_chat?: "enabled" | "disabled" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot features on GitHub.com.
        */
        platform_chat?: "enabled" | "disabled" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot in the CLI.
        */
        cli?: "enabled" | "disabled" | "unconfigured";
        /**
         * The mode of assigning new seats.
        */
        seat_management_setting: "assign_all" | "assign_selected" | "disabled" | "unconfigured";
        /**
         * The Copilot plan of the organization, or the parent enterprise, when applicable.
        */
        plan_type?: "business" | "enterprise";
    };
    /**
     * The breakdown of Copilot Business seats for the organization.
     *
     * @title Copilot Seat Breakdown
    */
    export type copilot_organization_seat_breakdown = {
        /**
         * The total number of seats being billed for the organization as of the current billing cycle.
        */
        total?: number & tags.Type<"int32">;
        /**
         * Seats added during the current billing cycle.
        */
        added_this_cycle?: number & tags.Type<"int32">;
        /**
         * The number of seats that are pending cancellation at the end of the current billing cycle.
        */
        pending_cancellation?: number & tags.Type<"int32">;
        /**
         * The number of users who have been invited to receive a Copilot seat through this organization.
        */
        pending_invitation?: number & tags.Type<"int32">;
        /**
         * The number of seats that have used Copilot during the current billing cycle.
        */
        active_this_cycle?: number & tags.Type<"int32">;
        /**
         * The number of seats that have not used Copilot during the current billing cycle.
        */
        inactive_this_cycle?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.copilot_organization_details;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure seat breakdown, with safe defaults
  const breakdown = input.seat_breakdown;
  const {
    total = 0,
    added_this_cycle = 0,
    pending_cancellation = 0,
    pending_invitation = 0,
    active_this_cycle = 0,
    inactive_this_cycle = 0,
  } = breakdown;

  // Helper to map policy values to chip colors
  const statusColor: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    enabled: "success",
    disabled: "error",
    unconfigured: "warning",
    allow: "success",
    block: "error",
    assign_all: "primary",
    assign_selected: "secondary",
    business: "primary",
    enterprise: "indigo",
  };

  // Build an array of policy chips
  const policyChips: IAutoView.IAutoViewChipProps[] = [];

  // Code suggestion policy
  policyChips.push({
    type: "Chip",
    label: `Public Code Suggestions: ${input.public_code_suggestions}`,
    color: statusColor[input.public_code_suggestions] ?? "warning",
    size: "small",
    variant: "outlined",
  });

  // IDE Chat policy
  {
    const val = input.ide_chat ?? "unconfigured";
    policyChips.push({
      type: "Chip",
      label: `IDE Chat: ${val}`,
      color: statusColor[val] ?? "warning",
      size: "small",
      variant: "outlined",
    });
  }

  // Platform Chat policy
  {
    const val = input.platform_chat ?? "unconfigured";
    policyChips.push({
      type: "Chip",
      label: `Platform Chat: ${val}`,
      color: statusColor[val] ?? "warning",
      size: "small",
      variant: "outlined",
    });
  }

  // CLI policy
  {
    const val = input.cli ?? "unconfigured";
    policyChips.push({
      type: "Chip",
      label: `CLI: ${val}`,
      color: statusColor[val] ?? "warning",
      size: "small",
      variant: "outlined",
    });
  }

  // Seat management setting
  {
    const val = input.seat_management_setting;
    policyChips.push({
      type: "Chip",
      label: `Seat Management: ${val}`,
      color: statusColor[val] ?? "secondary",
      size: "small",
      variant: "outlined",
    });
  }

  // Plan type (optional)
  if (input.plan_type) {
    policyChips.push({
      type: "Chip",
      label: `Plan: ${input.plan_type}`,
      color: statusColor[input.plan_type] ?? "gray",
      size: "small",
      variant: "outlined",
    });
  }

  // Compose a DataList of seat breakdown metrics
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Total Seats" }],
        value: { type: "Text", content: `${total}` },
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Added This Cycle" }],
        value: { type: "Text", content: `${added_this_cycle}` },
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Pending Cancellation" }],
        value: { type: "Text", content: `${pending_cancellation}` },
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Pending Invitations" }],
        value: { type: "Text", content: `${pending_invitation}` },
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Active This Cycle" }],
        value: { type: "Text", content: `${active_this_cycle}` },
      },
      {
        type: "DataListItem",
        label: [{ type: "Text", content: "Inactive This Cycle" }],
        value: { type: "Text", content: `${inactive_this_cycle}` },
      },
    ],
  };

  // Assemble the final card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with icon, title, and plan description
        type: "CardHeader",
        title: "Copilot Organization Details",
        description: input.plan_type ? `Plan Type: ${input.plan_type}` : undefined,
        startElement: {
          type: "Icon",
          id: "building", // FontAwesome building icon
          color: "blue",
          size: 28,
        },
      },
      {
        // Content section with breakdown and policy chips
        type: "CardContent",
        childrenProps: [
          dataList,
          { type: "Divider", orientation: "horizontal" },
          {
            type: "ChipGroup",
            childrenProps: policyChips,
          },
        ],
      },
    ],
  };

  return card;
}
