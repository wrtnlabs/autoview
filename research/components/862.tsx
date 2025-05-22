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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const actorName = value.actor_name ?? `User #${value.actor_id ?? 'N/A'}`;
  const pushedAt = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString()
    : 'Unknown date';
  const refName = value.ref ?? '';
  const repoName = value.repository_name ?? `Repo #${value.repository_id ?? ''}`;
  const beforeSha = value.before_sha ? value.before_sha.slice(0, 7) : '';
  const afterSha = value.after_sha ? value.after_sha.slice(0, 7) : '';
  const overallResult = value.result ?? 'N/A';
  const evalResult = value.evaluation_result;
  const ruleEvals = value.rule_evaluations ?? [];

  const statusStyles: Record<string, string> = {
    pass: 'bg-green-100 text-green-800',
    fail: 'bg-red-100 text-red-800',
    bypass: 'bg-yellow-100 text-yellow-800',
  };

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const formatEnforcement = (enf?: string) =>
    enf
      ? enf
          .split(' ')
          .map((word) => capitalize(word))
          .join(' ')
      : '';

  // 2. JSX visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {repoName} @ {refName}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {actorName} pushed at {pushedAt}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Commits: {beforeSha} → {afterSha}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              statusStyles[overallResult] ?? 'bg-gray-100 text-gray-800'
            }`}
          >
            {overallResult.toUpperCase()}
          </span>
          {evalResult != null && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                statusStyles[evalResult] ?? 'bg-gray-100 text-gray-800'
              }`}
            >
              {evalResult.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {ruleEvals.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-800 mb-3">
            Rule Evaluations
          </h3>
          <div className="space-y-4">
            {ruleEvals.map((rule, idx) => {
              const sourceName =
                rule.rule_source?.name ??
                rule.rule_source?.type ??
                'Unnamed Source';
              const enforcement = formatEnforcement(rule.enforcement);
              const ruleType = rule.rule_type ?? '';
              const ruleRes = rule.result ?? '';
              const details = rule.details;

              return (
                <div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {sourceName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {[ruleType, enforcement].filter(Boolean).join(' • ')}
                      </p>
                    </div>
                    <span
                      className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${
                        statusStyles[ruleRes] ?? 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ruleRes.toUpperCase()}
                    </span>
                  </div>
                  {details && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {details}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
