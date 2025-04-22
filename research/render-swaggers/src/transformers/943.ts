import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A software package
     *
     * @title Package
    */
    export type _package = {
        /**
         * Unique identifier of the package.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the package.
        */
        name: string;
        package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
        url: string;
        html_url: string;
        /**
         * The number of versions of the package.
        */
        version_count: number & tags.Type<"int32">;
        visibility: "private" | "public";
        owner?: Schema.nullable_simple_user;
        repository?: Schema.nullable_minimal_repository;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
     * Minimal Repository
     *
     * @title Minimal Repository
    */
    export type nullable_minimal_repository = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        full_name: string;
        owner: any;
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
        code_of_conduct?: any;
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
        security_and_analysis?: any;
    } | null;
    export type simple_user = any;
    export type code_of_conduct = any;
    export type security_and_analysis = any;
}
type IAutoViewTransformerInputType = Schema._package[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no packages, show a friendly message using markdown.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No packages available.**"
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Build a DataList where each item represents one package.
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((pkg) => {
        // 1. Label: optionally show the owner's avatar + package name as a bold markdown link.
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        if (pkg.owner && pkg.owner.avatar_url) {
            // Avatar for the owner
            labelComponents.push({
                type: "Avatar",
                src: pkg.owner.avatar_url,
                name: pkg.owner.login,
                variant: "primary",
                size: 24
            } as IAutoView.IAutoViewAvatarProps);
        }

        // Bold link to the package HTML URL
        const nameMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: `**[${pkg.name}](${pkg.html_url})**`
        };
        labelComponents.push(nameMarkdown);

        // 2. Value: show key metadata as chips + created/updated dates.
        // Chip for version count
        const chips: IAutoView.IAutoViewChipProps[] = [
            {
                type: "Chip",
                label: `${pkg.version_count} version${pkg.version_count === 1 ? "" : "s"}`,
                variant: "filled",
                color: "primary",
                size: "small"
            },
            // Chip for package type
            {
                type: "Chip",
                label: pkg.package_type,
                variant: "outlined",
                color: "teal",
                size: "small"
            },
            // Chip for visibility with color hint
            {
                type: "Chip",
                label: pkg.visibility,
                variant: "filled",
                color: pkg.visibility === "public" ? "green" : "gray",
                size: "small"
            }
        ];

        const chipGroup: IAutoView.IAutoViewChipGroupProps = {
            type: "ChipGroup",
            childrenProps: chips
        };

        // Markdown for creation and update dates (formatted to locale date)
        const created = new Date(pkg.created_at).toLocaleDateString();
        const updated = new Date(pkg.updated_at).toLocaleDateString();
        const dateMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: `**Created**: ${created}\n**Updated**: ${updated}`
        };

        // Compose the value section with the chip group first, then dates
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            chipGroup,
            dateMarkdown
        ];

        // Return the DataListItem for this package
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        } as IAutoView.IAutoViewDataListItemProps;
    });

    // Wrap all items in a DataList for responsive display
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    return dataList;
}
