import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit
     *
     * @title Commit
    */
    export interface commit {
        url: string & tags.Format<"uri">;
        sha: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        comments_url: string & tags.Format<"uri">;
        commit: {
            url: string & tags.Format<"uri">;
            author: AutoViewInputSubTypes.nullable_git_user;
            committer: AutoViewInputSubTypes.nullable_git_user;
            message: string;
            comment_count: number & tags.Type<"int32">;
            tree: {
                sha: string;
                url: string & tags.Format<"uri">;
            };
            verification?: AutoViewInputSubTypes.verification;
        };
        author: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.empty_object | null;
        committer: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.empty_object | null;
        parents: {
            sha: string;
            url: string & tags.Format<"uri">;
            html_url?: string & tags.Format<"uri">;
        }[];
        stats?: {
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
            total?: number & tags.Type<"int32">;
        };
        files?: AutoViewInputSubTypes.diff_entry[];
    }
    /**
     * Metaproperties for Git author/committer information.
     *
     * @title Git User
    */
    export type nullable_git_user = {
        name?: string;
        email?: string;
        date?: string;
    } | null;
    /**
     * @title Verification
    */
    export interface verification {
        verified: boolean;
        reason: string;
        payload: string | null;
        signature: string | null;
        verified_at: string | null;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export interface empty_object {
    }
    /**
     * Diff Entry
     *
     * @title Diff Entry
    */
    export interface diff_entry {
        sha: string;
        filename: string;
        status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
        additions: number & tags.Type<"int32">;
        deletions: number & tags.Type<"int32">;
        changes: number & tags.Type<"int32">;
        blob_url: string & tags.Format<"uri">;
        raw_url: string & tags.Format<"uri">;
        contents_url: string & tags.Format<"uri">;
        patch?: string;
        previous_filename?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.commit;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const nested = value.commit;
  const gitAuthor = nested.author;
  const authorName =
    gitAuthor?.name ??
    (value.author && "login" in value.author ? value.author.login : undefined) ??
    "Unknown Author";
  const isoDate = gitAuthor?.date;
  const formattedDate = isoDate
    ? new Date(isoDate).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const shortSha = value.sha.slice(0, 7);
  const parentsCount = value.parents.length;
  const filesCount = value.files?.length ?? 0;
  const additions = value.stats?.additions ?? 0;
  const deletions = value.stats?.deletions ?? 0;
  const totalChanges = value.stats?.total ?? additions + deletions;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
      {/* Commit message */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {nested.message}
        </h2>
      </div>

      {/* Top metadata row */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.User size={16} aria-hidden={true} />
          <span>{authorName}</span>
        </div>
        {formattedDate && (
          <div className="flex items-center gap-1">
            <LucideReact.Calendar size={16} aria-hidden={true} />
            <time dateTime={isoDate}>{formattedDate}</time>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.GitCommit size={16} aria-hidden={true} />
          <span className="font-mono">{shortSha}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
        {filesCount > 0 && (
          <div className="flex items-center gap-1">
            <LucideReact.File size={16} aria-hidden={true} />
            <span>
              {filesCount} file{filesCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Plus
            size={16}
            className="text-green-500"
            aria-hidden={true}
          />
          <span>{additions}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Minus
            size={16}
            className="text-red-500"
            aria-hidden={true}
          />
          <span>{deletions}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.BarChart2 size={16} aria-hidden={true} />
          <span>
            {totalChanges} change{totalChanges !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Parents info */}
      {parentsCount > 0 && (
        <div className="flex items-center text-sm text-gray-500 gap-1">
          <LucideReact.GitBranch size={16} aria-hidden={true} />
          <span>
            {parentsCount} parent{parentsCount > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}
