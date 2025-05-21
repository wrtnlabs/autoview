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
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };

  const expiresAt = new Date(value.expires_at);
  const formattedExpiresAt = expiresAt.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  let remainingText: string;
  if (diffMs <= 0) {
    remainingText = "Expired";
  } else if (diffMs >= 1000 * 60 * 60 * 24) {
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    remainingText = `${days} day${days !== 1 ? "s" : ""} left`;
  } else if (diffMs >= 1000 * 60 * 60) {
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    remainingText = `${hours} hour${hours !== 1 ? "s" : ""} left`;
  } else {
    const mins = Math.floor(diffMs / (1000 * 60));
    remainingText = `${mins} min${mins !== 1 ? "s" : ""} left`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Interaction Limits
      </h2>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-medium text-gray-600">Origin</dt>
          <dd className="mt-1 text-gray-900 break-all">{value.origin}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Allowed Group</dt>
          <dd className="mt-1">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              {limitLabels[value.limit]}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Expires At</dt>
          <dd className="mt-1 text-gray-900">{formattedExpiresAt}</dd>
          <dd className="mt-1 text-xs text-gray-500">{remainingText}</dd>
        </div>
      </dl>
    </div>
  );
}
