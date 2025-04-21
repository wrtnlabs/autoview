import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposEnvironments {
        export type GetResponse = {
            /**
             * The number of environments in this repository
            */
            total_count?: number & tags.Type<"int32">;
            environments?: Schema.environment[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiReposEnvironments.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Prepare DataListItem for each environment
    const items: IAutoView.IAutoViewDataListItemProps[] = (input.environments ?? []).map(env => {
        // Format ISO dates into human‐readable strings
        const created = new Date(env.created_at).toLocaleString();
        const updated = new Date(env.updated_at).toLocaleString();
        const protectionCount = env.protection_rules?.length ?? 0;
        // Describe branch policy or default text
        const branchPolicy = env.deployment_branch_policy
            ? `Protected branches: ${env.deployment_branch_policy.protected_branches}\nCustom policies: ${env.deployment_branch_policy.custom_branch_policies}`
            : "All branches allowed";

        // Compose a markdown block with environment details
        const detailsMarkdown = [
            `- **ID**: ${env.id}`,
            `- **Created**: ${created}`,
            `- **Updated**: ${updated}`,
            `- **Protection rules**: ${protectionCount}`,
            `- **Branch policy**: ${branchPolicy}`,
            `- [Open in browser](${env.html_url})`
        ].join("\n");

        return {
            type: "DataListItem",
            // Show environment name as the label
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: env.name
                }
            ],
            // Show detailed info as markdown, plus a button as fallback on small screens
            value: [
                {
                    type: "Markdown",
                    content: detailsMarkdown
                },
                {
                    type: "Button",
                    variant: "text",
                    size: "small",
                    href: env.html_url,
                    startElement: { type: "Icon", id: "external-link-alt", size: 16 },
                    label: "Open"
                }
            ]
        };
    });

    // Wrap all items in a DataList
    const list: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    // Render everything in a card with a header summarizing the total
    const total = input.total_count ?? items.length;
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Environments",
                description: `Total: ${total}`,
                startElement: {
                    type: "Icon",
                    id: "cubes",
                    size: 24,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: list
            }
        ]
    };
}
