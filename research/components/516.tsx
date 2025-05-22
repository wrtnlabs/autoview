import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Response
     *
     * @title Rule Suite
    */
    export type rule_suite = {
        /**
         * The unique identifier of the rule insight.
        */
        id?: number & tags.Type<"int32">;
        /**
         * The number that identifies the user.
        */
        actor_id?: (number & tags.Type<"int32">) | null;
        /**
         * The handle for the GitHub user account.
        */
        actor_name?: string | null;
        /**
         * The first commit sha before the push evaluation.
        */
        before_sha?: string;
        /**
         * The last commit sha in the push evaluation.
        */
        after_sha?: string;
        /**
         * The ref name that the evaluation ran on.
        */
        ref?: string;
        /**
         * The ID of the repository associated with the rule evaluation.
        */
        repository_id?: number & tags.Type<"int32">;
        /**
         * The name of the repository without the `.git` extension.
        */
        repository_name?: string;
        pushed_at?: string & tags.Format<"date-time">;
        /**
         * The result of the rule evaluations for rules with the `active` enforcement status.
        */
        result?: "pass" | "fail" | "bypass";
        /**
         * The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`. Null if no rules with `evaluate` enforcement status were run.
        */
        evaluation_result?: "pass" | "fail" | "bypass" | null;
        /**
         * Details on the evaluated rules.
        */
        rule_evaluations?: {
            rule_source?: {
                /**
                 * The type of rule source.
                */
                type?: string;
                /**
                 * The ID of the rule source.
                */
                id?: (number & tags.Type<"int32">) | null;
                /**
                 * The name of the rule source.
                */
                name?: string | null;
            };
            /**
             * The enforcement level of this rule source.
            */
            enforcement?: "active" | "evaluate" | "deleted ruleset";
            /**
             * The result of the evaluation of the individual rule.
            */
            result?: "pass" | "fail";
            /**
             * The type of rule.
            */
            rule_type?: string;
            /**
             * The detailed failure message for the rule. Null if the rule passed.
            */
            details?: string | null;
        }[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.rule_suite;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const actor =
    value.actor_name ||
    (value.actor_id != null ? `#${value.actor_id}` : "Unknown user");
  const repo =
    value.repository_name ||
    (value.repository_id != null ? `#${value.repository_id}` : "Unknown repo");
  const refName = value.ref || "Unknown ref";
  const beforeSha = value.before_sha ? value.before_sha.slice(0, 7) : "—";
  const afterSha = value.after_sha ? value.after_sha.slice(0, 7) : "—";
  const pushedAt = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown date";
  const overallStatus = value.result || "unknown";
  const evalStatus = value.evaluation_result;

  // Badge color mapping
  const statusColors: Record<string, string> = {
    pass: "bg-green-100 text-green-800",
    fail: "bg-red-100 text-red-800",
    bypass: "bg-yellow-100 text-yellow-800",
    unknown: "bg-gray-100 text-gray-800",
  };
  const enforcementColors: Record<string, string> = {
    active: "bg-blue-100 text-blue-800",
    evaluate: "bg-purple-100 text-purple-800",
    "deleted ruleset": "bg-gray-100 text-gray-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const element = (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="text-lg font-semibold text-gray-900 truncate">{repo}</div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              statusColors[overallStatus]
            }`}
          >
            {overallStatus.toUpperCase()}
          </span>
          {evalStatus != null && evalStatus !== overallStatus && (
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                statusColors[evalStatus]
              }`}
            >
              EVAL: {evalStatus.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="space-y-1">
          <div>
            <span className="font-medium">Ref:</span> {refName}
          </div>
          <div>
            <span className="font-medium">Commits:</span> {beforeSha} → {afterSha}
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Pushed by:</span> {actor}
          </div>
          <div>
            <span className="font-medium">Pushed at:</span> {pushedAt}
          </div>
        </div>
      </div>

      {value.rule_evaluations?.length ? (
        <div>
          <div className="text-md font-medium text-gray-800 mb-2">
            Rule Evaluations
          </div>
          <ul className="divide-y divide-gray-200">
            {value.rule_evaluations.map((rule, idx) => {
              const src = rule.rule_source;
              const ruleName =
                src?.name || src?.type || rule.rule_type || "Unknown rule";
              const enforce = rule.enforcement || "active";
              const res = rule.result || "pass";
              return (
                <li
                  key={idx}
                  className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {ruleName}
                    </div>
                    {rule.details && (
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {rule.details}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        enforcementColors[enforce]
                      }`}
                    >
                      {enforce.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        statusColors[res]
                      }`}
                    >
                      {res.toUpperCase()}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );

  // 3. Return the React element.
  return element;
}
