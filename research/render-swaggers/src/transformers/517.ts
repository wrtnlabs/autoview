import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A set of rules to apply when specified conditions are met.
     *
     * @title Repository ruleset
    */
    export type repository_ruleset = {
        /**
         * The ID of the ruleset
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the ruleset
        */
        name: string;
        /**
         * The target of the ruleset
        */
        target?: "branch" | "tag" | "push" | "repository";
        /**
         * The type of the source of the ruleset
        */
        source_type?: "Repository" | "Organization" | "Enterprise";
        /**
         * The name of the source
        */
        source: string;
        enforcement: Schema.repository_rule_enforcement;
        /**
         * The actors that can bypass the rules in this ruleset
        */
        bypass_actors?: Schema.repository_ruleset_bypass_actor[];
        /**
         * The bypass type of the user making the API request for this ruleset. This field is only returned when
         * querying the repository-level endpoint.
        */
        current_user_can_bypass?: "always" | "pull_requests_only" | "never";
        node_id?: string;
        _links?: {
            self?: {
                /**
                 * The URL of the ruleset
                */
                href?: string;
            };
            html?: {
                /**
                 * The html URL of the ruleset
                */
                href?: string;
            } | null;
        };
        conditions?: any | any | null;
        rules?: Schema.repository_rule[];
        created_at?: string & tags.Format<"date-time">;
        updated_at?: string & tags.Format<"date-time">;
    };
    /**
     * The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).
    */
    export type repository_rule_enforcement = "disabled" | "active" | "evaluate";
    /**
     * An actor that can bypass rules in a ruleset
     *
     * @title Repository Ruleset Bypass Actor
    */
    export type repository_ruleset_bypass_actor = {
        /**
         * The ID of the actor that can bypass a ruleset. If `actor_type` is `OrganizationAdmin`, this should be `1`. If `actor_type` is `DeployKey`, this should be null. `OrganizationAdmin` is not applicable for personal repositories.
        */
        actor_id?: (number & tags.Type<"int32">) | null;
        /**
         * The type of actor that can bypass a ruleset.
        */
        actor_type: "Integration" | "OrganizationAdmin" | "RepositoryRole" | "Team" | "DeployKey";
        /**
         * When the specified actor can bypass the ruleset. `pull_request` means that an actor can only bypass rules on pull requests. `pull_request` is not applicable for the `DeployKey` actor type. Also, `pull_request` is only applicable to branch rulesets.
        */
        bypass_mode?: "always" | "pull_request";
    };
    export type repository_ruleset_conditions = any;
    export type org_ruleset_conditions = any;
    /**
     * A repository rule.
     *
     * @title Repository Rule
    */
    export type repository_rule = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
    export type repository_rule_creation = any;
    export type repository_rule_update = any;
    export type repository_rule_deletion = any;
    export type repository_rule_required_linear_history = any;
    export type repository_rule_merge_queue = any;
    export type repository_rule_required_deployments = any;
    export type repository_rule_required_signatures = any;
    export type repository_rule_pull_request = any;
    export type repository_rule_required_status_checks = any;
    export type repository_rule_non_fast_forward = any;
    export type repository_rule_commit_message_pattern = any;
    export type repository_rule_commit_author_email_pattern = any;
    export type repository_rule_committer_email_pattern = any;
    export type repository_rule_branch_name_pattern = any;
    export type repository_rule_tag_name_pattern = any;
    export type repository_rule_file_path_restriction = any;
    export type repository_rule_max_file_path_length = any;
    export type repository_rule_file_extension_restriction = any;
    export type repository_rule_max_file_size = any;
    export type repository_rule_workflows = any;
    export type repository_rule_code_scanning = any;
}
type IAutoViewTransformerInputType = Schema.repository_ruleset;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to create a DataListItem with a label and a value component
    function makeDataListItem(
        labelText: string,
        valueComp: IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps {
        return {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: labelText },
            value: valueComp,
        };
    }

    // Build list of key/value pairs
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Target
    if (input.target) {
        listItems.push(
            makeDataListItem(
                "Target",
                { type: "Chip", label: input.target, variant: "outlined" }
            )
        );
    }

    // Source Type
    if (input.source_type) {
        listItems.push(
            makeDataListItem(
                "Source Type",
                { type: "Chip", label: input.source_type, variant: "outlined" }
            )
        );
    }

    // Source
    listItems.push(
        makeDataListItem(
            "Source",
            { type: "Text", variant: "body2", content: input.source }
        )
    );

    // Enforcement
    listItems.push(
        makeDataListItem(
            "Enforcement",
            { type: "Chip", label: input.enforcement, variant: "filled" }
        )
    );

    // Number of rules
    const rulesCount = Array.isArray(input.rules) ? input.rules.length : 0;
    listItems.push(
        makeDataListItem(
            "Rules",
            {
                type: "Chip",
                label: `${rulesCount}`,
                variant: "outlined",
            }
        )
    );

    // Number of bypass actors
    const bypassCount = Array.isArray(input.bypass_actors)
        ? input.bypass_actors.length
        : 0;
    listItems.push(
        makeDataListItem(
            "Bypass Actors",
            {
                type: "Chip",
                label: `${bypassCount}`,
                variant: "outlined",
            }
        )
    );

    // Current user bypass capability
    if (input.current_user_can_bypass) {
        listItems.push(
            makeDataListItem(
                "Your Bypass",
                {
                    type: "Text",
                    variant: "body2",
                    content: input.current_user_can_bypass,
                }
            )
        );
    }

    // Creation and update timestamps
    if (input.created_at) {
        listItems.push(
            makeDataListItem(
                "Created",
                {
                    type: "Text",
                    variant: "body2",
                    content: new Date(input.created_at).toLocaleString(),
                }
            )
        );
    }
    if (input.updated_at) {
        listItems.push(
            makeDataListItem(
                "Updated",
                {
                    type: "Text",
                    variant: "body2",
                    content: new Date(input.updated_at).toLocaleString(),
                }
            )
        );
    }

    // Build DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Build CardHeader: show name (title) and ID (description), add a chip for enforcement
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        // show enforcement as a visual chip
        startElement: { type: "Chip", label: input.enforcement, variant: "filled" },
    };

    // Build CardContent: the data list
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Optionally build CardFooter with link buttons if links exist
    const footerButtons: IAutoView.IAutoViewButtonProps[] = [];
    if (input._links?.html?.href) {
        footerButtons.push({
            type: "Button",
            variant: "text",
            size: "small",
            label: "View HTML",
            endElement: { type: "Icon", id: "external-link", size: 16 },
            href: input._links.html.href,
        });
    }
    if (input._links?.self?.href) {
        footerButtons.push({
            type: "Button",
            variant: "text",
            size: "small",
            label: "View API",
            endElement: { type: "Icon", id: "external-link-alt", size: 16 },
            href: input._links.self.href,
        });
    }
    const cardFooter: IAutoView.IAutoViewCardFooterProps | undefined =
        footerButtons.length > 0
            ? {
                  type: "CardFooter",
                  // Buttons in footer as a horizontal button group
                  childrenProps: footerButtons,
              }
            : undefined;

    // Assemble a vertical card
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            cardHeader,
            cardContent,
            // only include footer if links are present
            ...(cardFooter ? [cardFooter] : []),
        ],
    };

    return verticalCard;
}
