import * as LucideReact from "lucide-react";
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
  const pushedDate = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";
  const beforeSha = value.before_sha?.slice(0, 7) || "";
  const afterSha = value.after_sha?.slice(0, 7) || "";
  const resultIcon = {
    pass: <LucideReact.CheckCircle className="text-green-500" size={16} />,
    fail: <LucideReact.XCircle className="text-red-500" size={16} />,
    bypass: <LucideReact.MinusCircle className="text-gray-500" size={16} />,
  }[value.result ?? "pass"];
  const evalIcon =
    value.evaluation_result != null
      ? {
          pass: (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ),
          fail: <LucideReact.XCircle className="text-red-500" size={16} />,
          bypass: (
            <LucideReact.MinusCircle className="text-gray-500" size={16} />
          ),
        }[value.evaluation_result]
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Primary identifiers */}
      <div className="flex flex-wrap gap-4">
        {value.actor_name && (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.User size={16} />
            <span className="font-medium">{value.actor_name}</span>
          </div>
        )}
        {value.repository_name && (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.Archive size={16} />
            <span className="font-medium">{value.repository_name}</span>
          </div>
        )}
        {value.ref && (
          <div className="flex items-center gap-1 text-gray-700">
            <LucideReact.GitBranch size={16} />
            <span className="font-medium">{value.ref}</span>
          </div>
        )}
      </div>

      {/* Commit range and timestamp */}
      <div className="flex flex-wrap gap-4 text-gray-600">
        {(beforeSha || afterSha) && (
          <div className="flex items-center gap-1">
            <LucideReact.Hash size={16} />
            <span className="font-mono">
              {beforeSha} → {afterSha}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>{pushedDate}</span>
        </div>
      </div>

      {/* Overall result */}
      <div className="flex items-center gap-2 flex-wrap">
        {resultIcon}
        <span className="font-medium capitalize">{value.result ?? "pass"}</span>
        {value.evaluation_result != null && (
          <>
            <span className="mx-2 text-gray-300">|</span>
            {evalIcon}
            <span className="font-medium capitalize">
              {value.evaluation_result}
            </span>
          </>
        )}
      </div>

      {/* Detailed rule evaluations */}
      {value.rule_evaluations && value.rule_evaluations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Rule Evaluations
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {value.rule_evaluations.map((ev, idx) => {
              const evIcon =
                ev.result === "pass" ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                );
              let badgeColor = "bg-gray-100 text-gray-800";
              if (ev.enforcement === "active")
                badgeColor = "bg-blue-100 text-blue-800";
              else if (ev.enforcement === "evaluate")
                badgeColor = "bg-amber-100 text-amber-800";

              return (
                <div
                  key={idx}
                  className="p-2 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-xs rounded ${badgeColor}`}
                      >
                        {ev.enforcement}
                      </span>
                      <span className="font-medium">
                        {ev.rule_type ||
                          ev.rule_source?.name ||
                          ev.rule_source?.type}
                      </span>
                      {ev.rule_source?.name && (
                        <span className="text-xs text-gray-500">
                          {ev.rule_source.name}
                        </span>
                      )}
                    </div>
                    {ev.details && ev.result === "fail" && (
                      <p className="text-sm text-red-600 line-clamp-2">
                        {ev.details}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0">{evIcon}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
