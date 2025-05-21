import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
        enforcement: AutoViewInputSubTypes.repository_rule_enforcement;
        /**
         * The actors that can bypass the rules in this ruleset
        */
        bypass_actors?: AutoViewInputSubTypes.repository_ruleset_bypass_actor[];
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
        rules?: AutoViewInputSubTypes.repository_rule[];
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
export type AutoViewInput = AutoViewInputSubTypes.repository_ruleset[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      + ' '
      + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  const enforcementBadgeClasses = (level: AutoViewInputSubTypes.repository_rule_enforcement): string => {
    switch (level) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'evaluate':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((rs) => {
        const bypassCount = rs.bypass_actors?.length ?? 0;
        const bypassList = rs.bypass_actors?.map((a) => a.actor_type).join(', ');
        const rulesCount = rs.rules?.length ?? 0;

        return (
          <div key={rs.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{rs.name}</h2>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${enforcementBadgeClasses(
                  rs.enforcement,
                )}`}
              >
                {rs.enforcement.charAt(0).toUpperCase() + rs.enforcement.slice(1)}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap text-sm text-gray-600 space-x-2">
              {rs.target && (
                <span className="px-2 py-0.5 border border-gray-200 rounded capitalize">
                  {rs.target}
                </span>
              )}
              <span className="px-2 py-0.5 border border-gray-200 rounded">
                {rs.source_type ?? 'Repository'}: {rs.source}
              </span>
              <span className="px-2 py-0.5 border border-gray-200 rounded">Rules: {rulesCount}</span>
              <span className="px-2 py-0.5 border border-gray-200 rounded">
                Bypass: {bypassCount}
              </span>
              {rs.current_user_can_bypass && (
                <span className="px-2 py-0.5 border border-gray-200 rounded">
                  You can bypass: {rs.current_user_can_bypass.replace('_', ' ')}
                </span>
              )}
            </div>

            <div className="mt-3 text-xs text-gray-500 space-x-4">
              <span>Created: {formatDate(rs.created_at)}</span>
              <span>Updated: {formatDate(rs.updated_at)}</span>
            </div>

            {bypassCount > 0 && (
              <div className="mt-2 text-sm text-gray-700">
                <strong>Bypass Actors:</strong> {bypassList}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
