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
  const formatDate = (iso?: string): string =>
    iso
      ? new Date(iso).toLocaleDateString("default", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No repository rulesets available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((rs) => {
        // Derive badge color based on enforcement
        const enforcementColor =
          rs.enforcement === "active"
            ? "green"
            : rs.enforcement === "evaluate"
            ? "yellow"
            : "gray";
        // Count bypass actors
        const bypassCount = Array.isArray(rs.bypass_actors)
          ? rs.bypass_actors.length
          : 0;

        return (
          <div
            key={rs.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:justify-between"
          >
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {rs.name}
                <span className="ml-2 text-sm text-gray-500">#{rs.id}</span>
              </h2>
              <p className="mt-1 text-sm text-gray-600 truncate">
                {rs.source_type
                  ? `${rs.source_type}: ${rs.source}`
                  : rs.source}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {rs.target && (
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {rs.target}
                  </span>
                )}
                <span
                  className={`text-xs font-medium bg-${enforcementColor}-100 text-${enforcementColor}-800 px-2 py-1 rounded`}
                >
                  {rs.enforcement.charAt(0).toUpperCase() +
                    rs.enforcement.slice(1)}
                </span>
                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Bypass: {bypassCount}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Created: {formatDate(rs.created_at)} • Updated:{" "}
                {formatDate(rs.updated_at)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
