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
  const formattedCreated = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : 'N/A';
  const formattedUpdated = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : 'N/A';

  const rulesCount = Array.isArray(value.rules) ? value.rules.length : 0;

  const actors = Array.isArray(value.bypass_actors) ? value.bypass_actors : [];
  const actorLabels = actors.map((actor) => {
    const idLabel = actor.actor_id != null ? ` (${actor.actor_id})` : '';
    return `${actor.actor_type}${idLabel}`;
  });
  const bypassSummary =
    actorLabels.length > 3
      ? `${actorLabels.slice(0, 3).join(', ')} and ${actorLabels.length - 3} more`
      : actorLabels.join(', ');

  const enforcementLabel =
    value.enforcement.charAt(0).toUpperCase() + value.enforcement.slice(1);
  const enforcementClass = {
    active: 'bg-green-100 text-green-800',
    evaluate: 'bg-yellow-100 text-yellow-800',
    disabled: 'bg-gray-100 text-gray-800',
  }[value.enforcement] ?? 'bg-gray-100 text-gray-800';

  const displaySourceType = value.source_type ?? 'Repository';
  const displayTarget = value.target ? value.target.charAt(0).toUpperCase() + value.target.slice(1) : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-gray-800 max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span
          className={`ml-2 px-2 py-1 text-xs font-medium rounded ${enforcementClass}`}
        >
          {enforcementLabel}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-700">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <dt className="font-medium">Source</dt>
            <dd className="truncate">
              {displaySourceType}: {value.source}
            </dd>
          </div>
          {displayTarget && (
            <div>
              <dt className="font-medium">Target</dt>
              <dd className="truncate">{displayTarget}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium">Rules</dt>
            <dd>{rulesCount}</dd>
          </div>
          {actors.length > 0 && (
            <div className="col-span-full">
              <dt className="font-medium">Bypass Actors</dt>
              <dd className="truncate">{bypassSummary}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium">Created</dt>
            <dd>{formattedCreated}</dd>
          </div>
          <div>
            <dt className="font-medium">Updated</dt>
            <dd>{formattedUpdated}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
