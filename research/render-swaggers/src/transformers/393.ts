import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.runner_groups_org;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map visibility to a friendly chip color
  const visibilityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    public: "green",
    private: "red",
    selected: "orange",
  };
  const visibilityColor = visibilityColorMap[input.visibility] ?? "blue";

  // Build a markdown representation of the key URLs and IDs
  const detailsLines: string[] = [];
  detailsLines.push(`- **Runners URL:** [Link](${input.runners_url})`);
  if (input.selected_repositories_url) {
    detailsLines.push(`- **Selected Repos URL:** [Link](${input.selected_repositories_url})`);
  }
  if (input.hosted_runners_url) {
    detailsLines.push(`- **Hosted Runners URL:** [Link](${input.hosted_runners_url})`);
  }
  if (input.network_configuration_id) {
    detailsLines.push(`- **Network Config ID:** ${input.network_configuration_id}`);
  }
  if (input.workflow_restrictions_read_only) {
    detailsLines.push(`- **Workflow Restrictions Read-Only**`);
  }
  if (input.restricted_to_workflows) {
    const list = input.selected_workflows?.join(", ") ?? "Yes";
    detailsLines.push(`- **Restricted to Workflows:** ${list}`);
  }

  return {
    // Use a vertical card to group header, content, and footer
    type: "VerticalCard",
    childrenProps: [
      {
        // Header: group name, ID, default icon, and visibility chip
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
          type: "Icon",
          // Highlight default groups with a star, others with user icon
          id: input.default ? "star" : "users",
          color: input.default ? "yellow" : "blue",
          size: 24,
        },
        endElement: {
          type: "Chip",
          label: input.visibility,
          color: visibilityColor,
          variant: "filled",
          size: "small",
        },
      },
      {
        // Content: key details rendered as markdown for readability
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: detailsLines.join("\n"),
        },
      },
      {
        // Footer: boolean flags as a chip group for quick status overview
        type: "CardFooter",
        childrenProps: {
          type: "ChipGroup",
          childrenProps: [
            {
              type: "Chip",
              label: "Inherited",
              color: input.inherited ? "teal" : "gray",
              variant: "filled",
              size: "small",
            },
            {
              type: "Chip",
              label: "Public Repos",
              color: input.allows_public_repositories ? "success" : "error",
              variant: "filled",
              size: "small",
            },
            {
              type: "Chip",
              label: input.restricted_to_workflows ? "Workflow Restricted" : "No Workflow Restriction",
              color: input.restricted_to_workflows ? "warning" : "gray",
              variant: "filled",
              size: "small",
            },
          ],
        },
      },
    ],
  };
}
