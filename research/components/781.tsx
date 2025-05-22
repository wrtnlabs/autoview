import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Issue Event
     *
     * @title Issue Event
    */
    export type issue_event = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        actor: AutoViewInputSubTypes.nullable_simple_user;
        event: string;
        commit_id: string | null;
        commit_url: string | null;
        created_at: string & tags.Format<"date-time">;
        issue?: AutoViewInputSubTypes.nullable_issue;
        label?: AutoViewInputSubTypes.issue_event_label;
        assignee?: AutoViewInputSubTypes.nullable_simple_user;
        assigner?: AutoViewInputSubTypes.nullable_simple_user;
        review_requester?: AutoViewInputSubTypes.nullable_simple_user;
        requested_reviewer?: AutoViewInputSubTypes.nullable_simple_user;
        requested_team?: AutoViewInputSubTypes.team;
        dismissed_review?: AutoViewInputSubTypes.issue_event_dismissed_review;
        milestone?: AutoViewInputSubTypes.issue_event_milestone;
        project_card?: AutoViewInputSubTypes.issue_event_project_card;
        rename?: AutoViewInputSubTypes.issue_event_rename;
        author_association?: AutoViewInputSubTypes.author_association;
        lock_reason?: string | null;
        performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    };
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
    /**
     * Issues are a great way to keep track of tasks, enhancements, and bugs for your projects.
     *
     * @title Issue
    */
    export type nullable_issue = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the issue
        */
        url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        labels_url: string;
        comments_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        /**
         * Number uniquely identifying the issue within its repository
        */
        number: number & tags.Type<"int32">;
        /**
         * State of the issue; either 'open' or 'closed'
        */
        state: string;
        /**
         * The reason for the current state
        */
        state_reason?: "completed" | "reopened" | "not_planned" | null;
        /**
         * Title of the issue
        */
        title: string;
        /**
         * Contents of the issue
        */
        body?: string | null;
        user: any;
        /**
         * Labels to associate with this issue; pass one or more label names to replace the set of labels on this issue; send an empty array to clear all labels from the issue; note that the labels are silently dropped for users without push access to the repository
        */
        labels: (string | {
            id?: number & tags.Type<"int32">;
            node_id?: string;
            url?: string & tags.Format<"uri">;
            name?: string;
            description?: string | null;
            color?: string | null;
            "default"?: boolean;
        })[];
        assignee: any;
        assignees?: any[] | null;
        milestone: any;
        locked: boolean;
        active_lock_reason?: string | null;
        comments: number & tags.Type<"int32">;
        pull_request?: {
            merged_at?: (string & tags.Format<"date-time">) | null;
            diff_url: (string & tags.Format<"uri">) | null;
            html_url: (string & tags.Format<"uri">) | null;
            patch_url: (string & tags.Format<"uri">) | null;
            url: (string & tags.Format<"uri">) | null;
        };
        closed_at: (string & tags.Format<"date-time">) | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        draft?: boolean;
        closed_by?: any;
        body_html?: string;
        body_text?: string;
        timeline_url?: string & tags.Format<"uri">;
        type?: any;
        repository?: any;
        performed_via_github_app?: any;
        author_association: any;
        reactions?: any;
        sub_issues_summary?: any;
    } | null;
    export type simple_user = any;
    export type nullable_milestone = any;
    export type issue_type = any;
    export type repository = any;
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    export type reaction_rollup = any;
    export type sub_issues_summary = any;
    /**
     * Issue Event Label
     *
     * @title Issue Event Label
    */
    export type issue_event_label = {
        name: string | null;
        color: string | null;
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export type team = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: AutoViewInputSubTypes.nullable_team_simple;
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type nullable_team_simple = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string & tags.Format<"uri">;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    } | null;
    /**
     * @title Issue Event Dismissed Review
    */
    export type issue_event_dismissed_review = {
        state: string;
        review_id: number & tags.Type<"int32">;
        dismissal_message: string | null;
        dismissal_commit_id?: string | null;
    };
    /**
     * Issue Event Milestone
     *
     * @title Issue Event Milestone
    */
    export type issue_event_milestone = {
        title: string;
    };
    /**
     * Issue Event Project Card
     *
     * @title Issue Event Project Card
    */
    export type issue_event_project_card = {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        project_url: string & tags.Format<"uri">;
        project_id: number & tags.Type<"int32">;
        column_name: string;
        previous_column_name?: string;
    };
    /**
     * Issue Event Rename
     *
     * @title Issue Event Rename
    */
    export type issue_event_rename = {
        from: string;
        to: string;
    };
    export type enterprise = any;
}
export type AutoViewInput = AutoViewInputSubTypes.issue_event;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation / derived values
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const actorLogin = value.actor?.login ?? "Unknown user";
  const actorAvatar = value.actor?.avatar_url;
  const eventType = value.event.replace(/_/g, " ");

  // Build a list of detail items based on available event properties
  const detailItems: { key: string; node: React.ReactNode }[] = [];

  if (value.commit_id && value.commit_url) {
    detailItems.push({
      key: "commit",
      node: (
        <a
          href={value.commit_url}
          className="text-blue-600 hover:underline truncate"
          title={value.commit_id}
        >
          {value.commit_id.substring(0, 7)}
        </a>
      ),
    });
  }

  if (value.label?.name) {
    detailItems.push({
      key: "label",
      node: (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-blue-100 text-blue-800">
          {value.label.name}
        </span>
      ),
    });
  }

  if (value.assignee?.login) {
    detailItems.push({
      key: "assignee",
      node: (
        <span>
          Assigned to{" "}
          <span className="font-semibold">{value.assignee.login}</span>
        </span>
      ),
    });
  }

  if (value.milestone?.title) {
    detailItems.push({
      key: "milestone",
      node: (
        <span>
          Milestone:{" "}
          <span className="font-semibold">{value.milestone.title}</span>
        </span>
      ),
    });
  }

  if (value.rename) {
    detailItems.push({
      key: "rename",
      node: (
        <span>
          Renamed from{" "}
          <span className="font-semibold">{value.rename.from}</span> to{" "}
          <span className="font-semibold">{value.rename.to}</span>
        </span>
      ),
    });
  }

  if (value.dismissed_review) {
    detailItems.push({
      key: "dismissed_review",
      node: (
        <span>
          Review dismissed:{" "}
          <span className="italic">
            {value.dismissed_review.dismissal_message ?? "No message"}
          </span>
        </span>
      ),
    });
  }

  if (value.project_card?.column_name && value.project_card.project_url) {
    detailItems.push({
      key: "project_card",
      node: (
        <a
          href={value.project_card.project_url}
          className="text-blue-600 hover:underline truncate"
        >
          {value.project_card.column_name}
        </a>
      ),
    });
  }

  if (value.requested_reviewer?.login) {
    detailItems.push({
      key: "requested_reviewer",
      node: (
        <span>
          Review requested from{" "}
          <span className="font-semibold">
            {value.requested_reviewer.login}
          </span>
        </span>
      ),
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex items-start space-x-4 max-w-full">
      {actorAvatar && (
        <img
          src={actorAvatar}
          alt={`${actorLogin} avatar`}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            <span className="font-semibold">{actorLogin}</span>{" "}
            <span className="capitalize">{eventType}</span>
          </h4>
          <time
            dateTime={value.created_at}
            className="text-xs text-gray-500 ml-2 whitespace-nowrap"
          >
            {formattedDate}
          </time>
        </div>
        {detailItems.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700">
            {detailItems.map((item) => (
              <React.Fragment key={item.key}>{item.node}</React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
