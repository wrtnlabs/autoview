import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
  const data = value;
  const totalCount = data.length;
  const passCount = data.filter(item => item.result === 'pass').length;
  const failCount = data.filter(item => item.result === 'fail').length;
  const bypassCount = data.filter(item => item.result === 'bypass').length;

  const formatDate = (dt?: string): string =>
    dt ? new Date(dt).toLocaleString() : '—';

  const summaryCards = [
    {
      label: 'Total Events',
      count: totalCount,
      icon: (
        <LucideReact.List
          size={20}
          className="text-gray-500"
          aria-label="Total Events"
        />
      ),
    },
    {
      label: 'Passed',
      count: passCount,
      icon: (
        <LucideReact.CheckCircle
          size={20}
          className="text-green-500"
          aria-label="Passed"
        />
      ),
    },
    {
      label: 'Failed',
      count: failCount,
      icon: (
        <LucideReact.XCircle
          size={20}
          className="text-red-500"
          aria-label="Failed"
        />
      ),
    },
    {
      label: 'Bypassed',
      count: bypassCount,
      icon: (
        <LucideReact.SkipForward
          size={20}
          className="text-yellow-500"
          aria-label="Bypassed"
        />
      ),
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap gap-4 mb-6">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg"
          >
            {card.icon}
            <span className="text-sm font-medium text-gray-700">
              {card.label}: {card.count}
            </span>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actor
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Repository
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ref
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pushed At
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eval Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <LucideReact.User
                      size={16}
                      className="text-gray-500"
                      aria-label="Actor"
                    />
                    <span>{item.actor_name ?? '—'}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <LucideReact.GitBranch
                      size={16}
                      className="text-gray-500"
                      aria-label="Repository"
                    />
                    <span>{item.repository_name ?? '—'}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 truncate max-w-xs">
                  {item.ref ?? '—'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar
                      size={16}
                      className="text-gray-500"
                      aria-label="Pushed At"
                    />
                    <span>{formatDate(item.pushed_at)}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm">
                  {item.result === 'pass' && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Pass"
                    />
                  )}
                  {item.result === 'fail' && (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500"
                      aria-label="Fail"
                    />
                  )}
                  {item.result === 'bypass' && (
                    <LucideReact.SkipForward
                      size={16}
                      className="text-yellow-500"
                      aria-label="Bypass"
                    />
                  )}
                  {!item.result && <span className="text-gray-400">—</span>}
                </td>
                <td className="px-4 py-2 text-sm">
                  {item.evaluation_result === 'pass' && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Eval Pass"
                    />
                  )}
                  {item.evaluation_result === 'fail' && (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500"
                      aria-label="Eval Fail"
                    />
                  )}
                  {item.evaluation_result === 'bypass' && (
                    <LucideReact.SkipForward
                      size={16}
                      className="text-yellow-500"
                      aria-label="Eval Bypass"
                    />
                  )}
                  {!item.evaluation_result && (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
