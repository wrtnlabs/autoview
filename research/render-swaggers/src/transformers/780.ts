import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Issue Event
     *
     * @title Issue Event
    */
    export type issue_event = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        actor: Schema.nullable_simple_user;
        event: string;
        commit_id: string | null;
        commit_url: string | null;
        created_at: string & tags.Format<"date-time">;
        issue?: Schema.nullable_issue;
        label?: Schema.issue_event_label;
        assignee?: Schema.nullable_simple_user;
        assigner?: Schema.nullable_simple_user;
        review_requester?: Schema.nullable_simple_user;
        requested_reviewer?: Schema.nullable_simple_user;
        requested_team?: Schema.team;
        dismissed_review?: Schema.issue_event_dismissed_review;
        milestone?: Schema.issue_event_milestone;
        project_card?: Schema.issue_event_project_card;
        rename?: Schema.issue_event_rename;
        author_association?: Schema.author_association;
        lock_reason?: string | null;
        performed_via_github_app?: Schema.nullable_integration;
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
        parent: Schema.nullable_team_simple;
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
type IAutoViewTransformerInputType = Schema.issue_event[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each GitHub issue event into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((event) => {
    // Build avatar element if actor exists
    const avatar = event.actor
      ? ({
          type: "Avatar",
          src: event.actor.avatar_url,
          name: event.actor.login,
          variant: "info",
          size: 24,
        } as IAutoView.IAutoViewAvatarProps)
      : undefined;

    // Text element for actor's login
    const actorText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: event.actor ? event.actor.login : "Unknown",
      variant: "body2",
    };

    // Text element for the event type
    const eventTypeText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: event.event,
      variant: "caption",
      color: "gray",
    };

    // Markdown element for the timestamp (bolded for emphasis)
    const timestamp = new Date(event.created_at).toLocaleString();
    const timestampMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**${timestamp}**`,
    };

    // Compose the label section: avatar + actor login + event type
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (avatar) labelComponents.push(avatar);
    labelComponents.push(actorText, eventTypeText);

    return {
      type: "DataListItem",
      label: labelComponents,
      value: timestampMarkdown,
    };
  });

  // Return the top-level DataList component
  return {
    type: "DataList",
    childrenProps: items,
  } as IAutoView.IAutoViewDataListProps;
}
