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
  // Build the header: show the ruleset name, its source, and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.source_type
      ? `${input.source_type} · ${input.source}`
      : input.source,
    // A gear icon to represent settings/rules
    startElement: {
      type: "Icon",
      id: "cogs",
      color: "blue",
      size: 24,
    },
  };

  // Helper to build a DataListItem (label–value pair)
  const makeListItem = (
    labelText: string,
    valueText: string
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: [
      {
        type: "Text",
        content: labelText,
        variant: "body2",
        color: "gray",
      },
    ],
    value: [
      {
        type: "Text",
        content: valueText,
        variant: "body1",
        color: "primary",
      },
    ],
  });

  // Gather core fields into a DataList
  const items: IAutoView.IAutoViewDataListItemProps[] = [
    makeListItem("ID", String(input.id)),
    makeListItem("Target", input.target ?? "—"),
    makeListItem("Enforcement", input.enforcement),
  ];

  // Optional fields
  if (input.current_user_can_bypass !== undefined) {
    items.push(
      makeListItem(
        "Your Bypass Permission",
        input.current_user_can_bypass
      )
    );
  }
  if (Array.isArray(input.rules)) {
    items.push(
      makeListItem("Rules", String(input.rules.length))
    );
  }
  if (input.conditions !== undefined) {
    // conditions might be any type; just indicate presence
    const condLabel =
      input.conditions === null ? "No conditions" : "Has conditions";
    items.push(makeListItem("Conditions", condLabel));
  }

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // wrap DataList in an array to satisfy childrenProps[]
    childrenProps: [dataList],
  };

  // Build chips for bypass actors if any
  let footerChildren:
    | IAutoView.IAutoViewChipGroupProps
    | IAutoView.IAutoViewMarkdownProps;

  if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
    const chips: IAutoView.IAutoViewChipProps[] = input.bypass_actors.map(
      (actor) => ({
        type: "Chip",
        label: actor.actor_type + (actor.actor_id ? ` (${actor.actor_id})` : ""),
        size: "small",
        // color actors by mode if available
        color:
          actor.bypass_mode === "always"
            ? "green"
            : actor.bypass_mode === "pull_request"
            ? "blue"
            : "gray",
        variant: "outlined",
      })
    );
    footerChildren = {
      type: "ChipGroup",
      childrenProps: chips,
      // show up to 5 chips, rest collapse into "+n"
      maxItems: 5,
    };
  } else {
    // no bypass actors: display a friendly markdown notice
    footerChildren = {
      type: "Markdown",
      content: "_No bypass actors defined._",
    };
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Assemble final VerticalCard
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
