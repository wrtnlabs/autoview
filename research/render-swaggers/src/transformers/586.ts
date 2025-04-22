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



// Transforms GitHub Actions default workflow permissions data into a visual component structure.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare a list of data items to display each field in a label/value format.
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Default workflow permissions (read/write) displayed as a colored chip.
  const permLabel: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: "Default Workflow Permissions",
    variant: "body1",
    color: "primary",
  };
  const permChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    // Uppercase for better visual emphasis
    label: input.default_workflow_permissions.toUpperCase(),
    variant: "filled",
    size: "small",
    // Read -> info (blue), Write -> error (red)
    color: input.default_workflow_permissions === "write" ? "error" : "info",
  };
  items.push({
    type: "DataListItem",
    label: [permLabel],
    value: permChip,
  });

  // 2. Whether pull request reviews can be approved: boolean displayed as an icon.
  const approveLabel: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: "Can Approve PR Reviews",
    variant: "body1",
    color: "primary",
  };
  const approveIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    // 'check' for true, 'times' for false
    id: input.can_approve_pull_request_reviews ? "check" : "times",
    size: 20,
    // Green for allowed, gray for disallowed
    color: input.can_approve_pull_request_reviews ? "green" : "gray",
  };
  items.push({
    type: "DataListItem",
    label: [approveLabel],
    value: approveIcon,
  });

  // Wrap all items in a DataList for responsive display.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
