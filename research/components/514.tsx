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
    ? new Date(value.created_at).toLocaleString()
    : "N/A";
  const updatedDate = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : "N/A";

  const sourceTypeLabel = value.source_type
    ? value.source_type.charAt(0).toUpperCase() + value.source_type.slice(1).toLowerCase()
    : "Unknown";
  const targetLabel = value.target
    ? value.target.charAt(0).toUpperCase() + value.target.slice(1)
    : "All";

  const enforcementLabel =
    value.enforcement.charAt(0).toUpperCase() + value.enforcement.slice(1);

  const rulesCount = Array.isArray(value.rules) ? value.rules.length : 0;

  const bypassActors = Array.isArray(value.bypass_actors)
    ? value.bypass_actors
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-4 space-y-4 text-gray-800">
      {/* Header: Name and optional link */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name || "Unnamed Ruleset"}
        </h2>
        {value._links?.html?.href && (
          <a
            href={value._links.html.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 ml-2"
            aria-label="View on GitHub"
          >
            {/* Simple external-link icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m2-2h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Core details grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium">Source:</span>{" "}
          <span className="truncate">{value.source}</span>{" "}
          <span className="italic text-gray-500">({sourceTypeLabel})</span>
        </div>
        <div>
          <span className="font-medium">Target:</span> {targetLabel}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="font-medium">Enforcement:</span>{" "}
          <span
            className={
              "px-2 py-0.5 rounded-full text-xs " +
              (value.enforcement === "disabled"
                ? "bg-red-100 text-red-800"
                : value.enforcement === "active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800")
            }
          >
            {enforcementLabel}
          </span>
        </div>
        <div>
          <span className="font-medium">Rules:</span> {rulesCount}
        </div>
      </div>

      {/* Bypass actors */}
      {bypassActors.length > 0 && (
        <div>
          <span className="font-medium text-sm">
            Bypass Actors ({bypassActors.length}):
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {bypassActors.map((actor, idx) => {
              const mode =
                actor.bypass_mode === "always"
                  ? "Always"
                  : actor.bypass_mode === "pull_request"
                  ? "Pull Request"
                  : "";
              return (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs"
                  title={mode ? `Mode: ${mode}` : undefined}
                >
                  {actor.actor_type}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Created: {createdDate}</span>
        <span>Updated: {updatedDate}</span>
      </div>
    </div>
  );
}
