import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Details of a deployment environment
     *
     * @title Environment
    */
    export type environment = {
        /**
         * The id of the environment.
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the environment.
        */
        name: string;
        url: string;
        html_url: string;
        /**
         * The time that the environment was created, in ISO 8601 format.
        */
        created_at: string;
        /**
         * The time that the environment was last updated, in ISO 8601 format.
        */
        updated_at: string;
        /**
         * Built-in deployment protection rules for the environment.
        */
        protection_rules?: ({
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
            wait_timer?: any;
        } | {
            id: number & tags.Type<"int32">;
            node_id: string;
            /**
             * Whether deployments to this environment can be approved by the user who created the deployment.
            */
            prevent_self_review?: boolean;
            type: string;
            /**
             * The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.
            */
            reviewers?: {
                type?: any;
                reviewer?: any | any;
            }[];
        } | {
            id: number & tags.Type<"int32">;
            node_id: string;
            type: string;
        })[];
        deployment_branch_policy?: Schema.deployment_branch_policy_settings;
    };
    export type wait_timer = any;
    export type deployment_reviewer_type = any;
    export type simple_user = any;
    export type team = any;
    /**
     * The type of deployment branch policy for this environment. To allow all branches to deploy, set to `null`.
    */
    export type deployment_branch_policy_settings = {
        /**
         * Whether only branches with branch protection rules can deploy to this environment. If `protected_branches` is `true`, `custom_branch_policies` must be `false`; if `protected_branches` is `false`, `custom_branch_policies` must be `true`.
        */
        protected_branches: boolean;
        /**
         * Whether only branches that match the specified name patterns can deploy to this environment.  If `custom_branch_policies` is `true`, `protected_branches` must be `false`; if `custom_branch_policies` is `false`, `protected_branches` must be `true`.
        */
        custom_branch_policies: boolean;
    } | null;
}
type IAutoViewTransformerInputType = Schema.environment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Utility to safely format ISO date strings
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  };

  // Build a list of key/value pairs for the environment metadata
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["ID"], variant: "subtitle2" }],
    value: [{ type: "Text", content: [String(input.id)], variant: "body2" }]
  });

  // Node ID
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Node ID"], variant: "subtitle2" }],
    value: [{ type: "Text", content: [input.node_id], variant: "body2" }]
  });

  // URLs (API & HTML) as Markdown links for clickability
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["API URL"], variant: "subtitle2" }],
    value: [{
      type: "Markdown",
      content: `[View API](${input.url})`
    }]
  });
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Web UI"], variant: "subtitle2" }],
    value: [{
      type: "Markdown",
      content: `[Open UI](${input.html_url})`
    }]
  });

  // Creation & Update timestamps
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Created At"], variant: "subtitle2" }],
    value: [{ type: "Text", content: [formatDate(input.created_at)], variant: "body2" }]
  });
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Updated At"], variant: "subtitle2" }],
    value: [{ type: "Text", content: [formatDate(input.updated_at)], variant: "body2" }]
  });

  // Protection rules count, visualized with a badge
  const rulesCount = input.protection_rules?.length ?? 0;
  dataListItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Protection Rules"], variant: "subtitle2" }],
    value: [{
      type: "Badge",
      count: rulesCount,
      maxCount: 99,
      showZero: rulesCount === 0,
      childrenProps: {
        type: "Icon",
        id: "shield",
        color: rulesCount > 0 ? "green" : "gray",
        size: 20
      }
    }]
  });

  // Branch policy chips: show enabled/disabled states
  const chips: IAutoView.IAutoViewChipProps[] = [];
  if (input.deployment_branch_policy) {
    const policy = input.deployment_branch_policy;
    chips.push({
      type: "Chip",
      label: `Protected Branches: ${policy.protected_branches ? "Yes" : "No"}`,
      color: policy.protected_branches ? "success" : "error",
      variant: "filled"
    });
    chips.push({
      type: "Chip",
      label: `Custom Policies: ${policy.custom_branch_policies ? "Yes" : "No"}`,
      color: policy.custom_branch_policies ? "success" : "error",
      variant: "filled"
    });
  } else {
    // null policy => all branches allowed
    chips.push({
      type: "Chip",
      label: "All Branches Allowed",
      color: "info",
      variant: "filled"
    });
  }

  // Assemble the final card with header, content list, and footer chips
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.name,
        description: `Environment Overview`,
        startElement: {
          type: "Icon",
          id: "cloud",
          color: "blue",
          size: 24
        }
      },
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems
        }
      },
      {
        type: "CardFooter",
        childrenProps: {
          type: "ChipGroup",
          childrenProps: chips,
          maxItems: chips.length
        }
      }
    ]
  };
}
