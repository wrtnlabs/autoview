import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Response
   *
   * @title Rule Suites
   */
  export type rule_suites = {
    /**
     * The unique identifier of the rule insight.
     */
    id?: number & tags.Type<"int32">;
    /**
     * The number that identifies the user.
     */
    actor_id?: number & tags.Type<"int32">;
    /**
     * The handle for the GitHub user account.
     */
    actor_name?: string;
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
     * The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`.
     */
    evaluation_result?: "pass" | "fail" | "bypass";
  }[];
}
export type AutoViewInput = AutoViewInputSubTypes.rule_suites;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value;
  const total = items.length;

  // Count by result
  const resultCounts = items.reduce(
    (acc, cur) => {
      const res = cur.result ?? "bypass";
      acc[res] = (acc[res] || 0) + 1;
      return acc;
    },
    { pass: 0, fail: 0, bypass: 0 } as Record<
      "pass" | "fail" | "bypass",
      number
    >,
  );

  // Date formatter
  const formatDate = (d?: string) => {
    if (!d) return "—";
    const dt = new Date(d);
    return dt.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Icon & color mapping for statuses
  const statusMap = {
    pass: {
      icon: <LucideReact.CheckCircle size={12} className="text-green-600" />,
      label: "Pass",
      bg: "bg-green-100 text-green-800",
    },
    fail: {
      icon: <LucideReact.XCircle size={12} className="text-red-600" />,
      label: "Fail",
      bg: "bg-red-100 text-red-800",
    },
    bypass: {
      icon: <LucideReact.MinusCircle size={12} className="text-gray-600" />,
      label: "Bypass",
      bg: "bg-gray-100 text-gray-800",
    },
  } as const;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (total === 0) {
    return (
      <div className="flex flex-col items-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">
          No rule suite evaluations available
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Rule Suite Evaluations ({total})
        </h2>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {(["pass", "fail", "bypass"] as const).map((key) =>
            resultCounts[key] > 0 ? (
              <span
                key={key}
                className={`flex items-center text-xs font-medium px-2 py-0.5 rounded ${statusMap[key].bg}`}
              >
                {statusMap[key].icon}
                <span className="ml-1">{resultCounts[key]}</span>
              </span>
            ) : null,
          )}
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-gray-200">
        {items.map((item, idx) => (
          <li
            key={item.id ?? idx}
            className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-gray-700 text-sm space-x-1">
                <LucideReact.User size={16} className="text-gray-500" />
                <span>{item.actor_name || "Unknown actor"}</span>
                <span className="text-gray-400">•</span>
                <LucideReact.GitBranch size={16} className="text-gray-500" />
                <span>{item.repository_name || "Repository"}</span>
                {item.ref && (
                  <>
                    <span className="text-gray-400">@</span>
                    <LucideReact.Hash size={16} className="text-gray-500" />
                    <span className="truncate max-w-xs">{item.ref}</span>
                  </>
                )}
              </div>
              <div className="flex items-center text-gray-500 text-xs space-x-1">
                <LucideReact.Calendar size={14} />
                <span>{formatDate(item.pushed_at)}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              {/* Result */}
              {item.result && (
                <span
                  className={`flex items-center text-xs font-medium px-2 py-0.5 rounded ${statusMap[item.result].bg}`}
                >
                  {statusMap[item.result].icon}
                  <span className="ml-1">{statusMap[item.result].label}</span>
                </span>
              )}
              {/* Evaluation */}
              {item.evaluation_result && (
                <span
                  className={`flex items-center text-xs font-medium px-2 py-0.5 rounded ${statusMap[item.evaluation_result].bg}`}
                >
                  {statusMap[item.evaluation_result].icon}
                  <span className="ml-1">
                    {statusMap[item.evaluation_result].label}
                  </span>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
