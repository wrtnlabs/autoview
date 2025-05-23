import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Project cards represent a scope of work.
     *
     * @title Project Card
    */
    export interface project_card {
        url: string & tags.Format<"uri">;
        /**
         * The project card's ID
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        note: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the card is archived
        */
        archived?: boolean;
        column_name?: string;
        project_id?: string;
        column_url: string & tags.Format<"uri">;
        content_url?: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.project_card[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const archivedCount = value.filter(card => card.archived).length;
  const activeCount = total - archivedCount;
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  const formatDateTime = (iso: string): string => {
    const d = new Date(iso);
    return `${formatDate(iso)} ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Project Cards Overview</h2>
        <div className="flex space-x-4 mt-2 sm:mt-0 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.Users size={16} className="mr-1 text-gray-500" aria-hidden="true" />
            <span>Total: {total}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.CheckCircle size={16} className="mr-1 text-green-500" aria-hidden="true" />
            <span>Active: {activeCount}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.XCircle size={16} className="mr-1 text-red-500" aria-hidden="true" />
            <span>Archived: {archivedCount}</span>
          </div>
        </div>
      </div>
      {total === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" aria-hidden="true" />
          <span>No project cards available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map(card => (
            <div key={card.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      card.creator?.avatar_url ??
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        card.creator?.login ?? 'User'
                      )}&background=0D8ABC&color=fff`
                    }
                    alt={card.creator?.login ?? 'User Avatar'}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        card.creator?.login ?? 'User'
                      )}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <span className="font-medium text-gray-800">
                    {card.creator?.login ?? 'Unknown'}
                  </span>
                </div>
                {card.archived && (
                  <LucideReact.Archive
                    size={16}
                    className="text-gray-500"
                    aria-label="Archived"
                  />
                )}
              </div>
              <p className="mt-2 text-gray-700 overflow-hidden line-clamp-2">
                {card.note ?? 'No description'}
              </p>
              <div className="mt-3 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
                  <span>{formatDate(card.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Clock size={16} className="mr-1" aria-hidden="true" />
                  <span>{formatDateTime(card.updated_at)}</span>
                </div>
                {card.column_name && (
                  <div className="flex items-center">
                    <LucideReact.Tag size={16} className="mr-1" aria-hidden="true" />
                    <span className="truncate max-w-xs">{card.column_name}</span>
                  </div>
                )}
                <div className="flex items-center w-full sm:w-auto">
                  <LucideReact.Link size={16} className="mr-1 text-gray-400" aria-hidden="true" />
                  <span className="truncate max-w-xs">{card.project_url}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  // 3. Return the React element.
}
