import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface secret_scanning_push_protection_bypass {
        reason?: AutoViewInputSubTypes.secret_scanning_push_protection_bypass_reason;
        /**
         * The time that the bypass will expire in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        expire_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The token type this bypass is for.
        */
        token_type?: string;
    }
    /**
     * The reason for bypassing push protection.
    */
    export type secret_scanning_push_protection_bypass_reason = "false_positive" | "used_in_tests" | "will_fix_later";
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_push_protection_bypass;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map each bypass reason to a user-friendly label and an icon
  const reasonDetails: Record<
    AutoViewInputSubTypes.secret_scanning_push_protection_bypass_reason,
    { label: string; icon: JSX.Element }
  > = {
    false_positive: {
      label: "False Positive",
      icon: (
        <LucideReact.ShieldOff
          size={20}
          className="text-yellow-500"
          aria-label="False positive"
        />
      ),
    },
    used_in_tests: {
      label: "Used in Tests",
      icon: (
        <LucideReact.TestTube2
          size={20}
          className="text-blue-500"
          aria-label="Used in tests"
        />
      ),
    },
    will_fix_later: {
      label: "Will Fix Later",
      icon: (
        <LucideReact.Clock
          size={20}
          className="text-gray-500"
          aria-label="Will fix later"
        />
      ),
    },
  };

  // Derive the selected reason detail if present
  const reasonDetail = value.reason ? reasonDetails[value.reason] : undefined;

  // Format the expiration timestamp, if provided
  const formattedExpire =
    value.expire_at != null
      ? new Date(value.expire_at).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handling the "no data" state
  if (!reasonDetail && !formattedExpire && !value.token_type) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <p className="mt-2 text-sm">No bypass details available</p>
      </div>
    );
  }

  // Main display card
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {reasonDetail && (
        <div className="flex items-center space-x-2">
          {reasonDetail.icon}
          <span className="text-sm font-medium text-gray-700">
            {reasonDetail.label}
          </span>
        </div>
      )}
      {formattedExpire && (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Expires: {formattedExpire}</span>
        </div>
      )}
      {value.token_type && (
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <LucideReact.Key size={16} className="mr-1" />
          <span>Token Type: {value.token_type}</span>
        </div>
      )}
    </div>
  );
}
