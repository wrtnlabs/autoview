import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Team Membership
     *
     * @title Team Membership
    */
    export type team_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The role of the user in the team.
        */
        role: "member" | "maintainer";
        /**
         * The state of the user's membership in the team.
        */
        state: "active" | "pending";
    };
}
type IAutoViewTransformerInputType = Schema.team_membership;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map role to an icon and color for better visual distinction
  const roleIconId = input.role === "maintainer" ? "user-tie" : "user";
  const roleColor: IAutoView.IAutoViewChipProps["color"] = input.role === "maintainer" ? "blue" : "teal";

  // Map state to an icon and color (active vs pending)
  const stateIconId = input.state === "active" ? "check-circle" : "hourglass-half";
  const stateColor: IAutoView.IAutoViewChipProps["color"] = input.state === "active" ? "green" : "orange";

  // Create a chip for the role
  const roleChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.role,
    startElement: {
      type: "Icon",
      id: roleIconId,
      color: roleColor,
      size: 16,
    },
    color: roleColor,
    variant: "filled",
    size: "medium",
  };

  // Create a chip for the membership state
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.state,
    startElement: {
      type: "Icon",
      id: stateIconId,
      color: stateColor,
      size: 16,
    },
    color: stateColor,
    variant: "outlined",
    size: "medium",
  };

  // Group the role and state chips together
  const chipsGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: [roleChip, stateChip],
  };

  // Assemble a vertical card:
  // - Header shows the membership URL with a link icon
  // - Content holds the chip group
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.url,
        startElement: {
          type: "Icon",
          id: "link",
          color: "blue",
          size: 20,
        },
      },
      {
        type: "CardContent",
        childrenProps: [chipsGroup],
      },
    ],
  };
}
