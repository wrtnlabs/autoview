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
  const badgeStyles: Record<"pass" | "fail" | "bypass", string> = {
    pass: "bg-green-100 text-green-800",
    fail: "bg-red-100 text-red-800",
    bypass: "bg-yellow-100 text-yellow-800",
  };

  const formatDate = (iso?: string): string => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {Array.isArray(value) && value.length > 0 ? (
        value.map((suite, index) => {
          const {
            id,
            actor_name,
            repository_name,
            ref,
            pushed_at,
            result,
            evaluation_result,
            before_sha,
            after_sha,
          } = suite;
          const actor = actor_name ?? "Unknown";
          const repo = repository_name ?? "Unknown repository";
          const date = formatDate(pushed_at);
          const status = result ?? "bypass";
          const evalStatus = evaluation_result ?? "bypass";
          const shortBefore = before_sha ? before_sha.slice(0, 7) : "";
          const shortAfter = after_sha ? after_sha.slice(0, 7) : "";

          return (
            <div
              key={id ?? index}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {repo}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    {actor}
                  </p>
                </div>
                <time
                  className="mt-2 sm:mt-0 text-sm text-gray-500 whitespace-nowrap"
                  dateTime={pushed_at ?? undefined}
                >
                  {date}
                </time>
              </header>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span
                  className={`px-2 py-1 rounded-full font-medium ${badgeStyles[status]}`}
                >
                  {status.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full font-medium ${badgeStyles[evalStatus]}`}
                >
                  EVAL: {evalStatus.toUpperCase()}
                </span>
                {ref && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {ref}
                  </span>
                )}
                {shortBefore && shortAfter && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {shortBefore}…{shortAfter}
                  </span>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No rule suite data available.</p>
      )}
    </div>
  );
}
