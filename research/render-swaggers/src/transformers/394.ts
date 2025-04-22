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
  // Helper to map visibility to icon and color
  const getVisibilityIcon = (): IAutoView.IAutoViewIconProps => {
    let iconId: string;
    let color: IAutoView.IAutoViewIconProps["color"];
    switch (input.visibility) {
      case "public":
        iconId = "globe";
        color = "blue";
        break;
      case "private":
        iconId = "lock";
        color = "gray";
        break;
      case "selected":
        iconId = "list";
        color = "violet";
        break;
      default:
        iconId = "info-circle";
        color = "cyan";
    }
    return {
      type: "Icon",
      id: iconId,
      color,
      size: 20,
    };
  };

  // Helper to render a boolean as a colored chip
  const boolChip = (value: boolean, labelTrue = "Yes", labelFalse = "No"): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label: value ? labelTrue : labelFalse,
    color: value ? "success" : "error",
    variant: "filled",
    size: "small",
  });

  // Build a list of DataListItemProps for the main properties
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Numeric ID
  dataItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Group ID", variant: "subtitle2" }],
    value: { type: "Text", content: input.id.toString(), variant: "body1" },
  });

  // Visibility
  dataItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Visibility", variant: "subtitle2" }],
    value: boolChip(input.visibility !== "private", input.visibility, input.visibility),
  });

  // Default runner group?
  dataItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Default", variant: "subtitle2" }],
    value: boolChip(input["default"]),
  });

  // Inherited
  dataItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Inherited", variant: "subtitle2" }],
    value: boolChip(input.inherited),
  });

  // Allows public repositories
  dataItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Allows Public Repos", variant: "subtitle2" }],
    value: boolChip(input.allows_public_repositories),
  });

  // Workflow restrictions read-only (if provided)
  if (typeof input.workflow_restrictions_read_only === "boolean") {
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Workflow Restrictions Read‑Only", variant: "subtitle2" }],
      value: boolChip(input.workflow_restrictions_read_only),
    });
  }

  // Restricted to workflows?
  if (typeof input.restricted_to_workflows === "boolean") {
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Restricted To Workflows", variant: "subtitle2" }],
      value: boolChip(input.restricted_to_workflows),
    });
  }

  // Selected workflows list (if any)
  if (Array.isArray(input.selected_workflows) && input.selected_workflows.length > 0) {
    // Create a ChipGroup of workflows
    const workflowChips: IAutoView.IAutoViewChipProps[] = input.selected_workflows.map((wf) => ({
      type: "Chip",
      label: wf,
      color: "info",
      variant: "outlined",
      size: "small",
    }));
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Selected Workflows", variant: "subtitle2" }],
      value: {
        type: "ChipGroup",
        childrenProps: workflowChips,
        maxItems: 5,
      },
    });
  }

  // Optional URLs and IDs
  if (input.network_configuration_id) {
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Network Config ID", variant: "subtitle2" }],
      value: { type: "Text", content: input.network_configuration_id, variant: "body2" },
    });
  }
  if (input.hosted_runners_url) {
    dataItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Hosted Runners URL", variant: "subtitle2" }],
      value: { type: "Text", content: input.hosted_runners_url, variant: "body2" },
    });
  }

  // Assemble the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Footer buttons for navigation
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [
    {
      type: "Button",
      label: "View Runners",
      href: input.runners_url,
      variant: "outlined",
      startElement: { type: "Icon", id: "server", size: 16, color: "cyan" },
    },
  ];
  if (input.selected_repositories_url) {
    footerButtons.push({
      type: "Button",
      label: "View Selected Repos",
      href: input.selected_repositories_url,
      variant: "outlined",
      startElement: { type: "Icon", id: "book-open", size: 16, color: "blue" },
    });
  }

  // Compose the card layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.name,
        description: `ID #${input.id}`,
        startElement: getVisibilityIcon(),
      },
      {
        type: "CardContent",
        childrenProps: [dataList], // wrap DataList in array
      },
      {
        type: "CardFooter",
        childrenProps: footerButtons,
      },
    ],
  };

  return card;
}
