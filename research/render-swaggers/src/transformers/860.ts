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



// Transforms a repository_ruleset into a visual representation using AutoView components.
function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Helper to create a simple text component
  const makeText = (
    content: string,
    variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: content,
    variant,
  });

  // Helper to choose a chip color based on enforcement level
  const enforcementColor = (): IAutoView.IAutoViewChipProps["color"] => {
    switch (input.enforcement) {
      case "active":
        return "success";
      case "evaluate":
        return "warning";
      case "disabled":
      default:
        return "error";
    }
  };

  // Build list of DataListItemProps
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Target of the ruleset
  if (input.target) {
    listItems.push({
      type: "DataListItem",
      label: makeText("Target", "subtitle2"),
      value: {
        type: "Chip",
        label: input.target,
        variant: "filled",
        color: "info",
      },
    });
  }

  // Source type (Repository, Organization, Enterprise)
  if (input.source_type) {
    listItems.push({
      type: "DataListItem",
      label: makeText("Source Type", "subtitle2"),
      value: {
        type: "Chip",
        label: input.source_type,
        variant: "outlined",
        color: "primary",
      },
    });
  }

  // Source name
  if (input.source) {
    listItems.push({
      type: "DataListItem",
      label: makeText("Source", "subtitle2"),
      value: makeText(input.source),
    });
  }

  // Enforcement level
  listItems.push({
    type: "DataListItem",
    label: makeText("Enforcement", "subtitle2"),
    value: {
      type: "Chip",
      label: input.enforcement,
      variant: "filled",
      color: enforcementColor(),
    },
  });

  // Bypass actors
  if (input.bypass_actors && input.bypass_actors.length > 0) {
    const actorChips: IAutoView.IAutoViewChipProps[] = input.bypass_actors.map(
      (actor) => ({
        type: "Chip",
        label: actor.actor_type + (actor.bypass_mode ? ` (${actor.bypass_mode})` : ""),
        variant: "outlined",
        color: "secondary",
      }),
    );
    listItems.push({
      type: "DataListItem",
      label: makeText("Bypass Actors", "subtitle2"),
      value: {
        type: "ChipGroup",
        childrenProps: actorChips,
      },
    });
  }

  // Current user bypass capability
  if (input.current_user_can_bypass) {
    listItems.push({
      type: "DataListItem",
      label: makeText("You Can Bypass", "subtitle2"),
      value: {
        type: "Chip",
        label: input.current_user_can_bypass,
        variant: "filled",
        color: "teal",
      },
    });
  }

  // Links (if HTML link provided)
  const htmlHref = input._links?.html?.href;
  if (htmlHref) {
    listItems.push({
      type: "DataListItem",
      label: makeText("View Online", "subtitle2"),
      value: {
        type: "Button",
        label: "Open Ruleset",
        href: htmlHref,
        variant: "outlined",
        size: "small",
        color: "primary",
      },
    });
  }

  // Creation and update timestamps
  if (input.created_at) {
    listItems.push({
      type: "DataListItem",
      label: makeText("Created At", "subtitle2"),
      value: makeText(new Date(input.created_at).toLocaleString()),
    });
  }
  if (input.updated_at) {
    listItems.push({
      type: "DataListItem",
      label: makeText("Updated At", "subtitle2"),
      value: makeText(new Date(input.updated_at).toLocaleString()),
    });
  }

  // Assemble the DataList component
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Card header with icon, title, and ID
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: {
      type: "Icon",
      id: "cog",
      size: 32,
      color: "blue",
    },
  };

  // Card content wraps the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: detailsList,
  };

  // Final vertical card assembly
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
