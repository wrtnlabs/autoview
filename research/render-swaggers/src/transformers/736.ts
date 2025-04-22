import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposEnvironmentsDeploymentProtectionRules {
        export type GetResponse = {
            /**
             * The number of enabled custom deployment protection rules for this environment
            */
            total_count?: number & tags.Type<"int32">;
            custom_deployment_protection_rules?: Schema.deployment_protection_rule[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiReposEnvironmentsDeploymentProtectionRules.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Construct a card header showing an icon, title, and total rule count
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Deployment Protection Rules",
    description: `${input.total_count ?? 0} rule${input.total_count === 1 ? "" : "s"}`,
    startElement: {
      type: "Icon",
      id: "shield-alt",
      color: "blue",
      size: 20,
    },
  };

  // Map each deployment protection rule into a DataListItem
  const rules = input.custom_deployment_protection_rules ?? [];
  let contentChild: IAutoView.IAutoViewPresentationComponentProps;

  if (rules.length > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = rules.map((rule) => {
      // A status chip indicating enabled / disabled
      const statusChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: rule.enabled ? "Enabled" : "Disabled",
        color: rule.enabled ? "success" : "error",
        variant: "filled",
        size: "small",
      };

      // A button linking to the App's integration URL
      const viewButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "View App",
        variant: "outlined",
        size: "small",
        href: rule.app.integration_url,
      };

      // The slug of the GitHub App as text
      const slugText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: rule.app.slug,
        variant: "body1",
      };

      return {
        type: "DataListItem",
        label: slugText,
        // Show both status and action button in the value slot
        value: [statusChip, viewButton],
      };
    });

    contentChild = {
      type: "DataList",
      childrenProps: items,
    };
  } else {
    // Graceful fallback when there are no rules
    contentChild = {
      type: "Text",
      content: "No custom deployment protection rules found.",
      variant: "body1",
    };
  }

  // Wrap the list or fallback text in card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChild,
  };

  // Assemble the vertical card layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
