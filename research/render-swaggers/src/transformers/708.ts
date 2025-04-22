import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Combined Commit Status
     *
     * @title Combined Commit Status
    */
    export type combined_commit_status = {
        state: string;
        statuses: Schema.simple_commit_status[];
        sha: string;
        total_count: number & tags.Type<"int32">;
        repository: Schema.minimal_repository;
        commit_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
    };
    /**
     * @title Simple Commit Status
    */
    export type simple_commit_status = {
        description: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        context: string;
        target_url: (string & tags.Format<"uri">) | null;
        required?: boolean | null;
        avatar_url: (string & tags.Format<"uri">) | null;
        url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
type IAutoViewTransformerInputType = Schema.combined_commit_status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract repository and owner info for header
    const repo = input.repository;
    
    // Card header with repository full name, description, and owner avatar
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: repo.full_name,
        description: repo.description ?? "",
        startElement: {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            variant: "blue",
            size: 40,
        },
    };

    // Helper to map commit status state to an icon and color
    const mapStateToIcon = (
        state: string
    ): { id: string; color: IAutoView.IAutoViewIconProps["color"] } => {
        switch (state) {
            case "success":
                return { id: "check-circle", color: "green" };
            case "failure":
            case "error":
                return { id: "times-circle", color: "red" };
            case "pending":
                return { id: "clock", color: "orange" };
            case "queued":
                return { id: "hourglass", color: "gray" };
            default:
                return { id: "question-circle", color: "gray" };
        }
    };

    // Build a DataListItem for each simple_commit_status
    const statusItems: IAutoView.IAutoViewDataListItemProps[] = input.statuses.map(
        (status) => {
            const { id, color } = mapStateToIcon(status.state);
            return {
                type: "DataListItem",
                startElement: {
                    type: "Icon",
                    id,
                    color,
                    size: 20,
                },
                label: [
                    {
                        type: "Text",
                        content: status.context,
                        variant: "body1",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: status.description ?? "",
                        variant: "body2",
                        color: "secondary",
                    },
                ],
            };
        }
    );

    // DataList of commit statuses
    const statusesList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: statusItems,
    };

    // Card content including summary information and the statuses list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [
            // Short SHA and total count as inline text
            {
                type: "Text",
                content: [
                    "Commit SHA: ",
                    input.sha.slice(0, 7),
                ],
                variant: "body2",
                color: "tertiary",
            },
            {
                type: "Text",
                content: [
                    "Total statuses: ",
                    String(input.total_count),
                ],
                variant: "body2",
                color: "tertiary",
            },
            // Markdown link to the full commit URL
            {
                type: "Markdown",
                content: `[View commit details](${input.commit_url})`,
            },
            // The list of individual status items
            statusesList,
        ],
    };

    // Card footer with a button linking back to the repository page
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                label: ["Open Repository"],
                variant: "outlined",
                size: "small",
                color: "primary",
                href: repo.html_url,
            },
        ],
    };

    // Assemble everything into a vertical card for responsive, stacked layout
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
