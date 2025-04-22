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
  // Destructure input fields
  const {
    id,
    node_id,
    name,
    html_url,
    created_at,
    updated_at,
    protection_rules,
    deployment_branch_policy,
  } = input;

  // Format dates into a human‐friendly string in the user's locale
  const formattedCreated = new Date(created_at).toLocaleString();
  const formattedUpdated = new Date(updated_at).toLocaleString();

  // Determine branch policy label based on settings (null or object)
  const policy = deployment_branch_policy;
  let branchPolicyLabel: string;
  if (policy === null || policy === undefined) {
    branchPolicyLabel = "All Branches";
  } else if (policy.protected_branches) {
    branchPolicyLabel = "Protected Branches Only";
  } else {
    branchPolicyLabel = "Custom Branch Policies";
  }

  // Count of protection rules
  const rulesCount = Array.isArray(protection_rules) ? protection_rules.length : 0;

  // Compose a DataList of key environment details
  const detailsList: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // ID
      label: { type: "Text", content: "Environment ID" },
      value: { type: "Text", content: `${id}` },
    },
    {
      type: "DataListItem",
      // Node ID
      label: { type: "Text", content: "Node ID" },
      value: { type: "Text", content: node_id },
    },
    {
      type: "DataListItem",
      // Created at
      label: { type: "Text", content: "Created At" },
      value: { type: "Text", content: formattedCreated },
    },
    {
      type: "DataListItem",
      // Updated at
      label: { type: "Text", content: "Last Updated" },
      value: { type: "Text", content: formattedUpdated },
    },
    {
      type: "DataListItem",
      // Link to GitHub environment page
      label: { type: "Text", content: "View on GitHub" },
      value: {
        type: "Button",
        variant: "text",
        color: "primary",
        label: "Open",
        href: html_url,
        startElement: { type: "Icon", id: "link", color: "blue", size: 12 },
      },
    },
    {
      type: "DataListItem",
      // Branch policy
      label: { type: "Text", content: "Branch Policy" },
      value: {
        type: "Chip",
        label: branchPolicyLabel,
        color: "teal",
        variant: "outlined",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      // Protection rules count
      label: { type: "Text", content: "Protection Rules" },
      value: {
        type: "Badge",
        count: rulesCount,
        showZero: true,
        childrenProps: { type: "Icon", id: "shield-alt", color: "orange", size: 20 },
      },
    },
  ];

  // Build the vertical card to display all environment details
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Main title and icon
        title: name,
        description: `Node: ${node_id}`,
        startElement: { type: "Icon", id: "server", color: "blue", size: 32 },
      },
      {
        type: "CardContent",
        // Nesting a data list inside the card content
        childrenProps: {
          type: "DataList",
          childrenProps: detailsList,
        },
      },
    ],
  };
}
