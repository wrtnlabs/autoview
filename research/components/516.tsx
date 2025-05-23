import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Response
     *
     * @title Rule Suite
    */
    export interface rule_suite {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.rule_suite;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const repoName = value.repository_name ?? "Unknown Repository";
  const branch = value.ref ? ` @ ${value.ref}` : "";
  const actor =
    value.actor_name ??
    (value.actor_id != null ? `User #${value.actor_id}` : "Unknown Actor");
  const pushedAt = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Unknown Date";

  const totalRules = value.rule_evaluations?.length ?? 0;
  const passedRules =
    value.rule_evaluations?.filter((r) => r.result === "pass").length ?? 0;
  const failedRules =
    value.rule_evaluations?.filter((r) => r.result === "fail").length ?? 0;

  const getStatusIcon = (
    status?: "pass" | "fail" | "bypass" | null
  ): JSX.Element => {
    switch (status) {
      case "pass":
        return <LucideReact.CheckCircle className="text-green-500" size={20} />;
      case "fail":
        return <LucideReact.XCircle className="text-red-500" size={20} />;
      case "bypass":
        return <LucideReact.AlertTriangle className="text-amber-500" size={20} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={20} />;
    }
  };

  const capitalize = (s?: string | null): string =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Repository & Result */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.GitBranch className="text-gray-500" size={16} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {repoName}
            <span className="font-normal">{branch}</span>
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {getStatusIcon(value.result)}
          <span
            className={
              "text-sm font-medium " +
              (value.result === "pass"
                ? "text-green-600"
                : value.result === "fail"
                ? "text-red-600"
                : "text-amber-600")
            }
          >
            {capitalize(value.result)}
          </span>
        </div>
      </div>

      {/* Subheader: Actor & Date */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <LucideReact.User size={16} />
          <span className="truncate">{actor}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <LucideReact.Calendar size={16} />
          <span>{pushedAt}</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Optional Evaluation Result */}
      {value.evaluation_result != null && (
        <div className="flex items-center gap-2 mb-3">
          {getStatusIcon(value.evaluation_result)}
          <span className="text-sm font-medium text-gray-700">
            Evaluation: {capitalize(value.evaluation_result)}
          </span>
        </div>
      )}

      {/* Rule Summary */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <LucideReact.ListOrdered size={16} className="text-gray-500" />
          <span>Total: {totalRules}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-green-700">
          <LucideReact.CheckCircle size={16} className="text-green-500" />
          <span>Pass: {passedRules}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-red-700">
          <LucideReact.XCircle size={16} className="text-red-500" />
          <span>Fail: {failedRules}</span>
        </div>
      </div>
    </div>
  );
}
