import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Thread
     *
     * @title Thread
    */
    export type thread = {
        id: string;
        repository: Schema.minimal_repository;
        subject: {
            title: string;
            url: string;
            latest_comment_url: string;
            type: string;
        };
        reason: string;
        unread: boolean;
        updated_at: string;
        last_read_at: string | null;
        url: string;
        subscription_url: string;
    };
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
}
type IAutoViewTransformerInputType = Schema.thread;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Determine styling based on unread flag
    const accentColor = input.unread ? "error" : "primary";

    // Build markdown content for thread links
    const markdownContent = [
        `**Subject Type:** ${input.subject.type}`,
        ``,
        `- [View Thread](${input.url})`,
        `- [Latest Comment](${input.subject.latest_comment_url})`
    ].join("\n");

    return {
        type: "VerticalCard",
        // Use a vertical card to encapsulate header, content, and actions
        childrenProps: [
            {
                type: "CardHeader",
                // Thread title and repository info
                title: input.subject.title,
                description: input.repository.full_name,
                // Show repository owner's avatar
                startElement: {
                    type: "Avatar",
                    src: input.repository.owner.avatar_url,
                    name: input.repository.owner.login,
                    size: 40,
                    variant: accentColor
                },
                // Show the reason as a chip
                endElement: {
                    type: "Chip",
                    label: input.reason,
                    variant: "outlined",
                    color: accentColor,
                    size: "small"
                }
            },
            {
                type: "CardContent",
                // Embed markdown for additional links and metadata
                childrenProps: [
                    {
                        type: "Markdown",
                        content: markdownContent
                    }
                ]
            },
            {
                type: "CardFooter",
                // Action buttons for opening thread and managing subscription
                childrenProps: [
                    {
                        type: "Button",
                        label: ["Open Thread"],
                        variant: "contained",
                        color: accentColor,
                        size: "medium",
                        href: input.url,
                        startElement: {
                            type: "Icon",
                            id: "external-link",
                            color: "gray",
                            size: 16
                        }
                    },
                    {
                        type: "Button",
                        label: ["Manage Subscription"],
                        variant: "outlined",
                        color: "gray",
                        size: "small",
                        href: input.subscription_url,
                        startElement: {
                            type: "Icon",
                            id: "bell",
                            color: "gray",
                            size: 16
                        }
                    }
                ]
            }
        ]
    };
}
