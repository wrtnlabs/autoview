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
export type AutoViewInput = AutoViewInputSubTypes.issue_event[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to capitalize event names
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="divide-y divide-gray-200">
      {value.map((e, idx) => {
        // Derived display values
        const actorName = e.actor?.login || "Someone";
        const eventName = capitalize(e.event.replace(/_/g, " "));
        const issuePart = e.issue ? ` on issue #${e.issue.number}` : "";
        const commitPart = e.commit_id ? ` commit ${e.commit_id.slice(0, 7)}` : "";
        const assigneePart = e.assignee?.login ? ` assigned to ${e.assignee.login}` : "";
        const milestonePart = e.milestone?.title ? ` milestone "${e.milestone.title}"` : "";
        const projectPart = e.project_card
          ? ` moved card to "${e.project_card.column_name}"`
          : "";
        const renamePart = e.rename
          ? ` renamed from "${e.rename.from}" to "${e.rename.to}"`
          : "";
        const labelName = e.label?.name || "";
        const formattedDate = new Date(e.created_at).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={e.id ?? idx} className="flex items-start py-4 px-2">
            {e.actor?.avatar_url && (
              <img
                src={e.actor.avatar_url}
                alt={actorName}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-900">{actorName}</span>{" "}
                {eventName}
                {issuePart}
                {commitPart}
                {assigneePart}
                {milestonePart}
                {projectPart}
                {renamePart}.
                {labelName && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-1">
                    {labelName}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
