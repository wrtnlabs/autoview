import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Org Hook
     *
     * @title Org Hook
    */
    export interface org_hook {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        name: string;
        events: string[];
        active: boolean;
        config: {
            url?: string;
            insecure_ssl?: string;
            content_type?: string;
            secret?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        type: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_hook;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived and formatted values
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  // Use config.url if present, otherwise fallback to the top‐level url
  const endpoint = value.config.url ?? value.url;

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-md mx-auto">
      {/* Header: Name and Active Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <div className="flex items-center space-x-1">
          {value.active ? (
            <LucideReact.CheckCircle className="text-green-500" size={20} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={20} />
          )}
          <span className={value.active ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
            {value.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Hook Type */}
      <div className="mt-3 flex items-center text-sm text-gray-600 space-x-2">
        <LucideReact.Tag className="text-gray-400" size={16} />
        <span className="truncate">{value.type}</span>
      </div>

      {/* Endpoint URL */}
      <div className="mt-3 flex items-center text-sm text-gray-600">
        <LucideReact.Link className="text-gray-400" size={16} />
        <a
          href={endpoint}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 truncate block max-w-full text-blue-600 hover:underline"
        >
          {endpoint}
        </a>
      </div>

      {/* Subscribed Events */}
      <div className="mt-3">
        <span className="text-sm font-medium text-gray-700">Subscribed Events:</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {value.events.map((event) => (
            <span
              key={event}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded truncate"
            >
              {event}
            </span>
          ))}
        </div>
      </div>

      {/* Config Details */}
      {(value.config.content_type || value.config.insecure_ssl != null) && (
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          {value.config.content_type && (
            <div className="flex items-center">
              <LucideReact.FileText className="text-gray-400" size={16} />
              <span className="ml-1">Content Type: {value.config.content_type}</span>
            </div>
          )}
          {value.config.insecure_ssl != null && (
            value.config.insecure_ssl === '1' ? (
              <div className="flex items-center">
                <LucideReact.AlertTriangle className="text-amber-500" size={16} />
                <span className="ml-1">Insecure SSL Enabled</span>
              </div>
            ) : (
              <div className="flex items-center">
                <LucideReact.Lock className="text-green-500" size={16} />
                <span className="ml-1">SSL Verified</span>
              </div>
            )
          )}
        </div>
      )}

      {/* Timestamps */}
      <div className="mt-4 text-sm text-gray-500 space-y-1">
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400" size={16} />
          <span className="ml-1">Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
