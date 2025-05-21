import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChatTagView = {
                    chatTag?: AutoViewInputSubTypes.legacy.v4.LegacyV4ChatTag;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4ChatTag = {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            };
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4ChatTagView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const tag = value.chatTag;
  if (!tag) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No chat tag available.
      </div>
    );
  }

  const followerCount = tag.followerIds?.length ?? 0;
  const formattedDate = tag.createdAt
    ? new Date(tag.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  const colorMap: Record<string, string> = {
    red: "bg-red-50 text-red-700",
    orange: "bg-orange-50 text-orange-700",
    yellow: "bg-yellow-50 text-yellow-700",
    olive: "bg-green-50 text-green-700",
    green: "bg-green-50 text-green-700",
    cobalt: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    pink: "bg-pink-50 text-pink-700",
    navy: "bg-indigo-50 text-indigo-700",
  };
  const badgeClass = tag.colorVariant
    ? colorMap[tag.colorVariant] ?? "bg-gray-50 text-gray-700"
    : "bg-gray-50 text-gray-700";

  const description =
    tag.description && tag.description.length > 0
      ? tag.description
      : "No description provided.";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3 max-w-xs mx-auto">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{tag.name}</h2>
        <span className={`px-2 py-1 text-sm font-medium rounded ${badgeClass}`}>
          {tag.colorVariant ?? "default"}
        </span>
      </header>
      <div className="text-sm font-mono text-gray-600 truncate">{tag.key}</div>
      <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
      <footer className="flex items-center justify-between text-sm text-gray-500">
        <span>{followerCount} follower{followerCount === 1 ? "" : "s"}</span>
        <span>Created {formattedDate}</span>
      </footer>
    </article>
  );
}
