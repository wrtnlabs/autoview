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
type IAutoViewTransformerInputType = Schema.repository_ruleset[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no rulesets, display a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No repository rulesets found."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Helper to map enforcement to a chip color
  const enforcementToColor = (enf: string | undefined): IAutoView.IAutoViewChipProps["color"] => {
    switch (enf) {
      case "active":
        return "success";
      case "evaluate":
        return "warning";
      case "disabled":
      default:
        return "gray";
    }
  };

  // Build a ListItem for each repository_ruleset
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((rs) => {
    const rulesCount = Array.isArray(rs.rules) ? rs.rules.length : 0;
    const bypassCount = Array.isArray(rs.bypass_actors) ? rs.bypass_actors.length : 0;

    // Format the updated date for display; fall back gracefully if missing
    const updatedLabel = rs.updated_at
      ? `Updated: ${new Date(rs.updated_at).toLocaleDateString()}`
      : "";

    // Compose an endElement array: a Chip for enforcement + a Badge for rule count
    const endElements: (IAutoView.IAutoViewChipProps | IAutoView.IAutoViewBadgeProps)[] = [];

    // Chip showing enforcement level
    endElements.push({
      type: "Chip",
      label: rs.enforcement ?? "unknown",
      color: enforcementToColor(rs.enforcement),
      size: "small",
      variant: "filled"
    });

    // Badge showing number of rules
    endElements.push({
      type: "Badge",
      count: rulesCount,
      maxCount: 999,
      showZero: true,
      color: "primary",
      childrenProps: {
        type: "Icon",
        id: "gavel", // FontAwesome icon for rules
        size: 16,
        color: "blue"
      }
    });

    return {
      type: "ListItem",
      title: rs.name,
      description: [
        // Concatenate metadata into description
        `Target: ${rs.target ?? "N/A"}`,
        `Source: ${rs.source}`,
        `Bypass Actors: ${bypassCount}`,
        updatedLabel
      ]
        .filter((s) => s.length > 0)
        .join(" • "),
      // A settings icon to the left
      startElement: {
        type: "Icon",
        id: "cogs",
        size: 24,
        color: "teal"
      },
      // Enforcement chip + rule-count badge to the right
      endElement: endElements,
      // Optionally link to the ruleset's HTML if available
      href: rs._links?.html?.href
    };
  });

  // Return a responsive List component containing all rulesets
  return {
    type: "List",
    childrenProps: listItems
  } as IAutoView.IAutoViewListProps;
}
