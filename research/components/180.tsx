import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export interface LegacyV4EventsView {
                    events?: AutoViewInputSubTypes.legacy.v4.LegacyV4Event[];
                    prev?: string;
                    next?: string;
                }
            }
        }
        export namespace v4 {
            export interface LegacyV4Event {
                userId?: string;
                id?: string;
                channelId?: string;
                name: string;
                property?: {
                    [key: string]: {};
                };
                createdAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
            }
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.legacy.open.v4.LegacyV4EventsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const events = value.events ?? [];
  const hasEvents = events.length > 0;
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : '';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Events</h2>
      {!hasEvents ? (
        <div className="flex flex-col items-center text-gray-500 py-12">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span>No events available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((evt, idx) => (
            <li key={idx} className="py-3 flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                {idx < events.length - 1 && (
                  <div className="flex-1 w-px bg-gray-200 mt-1"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-md font-medium text-gray-900 truncate">
                    {evt.name}
                  </span>
                  {evt.version !== undefined && (
                    <span className="text-sm text-gray-500">v{evt.version}</span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                  {evt.createdAt !== undefined && (
                    <div className="flex items-center">
                      <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
                      <span>{formatDate(evt.createdAt)}</span>
                    </div>
                  )}
                  {evt.expireAt !== undefined && (
                    <div className="flex items-center">
                      <LucideReact.Clock size={16} className="text-gray-400 mr-1" />
                      <span>Expires {formatDate(evt.expireAt)}</span>
                    </div>
                  )}
                </div>
                {evt.channelId && (
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
                    <span className="truncate">{evt.channelId}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {(value.prev || value.next) && (
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <LucideReact.ArrowLeft size={16} className="text-gray-400" />
            <span>{value.prev ?? '—'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{value.next ?? '—'}</span>
            <LucideReact.ArrowRight size={16} className="text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
}
