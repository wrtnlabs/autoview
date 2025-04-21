import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type actions_get_default_workflow_permissions = {
        default_workflow_permissions: Schema.actions_default_workflow_permissions;
        can_approve_pull_request_reviews: Schema.actions_can_approve_pull_request_reviews;
    };
    /**
     * The default workflow permissions granted to the GITHUB_TOKEN when running workflows.
    */
    export type actions_default_workflow_permissions = "read" | "write";
    /**
     * Whether GitHub Actions can approve pull requests. Enabling this can be a security risk.
    */
    export type actions_can_approve_pull_request_reviews = boolean;
}
type IAutoViewTransformerInputType = Schema.actions_get_default_workflow_permissions;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Prepare icon and chip for default workflow permissions
  let permissionIcon: IAutoView.IAutoViewIconProps;
  let permissionChipColor: IAutoView.IAutoViewChipProps["color"];
  switch (input.default_workflow_permissions) {
    case "read":
      permissionIcon = {
        type: "Icon",
        id: "eye",              // visualize "read" as an eye icon
        color: "blue",
        size: 20,
      };
      permissionChipColor = "info";  // blue-ish chip
      break;
    case "write":
      permissionIcon = {
        type: "Icon",
        id: "pencil",          // visualize "write" as a pencil icon
        color: "green",
        size: 20,
      };
      permissionChipColor = "success"; // green chip
      break;
    default:
      // Fallback for unexpected cases
      permissionIcon = {
        type: "Icon",
        id: "question",
        color: "gray",
        size: 20,
      };
      permissionChipColor = "gray";
  }

  // Prepare icon and chip for the boolean "can approve pull request reviews"
  const approveIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: input.can_approve_pull_request_reviews ? "check" : "times",
    color: input.can_approve_pull_request_reviews ? "green" : "red",
    size: 20,
  };
  const approveChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.can_approve_pull_request_reviews ? "Enabled" : "Disabled",
    variant: "filled",
    color: input.can_approve_pull_request_reviews ? "success" : "error",
    size: "small",
  };

  // Compose a DataList with two items, each showing an icon + chip for clarity.
  // Use Markdown for bold labels to make it more visually engaging.
  return {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        // Bold label for clarity
        label: {
          type: "Markdown",
          content: "**Default workflow permissions**",
        },
        // Display icon and chip side by side
        value: [
          permissionIcon,
          {
            type: "Chip",
            label: input.default_workflow_permissions.charAt(0).toUpperCase()
              + input.default_workflow_permissions.slice(1),
            variant: "filled",
            color: permissionChipColor,
            size: "small",
          },
        ],
      },
      {
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: "**Can approve pull request reviews**",
        },
        value: [approveIcon, approveChip],
      },
    ],
  };
}
