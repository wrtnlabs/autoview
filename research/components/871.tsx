import { tags } from "typia";
import React from "react";
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
    export type secret_scanning_push_protection_bypass_reason = "false_positive" | "used_in_tests" | "will_fix_later";
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_push_protection_bypass;



// The component name is always "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const reasonLabels: Record<AutoViewInputSubTypes.secret_scanning_push_protection_bypass_reason, string> = {
    false_positive: "False Positive",
    used_in_tests: "Used in Tests",
    will_fix_later: "Will Fix Later",
  };

  const reasonLabel = value.reason ? reasonLabels[value.reason] : "Not specified";

  let expirationLabel: string;
  if (value.expire_at === null) {
    expirationLabel = "No expiration";
  } else if (value.expire_at) {
    const date = new Date(value.expire_at);
    expirationLabel = date.toLocaleString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    });
  } else {
    expirationLabel = "Not specified";
  }

  const tokenTypeLabel = value.token_type?.trim() ? value.token_type : "Not specified";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Push Protection Bypass Details
      </h2>
      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Reason</dt>
          <dd className="text-sm text-gray-900">{reasonLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Expires At</dt>
          <dd className="text-sm text-gray-900">{expirationLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Token Type</dt>
          <dd className="text-sm text-gray-900">{tokenTypeLabel}</dd>
        </div>
      </dl>
    </div>
  );
}
