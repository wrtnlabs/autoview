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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data derivations
  const {
    name,
    source,
    source_type,
    target,
    enforcement,
    bypass_actors,
    current_user_can_bypass,
    created_at,
    updated_at,
  } = value;

  const formattedDate = (d?: string) =>
    d
      ? new Date(d).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const formattedCreated = formattedDate(created_at);
  const formattedUpdated = formattedDate(updated_at);

  const enforcementLabel =
    enforcement.charAt(0).toUpperCase() + enforcement.slice(1);
  const enforcementColor =
    enforcement === "active"
      ? "bg-green-100 text-green-800"
      : enforcement === "evaluate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";

  const targetLabel = target
    ? target.charAt(0).toUpperCase() + target.slice(1)
    : null;

  const sourceTypeLabel = source_type ?? null;

  const userBypassMap: Record<string, string> = {
    always: "Always",
    pull_requests_only: "Pull requests only",
    never: "Never",
  };
  const userCanBypassLabel = current_user_can_bypass
    ? userBypassMap[current_user_can_bypass]
    : null;

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-xl font-semibold truncate">{name}</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {sourceTypeLabel && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {sourceTypeLabel}
          </span>
        )}
        {targetLabel && (
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
            {targetLabel}
          </span>
        )}
        <span
          className={`px-2 py-1 ${enforcementColor} text-xs font-medium rounded`}
        >
          {enforcementLabel}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Source:</span> {source}
      </p>

      {userCanBypassLabel && (
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-medium">Your bypass:</span> {userCanBypassLabel}
        </p>
      )}

      {bypass_actors && bypass_actors.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">
            Bypass Actors ({bypass_actors.length}):
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            {bypass_actors.map((actor, idx) => {
              const actorType = actor.actor_type;
              const modeLabel = actor.bypass_mode
                ? actor.bypass_mode === "always"
                  ? "Always"
                  : "Pull request"
                : "";
              return (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded"
                >
                  {actorType}
                  {modeLabel ? ` (${modeLabel})` : ""}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 border-t pt-2 text-xs text-gray-500 space-y-1">
        <div>
          <span className="font-medium">Created:</span> {formattedCreated}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {formattedUpdated}
        </div>
      </div>
    </div>
  );
}
