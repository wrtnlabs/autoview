import { tags } from "typia";
import React from "react";
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
  if (!value || value.length === 0) {
    return <div className="p-4 text-center text-gray-500">No rule suite data available.</div>;
  }
  const sorted = [...value].sort(
    (a, b) =>
      new Date(b.pushed_at ?? '').getTime() - new Date(a.pushed_at ?? '').getTime(),
  );
  const statusStyles: Record<'pass' | 'fail' | 'bypass', { label: string; style: string }> = {
    pass: { label: 'Passed', style: 'bg-green-100 text-green-800' },
    fail: { label: 'Failed', style: 'bg-red-100 text-red-800' },
    bypass: { label: 'Bypassed', style: 'bg-yellow-100 text-yellow-800' },
  };
  const formatDate = (dt?: string) =>
    dt
      ? new Date(dt).toLocaleString('default', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      : '—';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {sorted.map((item, index) => {
        const preSHA = item.before_sha?.slice(0, 7) ?? '—';
        const postSHA = item.after_sha?.slice(0, 7) ?? '—';
        const resultKey = item.result ?? 'bypass';
        const evalKey = item.evaluation_result ?? 'bypass';
        const result = statusStyles[resultKey];
        const evaluation = statusStyles[evalKey];

        return (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-900">
                {item.actor_name ?? 'Unknown'}
              </span>
              <span className="text-sm text-gray-500">{formatDate(item.pushed_at)}</span>
            </div>
            <div className="flex flex-wrap items-center text-sm text-gray-700 space-x-2 mb-2">
              <span className="font-medium">{item.repository_name ?? 'Repository'}</span>
              <span className="text-gray-400">·</span>
              <span>{item.ref ?? 'ref'}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              Commits: <span className="font-mono">{preSHA}</span> →{' '}
              <span className="font-mono">{postSHA}</span>
            </div>
            <div className="flex space-x-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${result.style}`}
              >
                {result.label}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${evaluation.style}`}
              >
                {evaluation.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
