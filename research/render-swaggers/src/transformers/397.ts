import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsRunnerGroupsRepositories {
        export type GetResponse = {
            total_count: number;
            repositories: Schema.minimal_repository[];
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsRunnerGroupsRepositories.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no repositories, show a friendly markdown message
    if (input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "## No Repositories Found\nThe organization has no repositories to display."
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Map each repository to a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.repositories.map(repo => {
        // Owner avatar (clickable item icon)
        const ownerAvatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary",
        };

        // Fallback description
        const descriptionText = repo.description ?? "No description provided.";

        // Star count chip
        const starsChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `${repo.stargazers_count ?? 0} ★`,
            variant: "outlined",
            color: "yellow",
            size: "small",
        };

        // Fork count chip
        const forksChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `${repo.forks_count ?? 0} 🍴`,
            variant: "outlined",
            color: "green",
            size: "small",
        };

        // Topic chips (if any)
        const topicChips: IAutoView.IAutoViewChipProps[] = (repo.topics ?? []).map(topic => ({
            type: "Chip",
            label: topic,
            variant: "filled",
            color: "blue",
            size: "small",
        }));

        // "View" button linking to the GitHub repository
        const viewButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "View",
            variant: "text",
            color: "primary",
            size: "small",
            href: repo.html_url,
        };

        // Compose the ListItemProps
        return {
            type: "ListItem",
            title: repo.full_name,
            description: descriptionText,
            // on small screens the avatar helps quick identification
            startElement: ownerAvatar,
            // badges and actions on the right side
            endElement: [
                starsChip,
                forksChip,
                ...topicChips,
                viewButton
            ],
            // Make the entire item clickable
            href: repo.html_url,
        } as IAutoView.IAutoViewListItemProps;
    });

    // Wrap all items in a responsive List component
    const list: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: listItems
    };

    return list as IAutoView.IAutoViewComponentProps;
}
