import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnerGroups {
        export type GetResponse = {
            total_count: number;
            runner_groups: Schema.runner_groups_org[];
        };
    }
    export type runner_groups_org = {
        id: number;
        name: string;
        visibility: string;
        "default": boolean;
        /**
         * Link to the selected repositories resource for this runner group. Not present unless visibility was set to `selected`
        */
        selected_repositories_url?: string;
        runners_url: string;
        hosted_runners_url?: string;
        /**
         * The identifier of a hosted compute network configuration.
        */
        network_configuration_id?: string;
        inherited: boolean;
        inherited_allows_public_repositories?: boolean;
        allows_public_repositories: boolean;
        /**
         * If `true`, the `restricted_to_workflows` and `selected_workflows` fields cannot be modified.
        */
        workflow_restrictions_read_only?: boolean;
        /**
         * If `true`, the runner group will be restricted to running only the workflows specified in the `selected_workflows` array.
        */
        restricted_to_workflows?: boolean;
        /**
         * List of workflows the runner group should be allowed to run. This setting will be ignored unless `restricted_to_workflows` is set to `true`.
        */
        selected_workflows?: string[];
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnerGroups.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle the empty case gracefully
  if (!input.runner_groups || input.runner_groups.length === 0) {
    return {
      type: "Markdown",
      // Use a heading to call out that no data is available
      content: "## No runner groups found\n\nIt looks like there are no runner groups configured for this organization."
    };
  }

  // Helper to map visibility string to a chip color
  const visibilityColor = (visibility: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (visibility.toLowerCase()) {
      case "selected":
        return "warning";
      case "all":
      case "public":
        return "success";
      case "private":
      default:
        return "gray";
    }
  };

  // Transform each runner group into a ListItemProps
  const items: IAutoView.IAutoViewListItemProps[] = input.runner_groups.map((group) => {
    const chips: IAutoView.IAutoViewChipProps[] = [];

    // Visibility chip
    chips.push({
      type: "Chip",
      label: group.visibility.charAt(0).toUpperCase() + group.visibility.slice(1),
      color: visibilityColor(group.visibility),
      variant: "filled",
      size: "small"
    });

    // Public repositories allowed?
    chips.push({
      type: "Chip",
      label: group.allows_public_repositories ? "Public repos" : "Private repos",
      color: group.allows_public_repositories ? "success" : "error",
      variant: "outlined",
      size: "small"
    });

    // Inherited?
    if (group.inherited) {
      chips.push({
        type: "Chip",
        label: "Inherited",
        color: "info",
        variant: "outlined",
        size: "small"
      });
    }

    // Default runner group?
    if (group.default) {
      chips.push({
        type: "Chip",
        label: "Default",
        color: "secondary",
        variant: "filled",
        size: "small"
      });
    }

    // Workflow restrictions
    if (group.restricted_to_workflows) {
      const count = Array.isArray(group.selected_workflows)
        ? group.selected_workflows.length
        : 0;
      chips.push({
        type: "Chip",
        label: `Workflows: ${count}`,
        color: "primary",
        variant: "outlined",
        size: "small"
      });
    }

    return {
      type: "ListItem",
      // Main title is the group name
      title: group.name,
      // Show the numeric ID as secondary info
      description: `ID: ${group.id}`,
      // If this is the default group, show a star icon at start
      startElement: group.default
        ? {
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 20
          }
        : undefined,
      // Display the chips as endElements for quick status glance
      endElement: chips
    };
  });

  // Wrap the items in a List for a responsive, mobile-friendly layout
  return {
    type: "List",
    childrenProps: items
  };
}
