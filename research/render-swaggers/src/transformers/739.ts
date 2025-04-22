import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Deployment protection rule
     *
     * @title Deployment protection rule
    */
    export type deployment_protection_rule = {
        /**
         * The unique identifier for the deployment protection rule.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node ID for the deployment protection rule.
        */
        node_id: string;
        /**
         * Whether the deployment protection rule is enabled for the environment.
        */
        enabled: boolean;
        app: Schema.custom_deployment_rule_app;
    };
    /**
     * A GitHub App that is providing a custom deployment protection rule.
     *
     * @title Custom deployment protection rule app
    */
    export type custom_deployment_rule_app = {
        /**
         * The unique identifier of the deployment protection rule integration.
        */
        id: number & tags.Type<"int32">;
        /**
         * The slugified name of the deployment protection rule integration.
        */
        slug: string;
        /**
         * The URL for the endpoint to get details about the app.
        */
        integration_url: string;
        /**
         * The node ID for the deployment protection rule integration.
        */
        node_id: string;
    };
}
type IAutoViewTransformerInputType = Schema.deployment_protection_rule;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine a color indicator based on whether the rule is enabled
  const statusColor = input.enabled ? "green" : "red";

  // Header: show the app slug with a shield icon and a status chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.app.slug,
    description: `Rule #${input.id}`,
    // Use a shield icon to represent security, colored by status
    startElement: {
      type: "Icon",
      id: "shield-alt",      // FontAwesome icon name
      color: statusColor,
      size: 24,
    },
    // Show a small chip indicating enabled/disabled status
    endElement: {
      type: "Chip",
      label: input.enabled ? "Enabled" : "Disabled",
      variant: "filled",
      color: statusColor,
      size: "small",
    },
  };

  // Build a data list of the key/value pairs
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Label component
      label: {
        type: "Text",
        content: "Rule ID",
        variant: "body2",
      },
      // Value component
      value: {
        type: "Text",
        content: `${input.id}`,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Enabled",
        variant: "body2",
      },
      // Mirror the chip used in the header for consistency
      value: {
        type: "Chip",
        label: input.enabled ? "Yes" : "No",
        variant: "filled",
        color: statusColor,
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "App ID",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: `${input.app.id}`,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "App Node ID",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: input.app.node_id,
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Integration URL",
        variant: "body2",
      },
      // Use markdown to render a clickable link
      value: {
        type: "Markdown",
        content: `[Open Integration](${input.app.integration_url})`,
      },
    },
  ];

  // Wrap the list items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Content: place the DataList inside the card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Assemble the vertical card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
