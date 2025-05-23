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
  const totalSuites = value.length;

  const resultCounts = value.reduce(
    (acc, suite) => {
      const key = suite.result ?? 'bypass';
      if (key === 'pass') acc.pass += 1;
      else if (key === 'fail') acc.fail += 1;
      else acc.bypass += 1;
      return acc;
    },
    { pass: 0, fail: 0, bypass: 0 }
  );

  const evaluationCounts = value.reduce(
    (acc, suite) => {
      const key = suite.evaluation_result ?? 'bypass';
      if (key === 'pass') acc.pass += 1;
      else if (key === 'fail') acc.fail += 1;
      else acc.bypass += 1;
      return acc;
    },
    { pass: 0, fail: 0, bypass: 0 }
  );

  function formatDate(dateString?: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getStatusIcon(
    status?: 'pass' | 'fail' | 'bypass',
    label?: string
  ): JSX.Element {
    switch (status) {
      case 'pass':
        return (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label={label ?? 'Pass'}
          />
        );
      case 'fail':
        return (
          <LucideReact.XCircle
            size={16}
            className="text-red-500"
            aria-label={label ?? 'Fail'}
          />
        );
      default:
        return (
          <LucideReact.PauseCircle
            size={16}
            className="text-amber-500"
            aria-label={label ?? 'Bypass'}
          />
        );
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalSuites === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center">
        <LucideReact.AlertCircle size={32} className="text-gray-400 mb-2" />
        <p className="text-gray-500">No rule suite data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-hidden">
      <section className="mb-6 border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Rule Suites Summary
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Package2 size={16} className="text-gray-500" />
            <span className="ml-1">Total: {totalSuites}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span className="ml-1">Pass: {resultCounts.pass}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.XCircle size={16} className="text-red-500" />
            <span className="ml-1">Fail: {resultCounts.fail}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.PauseCircle size={16} className="text-amber-500" />
            <span className="ml-1">Bypass: {resultCounts.bypass}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <LucideReact.Activity size={16} className="text-gray-500" />
            <span className="ml-1">
              Eval Pass: {evaluationCounts.pass}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.Activity size={16} className="text-gray-500" />
            <span className="ml-1">
              Eval Fail: {evaluationCounts.fail}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.Activity size={16} className="text-gray-500" />
            <span className="ml-1">
              Eval Bypass: {evaluationCounts.bypass}
            </span>
          </div>
        </div>
      </section>

      <ul className="divide-y divide-gray-200">
        {value.map((item, idx) => (
          <li
            key={item.id ?? idx}
            className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-sm text-gray-900">
                <LucideReact.GitBranch size={16} className="text-gray-500" />
                <span className="ml-2 font-medium truncate">
                  {item.ref ?? '-'}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <LucideReact.Folder size={16} className="text-gray-500" />
                <span className="ml-2 truncate">
                  {item.repository_name ?? '-'}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center text-sm gap-x-4 gap-y-2 sm:mt-0 sm:ml-6">
              <div className="flex items-center text-gray-700">
                <LucideReact.User size={16} className="text-gray-500" />
                <span className="ml-1 truncate">
                  {item.actor_name ?? 'Unknown'}
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <LucideReact.Calendar size={16} className="text-gray-500" />
                <span className="ml-1">
                  {formatDate(item.pushed_at)}
                </span>
              </div>
              <div className="flex items-center">
                {getStatusIcon(item.result, 'Result')}
              </div>
              <div className="flex items-center">
                {getStatusIcon(item.evaluation_result, 'Evaluation')}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
