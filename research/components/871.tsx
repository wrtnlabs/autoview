import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type secret_scanning_push_protection_bypass = {
    reason?: AutoViewInputSubTypes.secret_scanning_push_protection_bypass_reason;
    /**
     * The time that the bypass will expire in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
     */
    expire_at?: (string & tags.Format<"date-time">) | null;
    /**
     * The token type this bypass is for.
     */
    token_type?: string;
  };
  /**
   * The reason for bypassing push protection.
   */
  export type secret_scanning_push_protection_bypass_reason =
    | "false_positive"
    | "used_in_tests"
    | "will_fix_later";
}
export type AutoViewInput =
  AutoViewInputSubTypes.secret_scanning_push_protection_bypass;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const reasonMap: Record<
    AutoViewInputSubTypes.secret_scanning_push_protection_bypass_reason,
    string
  > = {
    false_positive: "False Positive",
    used_in_tests: "Used in Tests",
    will_fix_later: "Will Fix Later",
  };
  const reasonLabel = value.reason ? reasonMap[value.reason] : "Not specified";
  const formattedExpireAt = value.expire_at
    ? new Date(value.expire_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "No expiration";
  const tokenTypeLabel = value.token_type ?? "Not specified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <header className="flex items-center mb-4 text-lg font-semibold text-gray-800">
        <LucideReact.ShieldOff className="mr-2 text-red-500" size={20} />
        <span>Push Protection Bypass</span>
      </header>
      <dl className="space-y-3 text-gray-700">
        <div className="flex items-center">
          <LucideReact.Tag className="mr-2 text-gray-500" size={16} />
          <dt className="font-medium">Token Type:</dt>
          <dd className="ml-1 truncate">{tokenTypeLabel}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.AlertCircle
            className="mr-2 text-yellow-500"
            size={16}
            aria-hidden
          />
          <dt className="font-medium">Reason:</dt>
          <dd className="ml-1">{reasonLabel}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            className="mr-2 text-gray-500"
            size={16}
            aria-hidden
          />
          <dt className="font-medium">Expires:</dt>
          <dd className="ml-1">{formattedExpireAt}</dd>
        </div>
      </dl>
    </div>
  );
}
