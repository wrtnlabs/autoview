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
  const actor =
    value.actor_name ?? (value.actor_id != null ? `User #${value.actor_id}` : 'Unknown actor');
  const repository =
    value.repository_name ??
    (value.repository_id != null ? `Repo #${value.repository_id}` : 'Unknown repo');
  const refName = value.ref ?? 'N/A';
  const pushedAt = value.pushed_at
    ? new Date(value.pushed_at).toLocaleString()
    : 'Unknown date';
  const beforeSha = value.before_sha ? value.before_sha.slice(0, 7) : '';
  const afterSha = value.after_sha ? value.after_sha.slice(0, 7) : '';
  const mainStatus = value.result ?? 'unknown';

  // Icon helper for statuses
  const getStatusIcon = (status: string, size = 16): JSX.Element => {
    switch (status) {
      case 'pass':
        return <LucideReact.CheckCircle size={size} className="text-green-500" />;
      case 'fail':
        return <LucideReact.AlertTriangle size={size} className="text-red-500" />;
      case 'bypass':
        return <LucideReact.MinusCircle size={size} className="text-amber-500" />;
      default:
        return <LucideReact.Info size={size} className="text-gray-400" />;
    }
  };

  // Badge helper for enforcement levels
  const getEnforcementBadge = (enf: string): JSX.Element => {
    const common = 'px-2 py-0.5 text-xs font-medium rounded-full capitalize';
    switch (enf) {
      case 'active':
        return <span className={common + ' bg-green-100 text-green-800'}>active</span>;
      case 'evaluate':
        return <span className={common + ' bg-amber-100 text-amber-800'}>evaluate</span>;
      case 'deleted ruleset':
        return <span className={common + ' bg-red-100 text-red-800'}>deleted ruleset</span>;
      default:
        return <span className={common + ' bg-gray-100 text-gray-800'}>{enf}</span>;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Rule Suite Result</h2>
        <div className="flex items-center">
          {getStatusIcon(mainStatus)}
          <span className="ml-2 capitalize text-gray-700">{mainStatus}</span>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} className="text-gray-500" />
          <span>{actor}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Folder size={16} className="text-gray-500" />
          <span>{repository}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <span>{refName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitPullRequest size={16} className="text-gray-500" />
          <span>
            {beforeSha} → {afterSha}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>{pushedAt}</span>
        </div>
      </div>

      {/* Evaluation Result */}
      {value.evaluation_result != null && (
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Evaluation:</span>
          {getStatusIcon(value.evaluation_result)}
          <span className="capitalize text-gray-700">{value.evaluation_result}</span>
        </div>
      )}

      {/* Rule Evaluations List */}
      {value.rule_evaluations && value.rule_evaluations.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-md font-medium text-gray-800">Rule Evaluations</h3>
          <ul className="divide-y divide-gray-200 border border-gray-100 rounded-md overflow-hidden">
            {value.rule_evaluations.map((evalItem, idx) => {
              const name =
                evalItem.rule_source?.name ??
                evalItem.rule_type ??
                'Unnamed rule';
              const status = evalItem.result ?? 'unknown';
              const enforcement = evalItem.enforcement ?? 'unknown';
              return (
                <li
                  key={idx}
                  className="flex flex-col p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="font-semibold text-gray-800 truncate">
                        {name}
                      </span>
                    </div>
                    {getEnforcementBadge(enforcement)}
                  </div>
                  {status === 'fail' && evalItem.details && (
                    <p className="mt-1 text-sm text-red-600 line-clamp-2">
                      {evalItem.details}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
