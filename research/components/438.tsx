import { tags } from "typia";
import React from "react";
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
        seat_management_setting: "assign_all" | "assign_selected" | "disabled" | "unconfigured";
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
  const planLabel =
    value.plan_type === "enterprise"
      ? "Enterprise"
      : value.plan_type === "business"
      ? "Business"
      : null;
  const planClasses =
    value.plan_type === "enterprise"
      ? "bg-indigo-100 text-indigo-800"
      : value.plan_type === "business"
      ? "bg-blue-100 text-blue-800"
      : "";
  const managementMap: Record<
    AutoViewInput["seat_management_setting"],
    { label: string; classes: string }
  > = {
    assign_all: { label: "Assign All", classes: "bg-green-100 text-green-800" },
    assign_selected: {
      label: "Assign Selected",
      classes: "bg-yellow-100 text-yellow-800",
    },
    disabled: { label: "Disabled", classes: "bg-red-100 text-red-800" },
    unconfigured: {
      label: "Unconfigured",
      classes: "bg-gray-100 text-gray-600",
    },
  };
  const management = managementMap[value.seat_management_setting];
  const policyMap: Record<
    Exclude<AutoViewInput["public_code_suggestions"], undefined>,
    { label: string; classes: string }
  > = {
    allow: { label: "Allow", classes: "bg-green-100 text-green-800" },
    block: { label: "Block", classes: "bg-red-100 text-red-800" },
    unconfigured: {
      label: "Unconfigured",
      classes: "bg-gray-100 text-gray-600",
    },
  };
  const chatMap: Record<string, { label: string; classes: string }> = {
    enabled: { label: "Enabled", classes: "bg-green-100 text-green-800" },
    disabled: { label: "Disabled", classes: "bg-red-100 text-red-800" },
    unconfigured: {
      label: "Unconfigured",
      classes: "bg-gray-100 text-gray-600",
    },
  };
  const {
    total = 0,
    added_this_cycle = 0,
    pending_cancellation = 0,
    pending_invitation = 0,
    active_this_cycle = 0,
    inactive_this_cycle = 0,
  } = value.seat_breakdown;
  const activeRate = total > 0 ? Math.round((active_this_cycle / total) * 100) : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">
          Copilot Organization Details
        </h2>
        <div className="flex flex-wrap gap-2">
          {planLabel && (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${planClasses}`}
            >
              {planLabel}
            </span>
          )}
          {management && (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${management.classes}`}
            >
              {management.label}
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Seat Breakdown
        </h3>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <dt className="text-sm text-gray-600">Total Seats</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {total}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Active This Cycle</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {active_this_cycle}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Inactive This Cycle</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {inactive_this_cycle}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Added This Cycle</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {added_this_cycle}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Pending Cancellation</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {pending_cancellation}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600">Pending Invitation</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-800">
              {pending_invitation}
            </dd>
          </div>
        </dl>
        {total > 0 && (
          <div className="mt-6">
            <dt className="text-sm text-gray-600">Active Usage</dt>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${activeRate}%` }}
              />
            </div>
            <dd className="text-sm text-gray-700 font-medium mt-1">
              {activeRate}%
            </dd>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Policies</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center">
            <span className="text-gray-600">Public Code Suggestions</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                policyMap[value.public_code_suggestions].classes
              }`}
            >
              {policyMap[value.public_code_suggestions].label}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600">IDE Chat</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                chatMap[value.ide_chat ?? "unconfigured"].classes
              }`}
            >
              {chatMap[value.ide_chat ?? "unconfigured"].label}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600">Platform Chat</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                chatMap[value.platform_chat ?? "unconfigured"].classes
              }`}
            >
              {chatMap[value.platform_chat ?? "unconfigured"].label}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-600">CLI</span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                chatMap[value.cli ?? "unconfigured"].classes
              }`}
            >
              {chatMap[value.cli ?? "unconfigured"].label}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
