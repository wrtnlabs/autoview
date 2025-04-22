import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A suite of checks performed on the code of a given code change
     *
     * @title CheckSuite
    */
    export type check_suite = {
        id: number & tags.Type<"int32">;
        node_id: string;
        head_branch: string | null;
        /**
         * The SHA of the head commit that is being checked.
        */
        head_sha: string;
        /**
         * The phase of the lifecycle that the check suite is currently in. Statuses of waiting, requested, and pending are reserved for GitHub Actions check suites.
        */
        status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending" | null;
        conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | "startup_failure" | "stale" | null;
        url: string | null;
        before: string | null;
        after: string | null;
        pull_requests: any[] | null;
        app: Schema.nullable_integration;
        repository: Schema.minimal_repository;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        head_commit: Schema.simple_commit;
        latest_check_runs_count: number & tags.Type<"int32">;
        check_runs_url: string;
        rerequestable?: boolean;
        runs_rerequestable?: boolean;
    };
    export type pull_request_minimal = any;
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
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
    export type enterprise = any;
    /**
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export type minimal_repository = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: Schema.simple_user;
        "private": boolean;
        html_url: string & tags.Format<"uri">;
        description: string | null;
        fork: boolean;
        url: string & tags.Format<"uri">;
        archive_url: string;
        assignees_url: string;
        blobs_url: string;
        branches_url: string;
        collaborators_url: string;
        comments_url: string;
        commits_url: string;
        compare_url: string;
        contents_url: string;
        contributors_url: string & tags.Format<"uri">;
        deployments_url: string & tags.Format<"uri">;
        downloads_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        git_commits_url: string;
        git_refs_url: string;
        git_tags_url: string;
        git_url?: string;
        issue_comment_url: string;
        issue_events_url: string;
        issues_url: string;
        keys_url: string;
        labels_url: string;
        languages_url: string & tags.Format<"uri">;
        merges_url: string & tags.Format<"uri">;
        milestones_url: string;
        notifications_url: string;
        pulls_url: string;
        releases_url: string;
        ssh_url?: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url?: string;
        mirror_url?: string | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url?: string;
        homepage?: string | null;
        language?: string | null;
        forks_count?: number & tags.Type<"int32">;
        stargazers_count?: number & tags.Type<"int32">;
        watchers_count?: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size?: number & tags.Type<"int32">;
        default_branch?: string;
        open_issues_count?: number & tags.Type<"int32">;
        is_template?: boolean;
        topics?: string[];
        has_issues?: boolean;
        has_projects?: boolean;
        has_wiki?: boolean;
        has_pages?: boolean;
        has_downloads?: boolean;
        has_discussions?: boolean;
        archived?: boolean;
        disabled?: boolean;
        visibility?: string;
        pushed_at?: (string & tags.Format<"date-time">) | null;
        created_at?: (string & tags.Format<"date-time">) | null;
        updated_at?: (string & tags.Format<"date-time">) | null;
        permissions?: {
            admin?: boolean;
            maintain?: boolean;
            push?: boolean;
            triage?: boolean;
            pull?: boolean;
        };
        role_name?: string;
        temp_clone_token?: string;
        delete_branch_on_merge?: boolean;
        subscribers_count?: number & tags.Type<"int32">;
        network_count?: number & tags.Type<"int32">;
        code_of_conduct?: Schema.code_of_conduct;
        license?: {
            key?: string;
            name?: string;
            spdx_id?: string;
            url?: string;
            node_id?: string;
        } | null;
        forks?: number & tags.Type<"int32">;
        open_issues?: number & tags.Type<"int32">;
        watchers?: number & tags.Type<"int32">;
        allow_forking?: boolean;
        web_commit_signoff_required?: boolean;
        security_and_analysis?: Schema.security_and_analysis;
    };
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
    export type security_and_analysis = {
        advanced_security?: {
            status?: "enabled" | "disabled";
        };
        code_security?: {
            status?: "enabled" | "disabled";
        };
        /**
         * Enable or disable Dependabot security updates for the repository.
        */
        dependabot_security_updates?: {
            /**
             * The enablement status of Dependabot security updates for the repository.
            */
            status?: "enabled" | "disabled";
        };
        secret_scanning?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_push_protection?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_non_provider_patterns?: {
            status?: "enabled" | "disabled";
        };
        secret_scanning_ai_detection?: {
            status?: "enabled" | "disabled";
        };
    } | null;
    /**
     * A commit.
     *
     * @title Simple Commit
    */
    export type simple_commit = {
        /**
         * SHA for the commit
        */
        id: string;
        /**
         * SHA for the commit's tree
        */
        tree_id: string;
        /**
         * Message describing the purpose of the commit
        */
        message: string;
        /**
         * Timestamp of the commit
        */
        timestamp: string;
        /**
         * Information about the Git author
        */
        author: {
            /**
             * Name of the commit's author
            */
            name: string;
            /**
             * Git email address of the commit's author
            */
            email: string & tags.Format<"email">;
        } | null;
        /**
         * Information about the Git committer
        */
        committer: {
            /**
             * Name of the commit's committer
            */
            name: string;
            /**
             * Git email address of the commit's committer
            */
            email: string & tags.Format<"email">;
        } | null;
    };
}
type IAutoViewTransformerInputType = Schema.check_suite;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: map status and conclusion to an icon representation
    const statusIcon: IAutoView.IAutoViewIconProps = (() => {
        if (input.status === "queued") {
            return { type: "Icon", id: "hourglass-start", color: "gray", size: 20 };
        }
        if (input.status === "in_progress") {
            // spinner from FontAwesome solid
            return { type: "Icon", id: "spinner", color: "blue", size: 20 };
        }
        if (input.status === "completed") {
            switch (input.conclusion) {
                case "success":
                    return { type: "Icon", id: "check-circle", color: "green", size: 20 };
                case "failure":
                case "timed_out":
                case "cancelled":
                case "action_required":
                    return { type: "Icon", id: "times-circle", color: "red", size: 20 };
                default:
                    return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
            }
        }
        // fallback unknown status
        return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
    })();

    // Helper: format date-time or show N/A
    const fmtDate = (raw: string | null | undefined): string =>
        raw ? new Date(raw).toLocaleString() : "N/A";

    // Build a list of key-value pairs to display
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Branch" },
            value: {
                type: "Chip",
                label: input.head_branch ?? "N/A",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Commit SHA" },
            value: {
                type: "Text",
                variant: "body2",
                content: input.head_sha.slice(0, 7),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Message" },
            // Use markdown to allow code formatting or wrapping
            value: {
                type: "Markdown",
                content: `\`\`\`\n${input.head_commit.message}\n\`\`\``,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Author" },
            value: {
                type: "Text",
                variant: "body2",
                content: input.head_commit.author?.name ?? "Unknown",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Created At" },
            value: {
                type: "Text",
                variant: "body2",
                content: fmtDate(input.created_at),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Updated At" },
            value: {
                type: "Text",
                variant: "body2",
                content: fmtDate(input.updated_at),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Check Runs" },
            value: {
                type: "Badge",
                count: input.latest_check_runs_count,
                maxCount: 999,
                showZero: true,
                childrenProps: { type: "Icon", id: "tasks", color: "gray", size: 16 },
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", variant: "subtitle2", content: "Conclusion" },
            value: {
                type: "Chip",
                label: input.conclusion ?? "N/A",
                variant: "outlined",
                color:
                    input.conclusion === "success"
                        ? "green"
                        : input.conclusion === "failure"
                        ? "red"
                        : "gray",
                size: "small",
            },
        },
    ];

    // Compose the vertical card UI
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            // Header with repo owner avatar and status icon
            {
                type: "CardHeader",
                title: `Check Suite #${input.id}`,
                description: input.repository.full_name,
                startElement: {
                    type: "Avatar",
                    src: input.repository.owner.avatar_url,
                    name: input.repository.owner.login,
                    size: 32,
                },
                endElement: statusIcon,
            },
            // Content: DataList of details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            // Footer: link back to GitHub
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View on GitHub",
                    variant: "text",
                    color: "primary",
                    startElement: {
                        type: "Icon",
                        id: "github",
                        color: "gray",
                        size: 16,
                    },
                    href: input.repository.html_url,
                },
            },
        ],
    };

    return card;
}
