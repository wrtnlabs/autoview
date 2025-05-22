import LucideReact from "lucide-react";
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
  const totalSuites = value.length;

  const resultCounts = { pass: 0, fail: 0, bypass: 0 } as Record<
    "pass" | "fail" | "bypass",
    number
  >;
  const evalCounts = { pass: 0, fail: 0, bypass: 0 } as Record<
    "pass" | "fail" | "bypass",
    number
  >;

  value.forEach((suite) => {
    if (suite.result) resultCounts[suite.result]++;
    if (suite.evaluation_result) evalCounts[suite.evaluation_result]++;
  });

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const renderStatus = (
    status?: "pass" | "fail" | "bypass",
    prefix: string = "",
  ) => {
    if (!status) return null;
    let Icon: JSX.Element;
    let label: string;
    switch (status) {
      case "pass":
        Icon = <LucideReact.CheckCircle size={16} className="text-green-500" />;
        label = "Pass";
        break;
      case "fail":
        Icon = <LucideReact.XCircle size={16} className="text-red-500" />;
        label = "Fail";
        break;
      case "bypass":
        Icon = (
          <LucideReact.AlertTriangle size={16} className="text-amber-500" />
        );
        label = "Bypass";
        break;
    }
    return (
      <div className="flex items-center gap-1 text-sm">
        {prefix && <span className="text-gray-600">{prefix}:</span>}
        {Icon}
        <span className="font-medium">{label}</span>
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-semibold text-gray-800">
          Rule Suites ({totalSuites})
        </div>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span>Pass {resultCounts.pass}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.XCircle size={16} className="text-red-500" />
            <span>Fail {resultCounts.fail}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.AlertTriangle size={16} className="text-amber-500" />
            <span>Bypass {resultCounts.bypass}</span>
          </div>
        </div>
      </div>

      {/* Detail List */}
      <ul className="space-y-4">
        {value.map((suite, idx) => {
          const actor = suite.actor_name || "Unknown";
          const repo = suite.repository_name || "Repository";
          const branch = suite.ref || "";
          const beforeShort = suite.before_sha?.slice(0, 7) || "--";
          const afterShort = suite.after_sha?.slice(0, 7) || "--";
          const dateDisplay = formatDate(suite.pushed_at);

          return (
            <li
              key={idx}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="flex items-center gap-2 truncate">
                  <LucideReact.GitBranch size={20} className="text-gray-600" />
                  <span className="font-semibold text-gray-800 truncate">
                    {repo}
                  </span>
                  {branch && (
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded truncate">
                      {branch}
                    </span>
                  )}
                </div>
                {dateDisplay && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2 sm:mt-0">
                    <LucideReact.Calendar size={16} />
                    <span>{dateDisplay}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div className="flex items-center gap-1 text-sm">
                  <LucideReact.User size={16} className="text-gray-600" />
                  <span>{actor}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <LucideReact.GitCommit size={16} className="text-gray-600" />
                  <span>
                    {beforeShort} → {afterShort}
                  </span>
                </div>
                <div>{renderStatus(suite.result, "Result")}</div>
                <div>{renderStatus(suite.evaluation_result, "Eval")}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
