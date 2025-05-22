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
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
  const rulesCount = value.rules?.length ?? 0;
  const bypassActors = value.bypass_actors ?? [];
  const badgeClasses: Record<string, string> = {
    disabled: "bg-gray-200 text-gray-800",
    active: "bg-green-100 text-green-800",
    evaluate: "bg-yellow-100 text-yellow-800",
  };
  const enforcementBadge = badgeClasses[value.enforcement] || badgeClasses.disabled;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${enforcementBadge}`}>
          {value.enforcement.charAt(0).toUpperCase() + value.enforcement.slice(1)}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
        <div>
          <p className="font-medium text-gray-800">Source</p>
          <p className="truncate">{value.source}</p>
        </div>
        {value.source_type && (
          <div>
            <p className="font-medium text-gray-800">Source Type</p>
            <p>{value.source_type}</p>
          </div>
        )}
        {value.target && (
          <div>
            <p className="font-medium text-gray-800">Target</p>
            <p>{value.target}</p>
          </div>
        )}
        <div>
          <p className="font-medium text-gray-800">Rules</p>
          <p>{rulesCount}</p>
        </div>
      </div>
      {bypassActors.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-gray-800 text-sm mb-1">Bypass Actors ({bypassActors.length})</p>
          <div className="flex flex-wrap gap-2">
            {bypassActors.map((actor, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {actor.actor_type}
                {actor.bypass_mode ? <><span className="mx-1">·</span>{actor.bypass_mode}</> : null}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <time dateTime={value.created_at || undefined}>Created: {createdAt}</time>
        <time dateTime={value.updated_at || undefined}>Updated: {updatedAt}</time>
      </div>
    </div>
  );
}
