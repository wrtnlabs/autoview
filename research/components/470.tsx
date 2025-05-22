import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export type interaction_limit_response = {
        limit: AutoViewInputSubTypes.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    };
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map raw enum values to human-readable labels
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing users",
    contributors_only: "Contributors only",
    collaborators_only: "Collaborators only",
  };
  const displayLimit = limitLabels[value.limit] || value.limit;

  // Parse and format expiration date
  const expiresDate = new Date(value.expires_at);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Compute relative time remaining
  const now = new Date();
  const diffMs = expiresDate.getTime() - now.getTime();
  let timeRemaining: string;
  if (diffMs <= 0) {
    timeRemaining = "Expired";
  } else {
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (totalDays > 0) {
      const hrs = totalHours % 24;
      timeRemaining = `${totalDays}d${hrs > 0 ? ` ${hrs}h` : ""} remaining`;
    } else if (totalHours > 0) {
      const mins = totalMinutes % 60;
      timeRemaining = `${totalHours}h${mins > 0 ? ` ${mins}m` : ""} remaining`;
    } else {
      timeRemaining = `${totalMinutes}m remaining`;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">Interaction Limits</h2>
      <dl className="mt-3 space-y-2 text-gray-700">
        <div className="flex justify-between">
          <dt className="font-medium">Group</dt>
          <dd className="truncate">{displayLimit}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Origin</dt>
          <dd className="truncate">{value.origin}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Expires</dt>
          <dd className="text-right">
            <span className="block">{formattedExpires}</span>
            <span className="text-sm text-gray-500">{timeRemaining}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
