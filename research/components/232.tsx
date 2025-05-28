import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface EventsView {
        prev?: string;
        next?: string;
        events?: AutoViewInputSubTypes.Event[];
    }
    export interface Event {
        userId?: string;
        id?: string;
        channelId?: string;
        name: string;
        property?: {
            [key: string]: {};
        };
        createdAt?: number;
        expireAt?: number;
        managed?: boolean;
        version?: number & tags.Type<"int32">;
        nameI18nMap?: {
            [key: string]: string;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.EventsView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const events: AutoViewInputSubTypes.Event[] = value.events ?? [];
  const formatDate = (timestamp?: number): string =>
    timestamp
      ? new Date(timestamp).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.List size={20} className="text-gray-500" />
        <span>Events</span>
      </h2>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 py-10">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No events available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((evt, idx) => {
            const propCount = evt.property ? Object.keys(evt.property).length : 0;
            const i18nCount = evt.nameI18nMap
              ? Object.keys(evt.nameI18nMap).length
              : 0;

            return (
              <li
                key={idx}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-md font-medium text-gray-900 truncate">
                    {evt.name}
                  </h3>
                  {evt.managed && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Managed"
                    />
                  )}
                </div>

                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar
                      size={16}
                      className="text-gray-400"
                    />
                    <span>Created: {formatDate(evt.createdAt)}</span>
                  </div>

                  {evt.expireAt && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                      />
                      <span>Expires: {formatDate(evt.expireAt)}</span>
                    </div>
                  )}

                  {evt.version !== undefined && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Hash size={16} className="text-gray-400" />
                      <span>Version: {evt.version}</span>
                    </div>
                  )}

                  {(propCount > 0 || i18nCount > 0) && (
                    <div className="flex items-center gap-4 mt-1">
                      {propCount > 0 && (
                        <div className="flex items-center gap-1">
                          <LucideReact.Columns
                            size={16}
                            className="text-gray-400"
                          />
                          <span>
                            {propCount} propert
                            {propCount > 1 ? "ies" : "y"}
                          </span>
                        </div>
                      )}
                      {i18nCount > 0 && (
                        <div className="flex items-center gap-1">
                          <LucideReact.Globe
                            size={16}
                            className="text-gray-400"
                          />
                          <span>
                            {i18nCount} translation
                            {i18nCount > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
