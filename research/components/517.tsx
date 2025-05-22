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
export type AutoViewInput = AutoViewInputSubTypes.repository_ruleset;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";
  const updatedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const rulesCount = value.rules?.length ?? 0;
  const bypassActors = value.bypass_actors ?? [];
  const bypassCount = bypassActors.length;

  const enforcementLabels: Record<
    AutoViewInputSubTypes.repository_rule_enforcement,
    string
  > = {
    active: "Active",
    evaluate: "Evaluate",
    disabled: "Disabled",
  };
  const enforcementStyles: Record<
    AutoViewInputSubTypes.repository_rule_enforcement,
    string
  > = {
    active: "bg-green-100 text-green-800",
    evaluate: "bg-yellow-100 text-yellow-800",
    disabled: "bg-gray-100 text-gray-800",
  };

  const targetLabel = value.target
    ? value.target.charAt(0).toUpperCase() + value.target.slice(1)
    : "Repository";

  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500">ID #{value.id}</p>
        </div>
        <span
          className={`ml-3 px-2 py-0.5 text-xs font-medium rounded ${enforcementStyles[value.enforcement]}`}
        >
          {enforcementLabels[value.enforcement]}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
          Target: {targetLabel}
        </span>
        {value.source_type && (
          <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
            Source Type: {value.source_type}
          </span>
        )}
        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded">
          Source: {value.source}
        </span>
        {value.current_user_can_bypass && (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
            You Can Bypass:{" "}
            {value.current_user_can_bypass === "always"
              ? "Always"
              : value.current_user_can_bypass === "pull_requests_only"
              ? "PR Only"
              : "Never"}
          </span>
        )}
      </div>

      {/* Summary list */}
      <ul className="text-sm text-gray-700 space-y-2 mb-4">
        <li>
          <span className="font-medium">Rules:</span> {rulesCount}
        </li>
        <li>
          <span className="font-medium">Bypass Actors:</span> {bypassCount}
        </li>
        {bypassCount > 0 && (
          <li>
            <div className="flex flex-wrap gap-1">
              {bypassActors.map((actor, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded"
                >
                  {actor.actor_type}
                  {actor.bypass_mode ? ` (${actor.bypass_mode})` : ""}
                  {actor.actor_id != null ? ` #${actor.actor_id}` : ""}
                </span>
              ))}
            </div>
          </li>
        )}
        <li>
          <span className="font-medium">Created:</span> {createdDate}
        </li>
        <li>
          <span className="font-medium">Updated:</span> {updatedDate}
        </li>
      </ul>
    </div>
  );
}
