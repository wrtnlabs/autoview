import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Private registry configuration for an organization
   *
   * @title Organization private registry
   */
  export type org_private_registry_configuration = {
    /**
     * The name of the private registry configuration.
     */
    name: string;
    /**
     * The registry type.
     */
    registry_type: "maven_repository";
    /**
     * The username to use when authenticating with the private registry.
     */
    username?: string | null;
    /**
     * Which type of organization repositories have access to the private registry.
     */
    visibility: "all" | "private" | "selected";
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.org_private_registry_configuration;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedType = value.registry_type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const formattedUpdated = new Date(value.updated_at).toLocaleString();
  const visibilityLabel =
    value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);
  const visibilityIcon = (() => {
    switch (value.visibility) {
      case "all":
        return <LucideReact.Users size={16} className="text-gray-500" />;
      case "private":
        return <LucideReact.Lock size={16} className="text-red-500" />;
      case "selected":
        return <LucideReact.UserPlus size={16} className="text-blue-500" />;
      default:
        return <LucideReact.ShieldOff size={16} className="text-gray-500" />;
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
          <LucideReact.Server size={20} className="text-indigo-500 mr-2" />
          {value.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center">
            <LucideReact.Package size={16} className="text-gray-500 mr-2" />
            <span>
              <span className="font-medium">Type:</span> {formattedType}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.User size={16} className="text-gray-500 mr-2" />
            <span>
              <span className="font-medium">Username:</span>{" "}
              {value.username ?? "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            {visibilityIcon}
            <span className="ml-2">
              <span className="font-medium">Visibility:</span> {visibilityLabel}
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.Calendar size={16} className="text-gray-500 mr-2" />
            <span>
              <span className="font-medium">Created:</span> {formattedCreated}
            </span>
          </div>
          <div className="flex items-center sm:col-span-2">
            <LucideReact.CalendarClock
              size={16}
              className="text-gray-500 mr-2"
            />
            <span>
              <span className="font-medium">Updated:</span> {formattedUpdated}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
