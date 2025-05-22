import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const actorName = value.actor_name ?? "Unknown actor";
  const repoName = value.repository_name ?? "Repository";
  const branch = value.ref ?? "unknown";
  const beforeSha = value.before_sha ? value.before_sha.slice(0, 7) : "—";
  const afterSha = value.after_sha ? value.after_sha.slice(0, 7) : "—";
  const pushedAt = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString()
    : "Unknown date";
  const overallResult = value.result;
  const evaluationResult = value.evaluation_result;
  const rules = Array.isArray(value.rule_evaluations)
    ? value.rule_evaluations
    : [];

  // Helper to render result icons
  function ResultIcon(props: { result?: string; className?: string }) {
    const { result, className = "" } = props;
    switch (result) {
      case "pass":
        return (
          <LucideReact.CheckCircle
            className={`text-green-500 ${className}`}
            size={16}
          />
        );
      case "fail":
        return (
          <LucideReact.XCircle
            className={`text-red-500 ${className}`}
            size={16}
          />
        );
      case "bypass":
        return (
          <LucideReact.SkipForward
            className={`text-amber-500 ${className}`}
            size={16}
          />
        );
      default:
        return null;
    }
  }

  // Helper to capitalize words
  const capitalize = (s: string | undefined) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: repository, branch, actor, date */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <LucideReact.Code size={20} className="text-gray-600" />
          <span className="text-lg font-semibold text-gray-800">
            {repoName}
          </span>
          <span className="text-sm text-gray-500 truncate">{branch}</span>
        </div>
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center space-x-1">
            <LucideReact.User size={16} />
            <span>{actorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Calendar size={16} />
            <span>{pushedAt}</span>
          </div>
        </div>
      </div>

      {/* Summary of results */}
      <div className="flex flex-wrap items-center space-x-6">
        <div className="flex items-center space-x-2">
          <ResultIcon result={overallResult} />
          <span className="text-sm font-medium text-gray-700">
            {overallResult ? capitalize(overallResult) : "Unknown"}
          </span>
        </div>
        {evaluationResult != null && (
          <div className="flex items-center space-x-2">
            <ResultIcon result={evaluationResult} />
            <span className="text-sm font-medium text-gray-700">
              Eval: {capitalize(evaluationResult)}
            </span>
          </div>
        )}
        <div className="ml-auto text-sm text-gray-500">
          <code className="bg-gray-100 px-2 py-0.5 rounded">
            {beforeSha} → {afterSha}
          </code>
        </div>
      </div>

      {/* Detailed rule evaluations */}
      {rules.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {rules.map((rule, idx) => {
            const src = rule.rule_source;
            const srcName = src?.name || src?.type || "Unknown source";
            const enforcement = rule.enforcement || "unknown";
            const ruleType = rule.rule_type;
            const details = rule.details;
            return (
              <li key={idx} className="py-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {srcName}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          enforcement === "active"
                            ? "bg-green-100 text-green-800"
                            : enforcement === "evaluate"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {capitalize(enforcement)}
                      </span>
                      {ruleType && (
                        <span className="text-xs text-gray-500">
                          ({ruleType})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ResultIcon result={rule.result} />
                    <span className="text-sm font-medium text-gray-700">
                      {rule.result ? capitalize(rule.result) : "Unknown"}
                    </span>
                  </div>
                </div>
                {details && (
                  <p className="mt-2 text-sm text-red-600 line-clamp-2">
                    {details}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center text-gray-400 space-x-2">
          <LucideReact.AlertCircle size={20} />
          <span className="text-sm">No rule evaluations available.</span>
        </div>
      )}
    </div>
  );
}
