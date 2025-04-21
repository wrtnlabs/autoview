import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type actions_organization_permissions = {
        enabled_repositories: Schema.enabled_repositories;
        /**
         * The API URL to use to get or set the selected repositories that are allowed to run GitHub Actions, when `enabled_repositories` is set to `selected`.
        */
        selected_repositories_url?: string;
        allowed_actions?: Schema.allowed_actions;
        selected_actions_url?: Schema.selected_actions_url;
    };
    /**
     * The policy that controls the repositories in the organization that are allowed to run GitHub Actions.
    */
    export type enabled_repositories = "all" | "none" | "selected";
    /**
     * The permissions policy that controls the actions and reusable workflows that are allowed to run.
    */
    export type allowed_actions = "all" | "local_only" | "selected";
    /**
     * The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`.
    */
    export type selected_actions_url = string;
}
type IAutoViewTransformerInputType = Schema.actions_organization_permissions;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map statuses to human-readable labels and colors
  const repoStatus = input.enabled_repositories;
  const actionStatus = input.allowed_actions ?? "all";

  const repoLabelMap: Record<Schema.enabled_repositories, string> = {
    all: "All Repositories",
    none: "No Repositories",
    selected: "Selected Repositories",
  };
  const actionLabelMap: Record<Schema.allowed_actions, string> = {
    all: "All Actions",
    local_only: "Local Actions Only",
    selected: "Selected Actions",
  };

  const repoChipColorMap: Record<Schema.enabled_repositories, IAutoView.IAutoViewChipProps["color"]> = {
    all: "green",
    none: "error",
    selected: "info",
  };
  const actionChipColorMap: Record<Schema.allowed_actions, IAutoView.IAutoViewChipProps["color"]> = {
    all: "green",
    local_only: "warning",
    selected: "info",
  };

  // Compose the repository status value: chip + optional manage button
  const repoValueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Chip",
      label: repoLabelMap[repoStatus],
      color: repoChipColorMap[repoStatus],
      variant: "filled",
      size: "small",
    },
  ];
  if (repoStatus === "selected" && input.selected_repositories_url) {
    repoValueComponents.push({
      type: "Button",
      label: "Manage Repositories",
      href: input.selected_repositories_url,
      variant: "outlined",
      size: "small",
      color: "primary",
    });
  }

  // Compose the actions status value: chip + optional manage button
  const actionValueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Chip",
      label: actionLabelMap[actionStatus],
      color: actionChipColorMap[actionStatus],
      variant: "filled",
      size: "small",
    },
  ];
  if (actionStatus === "selected" && input.selected_actions_url) {
    actionValueComponents.push({
      type: "Button",
      label: "Manage Actions",
      href: input.selected_actions_url,
      variant: "outlined",
      size: "small",
      color: "primary",
    });
  }

  // Build data list items for display
  const repoItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Allowed Repositories",
      variant: "subtitle2",
    },
    value: repoValueComponents.length === 1 ? repoValueComponents[0] : repoValueComponents,
  };

  const actionItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Allowed Actions",
      variant: "subtitle2",
    },
    value: actionValueComponents.length === 1 ? actionValueComponents[0] : actionValueComponents,
  };

  // Compose the full card view
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with icon for quick glancing
        type: "CardHeader",
        title: "GitHub Actions Permissions",
        description:
          "Configure which repositories and reusable workflows can run GitHub Actions in this organization.",
        startElement: {
          type: "Icon",
          id: "github",
          size: 32,
          color: "gray",
        },
      },
      {
        // Content: a structured list of settings
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: [repoItem, actionItem],
        },
      },
    ],
  };
}
