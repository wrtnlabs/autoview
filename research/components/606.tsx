import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Details of a deployment that is waiting for protection rules to pass
     *
     * @title Pending Deployment
    */
    export type pending_deployment = {
        environment: {
            /**
             * The id of the environment.
            */
            id?: number & tags.Type<"int32">;
            node_id?: string;
            /**
             * The name of the environment.
            */
            name?: string;
            url?: string;
            html_url?: string;
        };
        /**
         * The set duration of the wait timer
        */
        wait_timer: number & tags.Type<"int32">;
        /**
         * The time that the wait timer began.
        */
        wait_timer_started_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the currently authenticated user can approve the deployment
        */
        current_user_can_approve: boolean;
        /**
         * The people or teams that may approve jobs that reference the environment. You can list up to six users or teams as reviewers. The reviewers must have at least read access to the repository. Only one of the required reviewers needs to approve the job for it to proceed.
        */
        reviewers: {
            type?: AutoViewInputSubTypes.deployment_reviewer_type;
            reviewer?: any | any;
        }[];
    };
    /**
     * The type of reviewer.
    */
    export type deployment_reviewer_type = "User" | "Team";
    export type simple_user = any;
    export type team = any;
}
export type AutoViewInput = AutoViewInputSubTypes.pending_deployment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format ISO datetime to a human-readable string
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Not started";

  // Format seconds into "MM:SS" or seconds if under a minute
  const formatDuration = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0
      ? `${m}m ${s.toString().padStart(2, "0")}s`
      : `${s}s`;
  };

  // Derive a display label for a reviewer
  const getReviewerLabel = (rev: AutoViewInputSubTypes.pending_deployment["reviewers"][0]): string => {
    const { type, reviewer } = rev;
    let name = "";

    if (reviewer && typeof reviewer === "object") {
      // common fields: login, name
      name =
        (("login" in reviewer && reviewer.login) as string) ||
        (("name" in reviewer && reviewer.name) as string) ||
        "";
    }
    if (!name && typeof reviewer === "string") {
      name = reviewer;
    }
    // fallback to JSON snippet
    if (!name) {
      const json = JSON.stringify(reviewer);
      name = json.length > 15 ? json.slice(0, 15) + "…" : json;
    }
    return `${type}:${name}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No pending deployments.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((item, idx) => {
        const {
          environment,
          wait_timer,
          wait_timer_started_at,
          current_user_can_approve,
          reviewers,
        } = item;
        const displayName = environment.name || "Unnamed Env";
        const startedAt = formatDate(wait_timer_started_at);
        const duration = formatDuration(wait_timer);
        const canApprove = current_user_can_approve;
        const maxDisplay = 5;
        const extraCount = reviewers.length - maxDisplay;
        const shownReviewers = reviewers.slice(0, maxDisplay);

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {displayName}
              </h3>
              <span
                className={
                  "mt-2 sm:mt-0 inline-block px-2 py-1 text-xs font-medium rounded-full " +
                  (canApprove
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-600")
                }
              >
                {canApprove ? "Can Approve" : "Cannot Approve"}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-700">
                  Wait Timer:
                </span>{" "}
                {duration}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Started At:
                </span>{" "}
                {startedAt}
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Reviewers:
                </span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {shownReviewers.map((r, i) => (
                <span
                  key={i}
                  className="inline-block bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {getReviewerLabel(r)}
                </span>
              ))}
              {extraCount > 0 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{extraCount} more
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
