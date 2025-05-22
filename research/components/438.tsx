import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Information about the seat breakdown and policies set for an organization with a Copilot Business or Copilot Enterprise subscription.
   *
   * @title Copilot Organization Details
   */
  export type copilot_organization_details = {
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
    seat_management_setting:
      | "assign_all"
      | "assign_selected"
      | "disabled"
      | "unconfigured";
    /**
     * The Copilot plan of the organization, or the parent enterprise, when applicable.
     */
    plan_type?: "business" | "enterprise";
  };
  /**
   * The breakdown of Copilot Business seats for the organization.
   *
   * @title Copilot Seat Breakdown
   */
  export type copilot_organization_seat_breakdown = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.copilot_organization_details;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    seat_breakdown: {
      total = 0,
      added_this_cycle = 0,
      pending_cancellation = 0,
      pending_invitation = 0,
      active_this_cycle = 0,
      inactive_this_cycle = 0,
    },
    public_code_suggestions,
    ide_chat = "unconfigured",
    platform_chat = "unconfigured",
    cli = "unconfigured",
    seat_management_setting,
    plan_type,
  } = value;

  // Mapping helpers
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const policyLabelMap: Record<string, string> = {
    enabled: "Enabled",
    disabled: "Disabled",
    unconfigured: "Unconfigured",
  };
  const policyIconMap: Record<string, JSX.Element> = {
    enabled: <LucideReact.CheckCircle className="text-green-500" size={20} />,
    disabled: <LucideReact.XCircle className="text-red-500" size={20} />,
    unconfigured: (
      <LucideReact.HelpCircle className="text-gray-400" size={20} />
    ),
  };

  // Specific icon for public code suggestions
  const publicCodeIcon =
    public_code_suggestions === "allow" ? (
      <LucideReact.ShieldCheck className="text-green-500" size={20} />
    ) : public_code_suggestions === "block" ? (
      <LucideReact.ShieldOff className="text-red-500" size={20} />
    ) : (
      <LucideReact.Shield className="text-gray-400" size={20} />
    );
  const publicCodeLabel =
    public_code_suggestions === "allow"
      ? "Allowed"
      : public_code_suggestions === "block"
        ? "Blocked"
        : "Unconfigured";

  // Plan type icon
  const planIcon =
    plan_type === "enterprise" ? (
      <LucideReact.Building className="text-blue-600" size={20} />
    ) : plan_type === "business" ? (
      <LucideReact.Briefcase className="text-indigo-600" size={20} />
    ) : null;
  const planLabel = plan_type ? capitalize(plan_type) : "Not set";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Copilot Organization Details
        </h2>
        {planIcon && (
          <div className="flex items-center space-x-1">
            {planIcon}
            <span className="text-sm font-medium text-gray-700">
              {planLabel}
            </span>
          </div>
        )}
      </div>

      {/* Policy Statuses */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Policies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Public Code Suggestions */}
          <div className="flex items-center space-x-2">
            {publicCodeIcon}
            <span className="text-sm text-gray-700">{publicCodeLabel}</span>
          </div>
          {/* IDE Chat */}
          <div className="flex items-center space-x-2">
            {policyIconMap[ide_chat]}
            <span className="text-sm text-gray-700">
              IDE Chat: {policyLabelMap[ide_chat]}
            </span>
          </div>
          {/* Platform Chat */}
          <div className="flex items-center space-x-2">
            <LucideReact.MessageSquare
              className={
                platform_chat === "enabled"
                  ? "text-green-500"
                  : platform_chat === "disabled"
                    ? "text-red-500"
                    : "text-gray-400"
              }
              size={20}
            />
            <span className="text-sm text-gray-700">
              Platform Chat: {policyLabelMap[platform_chat]}
            </span>
          </div>
          {/* CLI */}
          <div className="flex items-center space-x-2">
            <LucideReact.Terminal
              className={
                cli === "enabled"
                  ? "text-green-500"
                  : cli === "disabled"
                    ? "text-red-500"
                    : "text-gray-400"
              }
              size={20}
            />
            <span className="text-sm text-gray-700">
              CLI: {policyLabelMap[cli]}
            </span>
          </div>
          {/* Seat Management */}
          <div className="flex items-center space-x-2 col-span-full sm:col-span-2">
            {seat_management_setting === "assign_all" ? (
              <LucideReact.Users className="text-indigo-500" size={20} />
            ) : seat_management_setting === "assign_selected" ? (
              <LucideReact.UserCheck className="text-blue-500" size={20} />
            ) : seat_management_setting === "disabled" ? (
              <LucideReact.UserX className="text-red-500" size={20} />
            ) : (
              <LucideReact.HelpCircle className="text-gray-400" size={20} />
            )}
            <span className="text-sm text-gray-700">
              Seat Management: {capitalize(seat_management_setting)}
            </span>
          </div>
        </div>
      </div>

      {/* Seat Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Seat Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <LucideReact.Users className="text-gray-500" size={20} />
            <span className="text-sm text-gray-700">Total: {total}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.UserPlus className="text-green-500" size={20} />
            <span className="text-sm text-gray-700">
              Added This Cycle: {added_this_cycle}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.XCircle className="text-red-500" size={20} />
            <span className="text-sm text-gray-700">
              Pending Cancellation: {pending_cancellation}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.Mail className="text-gray-400" size={20} />
            <span className="text-sm text-gray-700">
              Pending Invitation: {pending_invitation}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.CheckCircle className="text-green-500" size={20} />
            <span className="text-sm text-gray-700">
              Active This Cycle: {active_this_cycle}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <LucideReact.Slash className="text-gray-400" size={20} />
            <span className="text-sm text-gray-700">
              Inactive This Cycle: {inactive_this_cycle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
