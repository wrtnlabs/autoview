import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Permission check result for a given devcontainer config.
     *
     * @title Codespaces Permissions Check
    */
    export type codespaces_permissions_check_for_devcontainer = {
        /**
         * Whether the user has accepted the permissions defined by the devcontainer config
        */
        accepted: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.codespaces_permissions_check_for_devcontainer;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  const { accepted } = input;

  // Determine status icon based on acceptance
  const statusIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: accepted ? "check-circle" : "times-circle",
    color: accepted ? "green" : "red",
    size: 24, // medium-sized icon for visibility
  };

  // Build card header with title, description, and status icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Codespaces Permissions Check",
    description: accepted
      ? "User has accepted the permissions defined by the devcontainer config."
      : "User has not accepted the permissions defined by the devcontainer config.",
    startElement: statusIcon,
  };

  // Build a visual chip indicating accepted/denied status
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: accepted ? "Accepted" : "Denied",
    color: accepted ? "success" : "error",
    size: "medium",
    variant: "filled",
  };

  // Wrap the chip in card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single component or an array;
    // here we provide a single chip for clarity.
    childrenProps: statusChip,
  };

  // Compose a vertical card to ensure responsiveness on all device sizes.
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
