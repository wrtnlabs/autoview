import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface EventView {
        event?: AutoViewInputSubTypes.Event;
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
export type AutoViewInput = AutoViewInputSubTypes.EventView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const event = value.event;
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <LucideReact.AlertCircle size={24} className="text-gray-400" />
        <span className="mt-2 text-gray-500">No event data available</span>
      </div>
    );
  }

  const createdDate = event.createdAt
    ? new Date(event.createdAt).toLocaleString()
    : "N/A";
  const expireDate = event.expireAt
    ? new Date(event.expireAt).toLocaleString()
    : "N/A";
  const managed = Boolean(event.managed);
  const propertyCount = event.property
    ? Object.keys(event.property).length
    : 0;
  const i18nCount = event.nameI18nMap
    ? Object.keys(event.nameI18nMap).length
    : 0;
  const versionDisplay = event.version !== undefined
    ? event.version
    : "N/A";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {event.name}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Expires: {expireDate}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          {managed ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span>{managed ? "Managed" : "Unmanaged"}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-500" />
          <span>Properties: {propertyCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Globe size={16} className="text-gray-500" />
          <span>Translations: {i18nCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Version: {versionDisplay}</span>
        </div>
      </div>
    </div>
  );
}
