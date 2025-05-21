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
  const prevVersion = value.version_id;
  const actorType = value.actor.type?.trim() || "System";
  const actorId = value.actor.id !== undefined ? `#${value.actor.id}` : "";
  const actorDisplay = actorId ? `${actorType} ${actorId}` : actorType;

  const updatedDate = new Date(value.updated_at);
  const formattedDate =
    updatedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    ", " +
    updatedDate.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

  const stateJson = JSON.stringify(value.state);
  const truncatedState =
    stateJson.length > 120 ? stateJson.slice(0, 120) + "…" : stateJson;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Ruleset Version Update
      </h2>
      <dl className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <dt className="font-medium">Previous Version:</dt>
          <dd className="truncate">{prevVersion}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Updated By:</dt>
          <dd className="truncate">{actorDisplay}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Updated At:</dt>
          <dd className="truncate">{formattedDate}</dd>
        </div>
        {stateJson !== "{}" && (
          <div>
            <dt className="font-medium">State Snapshot:</dt>
            <pre className="mt-1 p-2 bg-gray-100 text-sm rounded border border-gray-200 overflow-x-auto">
              {truncatedState}
            </pre>
          </div>
        )}
      </dl>
    </div>
  );
}
