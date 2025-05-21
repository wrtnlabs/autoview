import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type ruleset_version_with_state = {
        /**
         * The ID of the previous version of the ruleset
        */
        version_id: number & tags.Type<"int32">;
        /**
         * The actor who updated the ruleset
        */
        actor: {
            id?: number & tags.Type<"int32">;
            type?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        /**
         * The state of the ruleset version
        */
        state: {};
    };
}
export type AutoViewInput = AutoViewInputSubTypes.ruleset_version_with_state;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format the update timestamp to a human-readable string.
  const formattedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  //    Build a display string for the actor (type and/or ID).
  const actorParts: string[] = [];
  if (value.actor.type) actorParts.push(value.actor.type);
  if (value.actor.id !== undefined) actorParts.push(`#${value.actor.id}`);
  const actorDisplay = actorParts.length > 0 ? actorParts.join(" ") : "Unknown";

  //    Serialize the state object to JSON and truncate if too long for layout.
  const rawStateJson = JSON.stringify(value.state, null, 2);
  const maxPreviewLength = 200;
  const displayStateJson =
    rawStateJson.length > maxPreviewLength
      ? rawStateJson.slice(0, maxPreviewLength) + "..."
      : rawStateJson;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Use a card layout to present version info and state snapshot.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <header className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          Ruleset Version #{value.version_id}
        </h2>
        <p className="text-sm text-gray-600">
          Updated by <span className="font-medium text-gray-700">{actorDisplay}</span>{" "}
          on <time dateTime={value.updated_at}>{formattedDate}</time>
        </p>
      </header>

      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-1">State Snapshot</h3>
        <pre className="bg-gray-50 text-xs text-gray-800 p-2 rounded overflow-auto max-h-32">
          {displayStateJson}
        </pre>
      </section>
    </div>
  );
}
