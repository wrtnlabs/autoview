import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Team Membership
   *
   * @title Team Membership
   */
  export type team_membership = {
    url: string & tags.Format<"uri">;
    /**
     * The role of the user in the team.
     */
    role: "member" | "maintainer";
    /**
     * The state of the user's membership in the team.
     */
    state: "active" | "pending";
  };
}
export type AutoViewInput = AutoViewInputSubTypes.team_membership;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Derive a displayable host from the URL
  let host: string;
  try {
    host = new URL(value.url).host;
  } catch {
    host = value.url;
  }

  //    Map membership state to icon and label
  const stateInfo = (() => {
    if (value.state === "active") {
      return {
        icon: <LucideReact.CheckCircle className="text-green-500" size={16} />,
        label: "Active",
        textColor: "text-green-700",
      };
    }
    return {
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
      label: "Pending",
      textColor: "text-amber-700",
    };
  })();

  //    Map role to icon and label
  const roleInfo = (() => {
    if (value.role === "maintainer") {
      return {
        icon: <LucideReact.ShieldCheck className="text-blue-500" size={16} />,
        label: "Maintainer",
      };
    }
    return {
      icon: <LucideReact.User className="text-gray-500" size={16} />,
      label: "Member",
    };
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    The card displays the team URL host, role, and membership state.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* URL Display */}
      <div className="flex items-center gap-2">
        <LucideReact.Link className="text-gray-500" size={16} />
        <span className="text-sm font-medium text-gray-800 break-all">
          {host}
        </span>
      </div>

      {/* Role Display */}
      <div className="flex items-center gap-2">
        {roleInfo.icon}
        <span className="text-sm text-gray-700">{roleInfo.label}</span>
      </div>

      {/* State Display */}
      <div className="flex items-center gap-2">
        {stateInfo.icon}
        <span className={`text-sm ${stateInfo.textColor}`}>
          {stateInfo.label}
        </span>
      </div>
    </div>
  );
}
