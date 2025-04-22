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
  // Destructure to access the rule and its app details
  const { id, node_id, enabled, app } = input;

  // Choose an icon to represent enabled/disabled state
  const statusIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: enabled ? "check-circle" : "times-circle", // FontAwesome icon names
    color: enabled ? "green" : "gray",
    size: 20,
  };

  // Header of the card: shows rule id and status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Rule #${id}`,
    description: enabled ? "Enabled" : "Disabled",
    startElement: statusIcon,
  };

  // Build a data list of key values for details
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "secondary",
        content: "Rule Node ID",
      },
      value: {
        type: "Text",
        variant: "body1",
        content: node_id,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "secondary",
        content: "App Slug",
      },
      value: {
        type: "Text",
        variant: "body1",
        content: app.slug,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "secondary",
        content: "App Node ID",
      },
      value: {
        type: "Text",
        variant: "body1",
        content: app.node_id,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "secondary",
        content: "App Integration URL",
      },
      value: {
        type: "Text",
        variant: "body1",
        // show URL as clickable markdown link for better UX on mobile
        content: `[Open](${app.integration_url})`,
      },
    },
  ];

  // Wrap the list items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Card content: contains the data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Footer with a button to open the app integration link
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        variant: "outlined",
        color: "primary",
        size: "medium",
        label: "View App Details",
        href: app.integration_url,
        startElement: {
          type: "Icon",
          id: "external-link-alt",
          size: 16,
          color: "blue",
        },
      },
    ],
  };

  // Compose a vertical card to display the complete rule information
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
