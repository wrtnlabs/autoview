import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposDependencyGraphSnapshots {
        export interface PostResponse {
            /**
             * ID of the created snapshot.
            */
            id: number & tags.Type<"int32">;
            /**
             * The time at which the snapshot was created.
            */
            created_at: string;
            /**
             * Either "SUCCESS", "ACCEPTED", or "INVALID". "SUCCESS" indicates that the snapshot was successfully created and the repository's dependencies were updated. "ACCEPTED" indicates that the snapshot was successfully created, but the repository's dependencies were not updated. "INVALID" indicates that the snapshot was malformed.
            */
            result: string;
            /**
             * A message providing further details about the result, such as why the dependencies were not updated.
            */
            message: string;
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposDependencyGraphSnapshots.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Map the result to an icon and color
  let statusIcon: JSX.Element;
  switch (value.result) {
    case 'SUCCESS':
      statusIcon = <LucideReact.CheckCircle className="text-green-500" size={20} aria-label="Success" />;
      break;
    case 'ACCEPTED':
      statusIcon = <LucideReact.Clock className="text-amber-500" size={20} aria-label="Accepted" />;
      break;
    case 'INVALID':
      statusIcon = <LucideReact.AlertTriangle className="text-red-500" size={20} aria-label="Invalid" />;
      break;
    default:
      statusIcon = <LucideReact.HelpCircle className="text-gray-500" size={20} aria-label="Unknown status" />;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {statusIcon}
          <span className="font-semibold text-gray-900 uppercase">{value.result}</span>
        </div>
        <time className="flex items-center text-gray-500 text-sm" dateTime={value.created_at}>
          <LucideReact.Calendar className="mr-1 text-gray-400" size={16} aria-label="Created at" />
          {formattedDate}
        </time>
      </header>

      {value.message && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {value.message}
        </p>
      )}

      <div className="mt-3 text-xs text-gray-500">
        Snapshot ID:{' '}
        <span className="font-mono text-gray-700">
          #{value.id}
        </span>
      </div>
    </section>
  );
}
