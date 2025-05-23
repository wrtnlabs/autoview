import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Information about the seat breakdown and policies set for an organization with a Copilot Business or Copilot Enterprise subscription.
     *
     * @title Copilot Organization Details
    */
    export interface copilot_organization_details {
        seat_breakdown: AutoViewInputSubTypes.copilot_organization_seat_breakdown;
        /**
         * The organization policy for allowing or blocking suggestions matching public code (duplication detection filter).
        */
        public_code_suggestions: "allow" | "block" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot Chat in the IDE.
        */
        ide_chat?: "enabled" | "disabled" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot features on GitHub.com.
        */
        platform_chat?: "enabled" | "disabled" | "unconfigured";
        /**
         * The organization policy for allowing or disallowing Copilot in the CLI.
        */
        cli?: "enabled" | "disabled" | "unconfigured";
        /**
         * The mode of assigning new seats.
        */
        seat_management_setting: "assign_all" | "assign_selected" | "disabled" | "unconfigured";
        /**
         * The Copilot plan of the organization, or the parent enterprise, when applicable.
        */
        plan_type?: "business" | "enterprise";
    }
    /**
     * The breakdown of Copilot Business seats for the organization.
     *
     * @title Copilot Seat Breakdown
    */
    export interface copilot_organization_seat_breakdown {
        /**
         * The total number of seats being billed for the organization as of the current billing cycle.
        */
        total?: number & tags.Type<"int32">;
        /**
         * Seats added during the current billing cycle.
        */
        added_this_cycle?: number & tags.Type<"int32">;
        /**
         * The number of seats that are pending cancellation at the end of the current billing cycle.
        */
        pending_cancellation?: number & tags.Type<"int32">;
        /**
         * The number of users who have been invited to receive a Copilot seat through this organization.
        */
        pending_invitation?: number & tags.Type<"int32">;
        /**
         * The number of seats that have used Copilot during the current billing cycle.
        */
        active_this_cycle?: number & tags.Type<"int32">;
        /**
         * The number of seats that have not used Copilot during the current billing cycle.
        */
        inactive_this_cycle?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.copilot_organization_details;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    seat_breakdown,
    public_code_suggestions,
    ide_chat,
    platform_chat,
    cli,
    seat_management_setting,
    plan_type,
  } = value;
  const {
    total,
    added_this_cycle,
    pending_cancellation,
    pending_invitation,
    active_this_cycle,
    inactive_this_cycle,
  } = seat_breakdown;

  const totalSeatsStr = total != null ? total.toLocaleString() : '—';
  const addedStr = added_this_cycle != null ? added_this_cycle.toLocaleString() : '—';
  const pendingCancelStr = pending_cancellation != null ? pending_cancellation.toLocaleString() : '—';
  const pendingInviteStr = pending_invitation != null ? pending_invitation.toLocaleString() : '—';
  const activeStr = active_this_cycle != null ? active_this_cycle.toLocaleString() : '—';
  const inactiveStr = inactive_this_cycle != null ? inactive_this_cycle.toLocaleString() : '—';

  let usageRate: number | null = null;
  if (
    total != null &&
    active_this_cycle != null &&
    total > 0
  ) {
    usageRate = (active_this_cycle / total) * 100;
  }

  // Policy mapping configurations
  const suggestionMap: Record<string, { label: string; bgClass: string; textClass: string }> = {
    allow: { label: 'Allowed', bgClass: 'bg-green-100', textClass: 'text-green-800' },
    block: { label: 'Blocked', bgClass: 'bg-red-100', textClass: 'text-red-800' },
    unconfigured: { label: 'Unconfigured', bgClass: 'bg-gray-100', textClass: 'text-gray-800' },
  };
  const enabledMap: Record<string, { label: string; bgClass: string; textClass: string }> = {
    enabled: { label: 'Enabled', bgClass: 'bg-green-100', textClass: 'text-green-800' },
    disabled: { label: 'Disabled', bgClass: 'bg-red-100', textClass: 'text-red-800' },
    unconfigured: { label: 'Unconfigured', bgClass: 'bg-gray-100', textClass: 'text-gray-800' },
  };
  const seatMgmtMap: Record<string, { label: string; bgClass: string; textClass: string }> = {
    assign_all: { label: 'Assign All', bgClass: 'bg-green-100', textClass: 'text-green-800' },
    assign_selected: { label: 'Assign Selected', bgClass: 'bg-blue-100', textClass: 'text-blue-800' },
    disabled: { label: 'Disabled', bgClass: 'bg-red-100', textClass: 'text-red-800' },
    unconfigured: { label: 'Unconfigured', bgClass: 'bg-gray-100', textClass: 'text-gray-800' },
  };
  const planMap: Record<string, { label: string; bgClass: string; textClass: string }> = {
    business: { label: 'Business', bgClass: 'bg-blue-100', textClass: 'text-blue-800' },
    enterprise: { label: 'Enterprise', bgClass: 'bg-purple-100', textClass: 'text-purple-800' },
  };

  const policyItems: {
    title: string;
    config: { label: string; bgClass: string; textClass: string };
  }[] = [
    {
      title: 'Public Code Suggestions',
      config: suggestionMap[public_code_suggestions],
    },
    {
      title: 'IDE Chat',
      config: enabledMap[ide_chat ?? 'unconfigured'],
    },
    {
      title: 'Platform Chat',
      config: enabledMap[platform_chat ?? 'unconfigured'],
    },
    {
      title: 'CLI Usage',
      config: enabledMap[cli ?? 'unconfigured'],
    },
    {
      title: 'Seat Management',
      config: seatMgmtMap[seat_management_setting],
    },
  ];
  if (plan_type) {
    policyItems.push({
      title: 'Plan Type',
      config: planMap[plan_type],
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-8">
      {/* Seat Breakdown */}
      <section>
        <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
          <LucideReact.Users className="mr-2 text-blue-500" size={20} />
          Seat Breakdown
        </h2>
        {usageRate !== null && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{activeStr} used</span>
              <span>{totalSeatsStr} total</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${usageRate}%` }}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <LucideReact.Users className="text-blue-500" size={18} />
            <span className="text-sm font-medium">{totalSeatsStr} total</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.CheckCircle className="text-green-500" size={18} />
            <span className="text-sm font-medium">{activeStr} active</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.MinusCircle className="text-yellow-500" size={18} />
            <span className="text-sm font-medium">{inactiveStr} inactive</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.PlusCircle className="text-blue-500" size={18} />
            <span className="text-sm font-medium">{addedStr} added</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.UserPlus className="text-blue-400" size={18} />
            <span className="text-sm font-medium">{pendingInviteStr} invited</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.XCircle className="text-red-500" size={18} />
            <span className="text-sm font-medium">{pendingCancelStr} pending cancel</span>
          </div>
        </div>
      </section>

      {/* Organization Policies */}
      <section>
        <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
          <LucideReact.ListChecks className="mr-2 text-blue-500" size={20} />
          Organization Policies
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {policyItems.map((item) => (
            <div key={item.title} className="flex justify-between items-center">
              <dt className="text-sm text-gray-600">{item.title}</dt>
              <dd>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${item.config.bgClass} ${item.config.textClass}`}
                >
                  {item.config.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
