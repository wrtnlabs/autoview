import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace desk {
    export type ChatTagView = {
      chatTag?: AutoViewInputSubTypes.ChatTag;
    };
  }
  export type ChatTag = {
    id?: string;
    channelId?: string;
    colorVariant?:
      | "red"
      | "orange"
      | "yellow"
      | "olive"
      | "green"
      | "cobalt"
      | "purple"
      | "pink"
      | "navy";
    name: string;
    key: string;
    description?: string;
    /**
     * @deprecated
     */
    followerIds?: string[] &
      tags.MinItems<1> &
      tags.MaxItems<2147483647> &
      tags.UniqueItems;
    createdAt?: number;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.desk.ChatTagView;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const chatTag = value.chatTag;

  // Mapping colorVariant to Tailwind CSS classes
  function getColorClasses(
    variant?: AutoViewInputSubTypes.ChatTag["colorVariant"],
  ) {
    switch (variant) {
      case "red":
        return {
          border: "border-red-500",
          bg: "bg-red-100",
          text: "text-red-800",
        };
      case "orange":
        return {
          border: "border-orange-500",
          bg: "bg-orange-100",
          text: "text-orange-800",
        };
      case "yellow":
        return {
          border: "border-yellow-500",
          bg: "bg-yellow-100",
          text: "text-yellow-800",
        };
      case "olive":
        return {
          border: "border-lime-500",
          bg: "bg-lime-100",
          text: "text-lime-800",
        };
      case "green":
        return {
          border: "border-green-500",
          bg: "bg-green-100",
          text: "text-green-800",
        };
      case "cobalt":
        return {
          border: "border-blue-600",
          bg: "bg-blue-100",
          text: "text-blue-800",
        };
      case "purple":
        return {
          border: "border-purple-500",
          bg: "bg-purple-100",
          text: "text-purple-800",
        };
      case "pink":
        return {
          border: "border-pink-500",
          bg: "bg-pink-100",
          text: "text-pink-800",
        };
      case "navy":
        return {
          border: "border-indigo-700",
          bg: "bg-indigo-100",
          text: "text-indigo-800",
        };
      default:
        return { border: "", bg: "bg-gray-100", text: "text-gray-800" };
    }
  }

  if (!chatTag) {
    // 3. Return the React element for empty state.
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-label="No Tag Data" />
        <p className="mt-2 text-sm">No tag data available</p>
      </div>
    );
  }

  const { border, bg, text } = getColorClasses(chatTag.colorVariant);
  const createdAt =
    chatTag.createdAt != null
      ? new Date(chatTag.createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      className={[
        "p-4 bg-white rounded-lg shadow flex flex-col",
        border ? `border-l-4 ${border}` : "border border-gray-200",
      ].join(" ")}
    >
      <div className="flex items-center">
        <LucideReact.Tag
          size={20}
          className={`${text}`}
          strokeWidth={1.5}
          aria-label="Tag Icon"
        />
        <h3 className="ml-2 text-lg font-medium text-gray-900">
          {chatTag.name}
        </h3>
      </div>

      <div className="mt-1">
        <code className="text-sm text-gray-500 bg-gray-100 px-1 rounded">
          {chatTag.key}
        </code>
      </div>

      {chatTag.description && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">
          {chatTag.description}
        </p>
      )}

      {createdAt && (
        <div className="mt-4 flex items-center text-xs text-gray-500">
          <LucideReact.Calendar size={14} className="mr-1" />
          <span>Created: {createdAt}</span>
        </div>
      )}
    </div>
  );
}
