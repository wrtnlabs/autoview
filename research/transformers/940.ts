import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A codespace.
     *
     * @title Codespace
    */
    export type codespace_with_full_repository = {
        id: number & tags.Type<"int32">;
        /**
         * Automatically generated name of this codespace.
        */
        name: string;
        /**
         * Display name for this codespace.
        */
        display_name?: string | null;
        /**
         * UUID identifying this codespace's environment.
        */
        environment_id: string | null;
        owner: Schema.simple_user;
        billable_owner: Schema.simple_user;
        repository: Schema.full_repository;
        machine: Schema.nullable_codespace_machine;
        /**
         * Path to devcontainer.json from repo root used to create Codespace.
        */
        devcontainer_path?: string | null;
        /**
         * Whether the codespace was created from a prebuild.
        */
        prebuild: boolean | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Last known time this codespace was started.
        */
        last_used_at: string;
        /**
         * State of this codespace.
        */
        state: "Unknown" | "Created" | "Queued" | "Provisioning" | "Available" | "Awaiting" | "Unavailable" | "Deleted" | "Moved" | "Shutdown" | "Archived" | "Starting" | "ShuttingDown" | "Failed" | "Exporting" | "Updating" | "Rebuilding";
        /**
         * API URL for this codespace.
        */
        url: string;
        /**
         * Details about the codespace's git repository.
        */
        git_status: {
            /**
             * The number of commits the local repository is ahead of the remote.
            */
            ahead?: number & tags.Type<"int32">;
            /**
             * The number of commits the local repository is behind the remote.
            */
            behind?: number & tags.Type<"int32">;
            /**
             * Whether the local repository has unpushed changes.
            */
            has_unpushed_changes?: boolean;
            /**
             * Whether the local repository has uncommitted changes.
            */
            has_uncommitted_changes?: boolean;
            /**
             * The current branch (or SHA if in detached HEAD state) of the local repository.
            */
            ref?: string;
        };
        /**
         * The initally assigned location of a new codespace.
        */
        location: "EastUs" | "SouthEastAsia" | "WestEurope" | "WestUs2";
        /**
         * The number of minutes of inactivity after which this codespace will be automatically stopped.
        */
        idle_timeout_minutes: (number & tags.Type<"int32">) | null;
        /**
         * URL to access this codespace on the web.
        */
        web_url: string;
        /**
         * API URL to access available alternate machine types for this codespace.
        */
        machines_url: string;
        /**
         * API URL to start this codespace.
        */
        start_url: string;
        /**
         * API URL to stop this codespace.
        */
        stop_url: string;
        /**
         * API URL to publish this codespace to a new repository.
        */
        publish_url?: (string & tags.Format<"uri">) | null;
        /**
         * API URL for the Pull Request associated with this codespace, if any.
        */
        pulls_url: (string & tags.Format<"uri">) | null;
        recent_folders: string[];
        runtime_constraints?: {
            /**
             * The privacy settings a user can select from when forwarding a port.
            */
            allowed_port_privacy_settings?: string[] | null;
        };
        /**
         * Whether or not a codespace has a pending async operation. This would mean that the codespace is temporarily unavailable. The only thing that you can do with a codespace in this state is delete it.
        */
        pending_operation?: boolean | null;
        /**
         * Text to show user when codespace is disabled by a pending operation
        */
        pending_operation_disabled_reason?: string | null;
        /**
         * Text to show user when codespace idle timeout minutes has been overriden by an organization policy
        */
        idle_timeout_notice?: string | null;
        /**
         * Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days).
        */
        retention_period_minutes?: (number & tags.Type<"int32">) | null;
        /**
         * When a codespace will be auto-deleted based on the "retention_period_minutes" and "last_used_at"
        */
        retention_expires_at?: (string & tags.Format<"date-time">) | null;
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
     * Full Repository
     *
     * @title Full Repository
    */
    export type full_repository = {
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
        git_url: string;
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
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size: number & tags.Type<"int32">;
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        is_template?: boolean;
        topics?: string[];
        has_issues: boolean;
        has_projects: boolean;
        has_wiki: boolean;
        has_pages: boolean;
        has_downloads?: boolean;
        has_discussions: boolean;
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string;
        pushed_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        permissions?: {
            admin: boolean;
            maintain?: boolean;
            push: boolean;
            triage?: boolean;
            pull: boolean;
        };
        allow_rebase_merge?: boolean;
        template_repository?: Schema.nullable_repository;
        temp_clone_token?: string | null;
        allow_squash_merge?: boolean;
        allow_auto_merge?: boolean;
        delete_branch_on_merge?: boolean;
        allow_merge_commit?: boolean;
        allow_update_branch?: boolean;
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         *   - `PR_TITLE` - default to the pull request's title.
         *   - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
        allow_forking?: boolean;
        web_commit_signoff_required?: boolean;
        subscribers_count: number & tags.Type<"int32">;
        network_count: number & tags.Type<"int32">;
        license: Schema.nullable_license_simple;
        organization?: Schema.nullable_simple_user;
        parent?: Schema.repository;
        source?: Schema.repository;
        forks: number & tags.Type<"int32">;
        master_branch?: string;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        /**
         * Whether anonymous git access is allowed.
        */
        anonymous_access_enabled?: boolean;
        code_of_conduct?: Schema.code_of_conduct_simple;
        security_and_analysis?: Schema.security_and_analysis;
        /**
         * The custom properties that were defined for the repository. The keys are the custom property names, and the values are the corresponding custom property values.
        */
        custom_properties?: {};
    };
    /**
     * A repository on GitHub.
     *
     * @title Repository
    */
    export type nullable_repository = {
        /**
         * Unique identifier of the repository
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        full_name: string;
        license: any;
        forks: number & tags.Type<"int32">;
        permissions?: {
            admin: boolean;
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
        };
        owner: any;
        /**
         * Whether the repository is private or public.
        */
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
        git_url: string;
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
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size: number & tags.Type<"int32">;
        /**
         * The default branch of the repository.
        */
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        /**
         * Whether this repository acts as a template that can be used to generate new repositories.
        */
        is_template?: boolean;
        topics?: string[];
        /**
         * Whether issues are enabled.
        */
        has_issues: boolean;
        /**
         * Whether projects are enabled.
        */
        has_projects: boolean;
        /**
         * Whether the wiki is enabled.
        */
        has_wiki: boolean;
        has_pages: boolean;
        /**
         * Whether downloads are enabled.
         *
         * @deprecated
        */
        has_downloads: boolean;
        /**
         * Whether discussions are enabled.
        */
        has_discussions?: boolean;
        /**
         * Whether the repository is archived.
        */
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string & tags.Default<"public">;
        pushed_at: (string & tags.Format<"date-time">) | null;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether to allow rebase merges for pull requests.
        */
        allow_rebase_merge?: boolean;
        temp_clone_token?: string;
        /**
         * Whether to allow squash merges for pull requests.
        */
        allow_squash_merge?: boolean;
        /**
         * Whether to allow Auto-merge to be used on pull requests.
        */
        allow_auto_merge?: boolean;
        /**
         * Whether to delete head branches when pull requests are merged
        */
        delete_branch_on_merge?: boolean;
        /**
         * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
        */
        allow_update_branch?: boolean;
        /**
         * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
         *
         * @deprecated
        */
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
        /**
         * Whether to allow merge commits for pull requests.
        */
        allow_merge_commit?: boolean;
        /**
         * Whether to allow forking this repo
        */
        allow_forking?: boolean;
        /**
         * Whether to require contributors to sign off on web-based commits
        */
        web_commit_signoff_required?: boolean;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
        starred_at?: string;
        /**
         * Whether anonymous git access is enabled for this repository
        */
        anonymous_access_enabled?: boolean;
    } | null;
    /**
     * License Simple
     *
     * @title License Simple
    */
    export type nullable_license_simple = {
        key: string;
        name: string;
        url: (string & tags.Format<"uri">) | null;
        spdx_id: string | null;
        node_id: string;
        html_url?: string & tags.Format<"uri">;
    } | null;
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
     * A repository on GitHub.
     *
     * @title Repository
    */
    export type repository = {
        /**
         * Unique identifier of the repository
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the repository.
        */
        name: string;
        full_name: string;
        license: Schema.nullable_license_simple;
        forks: number & tags.Type<"int32">;
        permissions?: {
            admin: boolean;
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
        };
        owner: Schema.simple_user;
        /**
         * Whether the repository is private or public.
        */
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
        git_url: string;
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
        ssh_url: string;
        stargazers_url: string & tags.Format<"uri">;
        statuses_url: string;
        subscribers_url: string & tags.Format<"uri">;
        subscription_url: string & tags.Format<"uri">;
        tags_url: string & tags.Format<"uri">;
        teams_url: string & tags.Format<"uri">;
        trees_url: string;
        clone_url: string;
        mirror_url: (string & tags.Format<"uri">) | null;
        hooks_url: string & tags.Format<"uri">;
        svn_url: string & tags.Format<"uri">;
        homepage: (string & tags.Format<"uri">) | null;
        language: string | null;
        forks_count: number & tags.Type<"int32">;
        stargazers_count: number & tags.Type<"int32">;
        watchers_count: number & tags.Type<"int32">;
        /**
         * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
        */
        size: number & tags.Type<"int32">;
        /**
         * The default branch of the repository.
        */
        default_branch: string;
        open_issues_count: number & tags.Type<"int32">;
        /**
         * Whether this repository acts as a template that can be used to generate new repositories.
        */
        is_template?: boolean;
        topics?: string[];
        /**
         * Whether issues are enabled.
        */
        has_issues: boolean;
        /**
         * Whether projects are enabled.
        */
        has_projects: boolean;
        /**
         * Whether the wiki is enabled.
        */
        has_wiki: boolean;
        has_pages: boolean;
        /**
         * Whether downloads are enabled.
         *
         * @deprecated
        */
        has_downloads: boolean;
        /**
         * Whether discussions are enabled.
        */
        has_discussions?: boolean;
        /**
         * Whether the repository is archived.
        */
        archived: boolean;
        /**
         * Returns whether or not this repository disabled.
        */
        disabled: boolean;
        /**
         * The repository visibility: public, private, or internal.
        */
        visibility?: string & tags.Default<"public">;
        pushed_at: (string & tags.Format<"date-time">) | null;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * Whether to allow rebase merges for pull requests.
        */
        allow_rebase_merge?: boolean;
        temp_clone_token?: string;
        /**
         * Whether to allow squash merges for pull requests.
        */
        allow_squash_merge?: boolean;
        /**
         * Whether to allow Auto-merge to be used on pull requests.
        */
        allow_auto_merge?: boolean;
        /**
         * Whether to delete head branches when pull requests are merged
        */
        delete_branch_on_merge?: boolean;
        /**
         * Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging.
        */
        allow_update_branch?: boolean;
        /**
         * Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead.
         *
         * @deprecated
        */
        use_squash_pr_title_as_default?: boolean;
        /**
         * The default value for a squash merge commit title:
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit).
        */
        squash_merge_commit_title?: "PR_TITLE" | "COMMIT_OR_PR_TITLE";
        /**
         * The default value for a squash merge commit message:
         *
         * - `PR_BODY` - default to the pull request's body.
         * - `COMMIT_MESSAGES` - default to the branch's commit messages.
         * - `BLANK` - default to a blank commit message.
        */
        squash_merge_commit_message?: "PR_BODY" | "COMMIT_MESSAGES" | "BLANK";
        /**
         * The default value for a merge commit title.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name).
        */
        merge_commit_title?: "PR_TITLE" | "MERGE_MESSAGE";
        /**
         * The default value for a merge commit message.
         *
         * - `PR_TITLE` - default to the pull request's title.
         * - `PR_BODY` - default to the pull request's body.
         * - `BLANK` - default to a blank commit message.
        */
        merge_commit_message?: "PR_BODY" | "PR_TITLE" | "BLANK";
        /**
         * Whether to allow merge commits for pull requests.
        */
        allow_merge_commit?: boolean;
        /**
         * Whether to allow forking this repo
        */
        allow_forking?: boolean;
        /**
         * Whether to require contributors to sign off on web-based commits
        */
        web_commit_signoff_required?: boolean;
        open_issues: number & tags.Type<"int32">;
        watchers: number & tags.Type<"int32">;
        master_branch?: string;
        starred_at?: string;
        /**
         * Whether anonymous git access is enabled for this repository
        */
        anonymous_access_enabled?: boolean;
    };
    /**
     * Code of Conduct Simple
     *
     * @title Code Of Conduct Simple
    */
    export type code_of_conduct_simple = {
        url: string & tags.Format<"uri">;
        key: string;
        name: string;
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
     * A description of the machine powering a codespace.
     *
     * @title Codespace machine
    */
    export type nullable_codespace_machine = {
        /**
         * The name of the machine.
        */
        name: string;
        /**
         * The display name of the machine includes cores, memory, and storage.
        */
        display_name: string;
        /**
         * The operating system of the machine.
        */
        operating_system: string;
        /**
         * How much storage is available to the codespace.
        */
        storage_in_bytes: number & tags.Type<"int32">;
        /**
         * How much memory is available to the codespace.
        */
        memory_in_bytes: number & tags.Type<"int32">;
        /**
         * How many cores are available to the codespace.
        */
        cpus: number & tags.Type<"int32">;
        /**
         * Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be "null" if prebuilds are not supported or prebuild availability could not be determined. Value will be "none" if no prebuild is available. Latest values "ready" and "in_progress" indicate the prebuild availability status.
        */
        prebuild_availability: "none" | "ready" | "in_progress" | null;
    } | null;
}
type IAutoViewTransformerInputType = Schema.codespace_with_full_repository;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map the codespace state to a visual color for the Chip component.
  const mapStateToColor = (state: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (state) {
      case "Available": return "green";
      case "Provisioning": return "cyan";
      case "Queued": return "yellow";
      case "Created": return "blue";
      case "Awaiting": return "orange";
      case "Unavailable": return "error";
      case "Deleted": return "darkGray";
      case "Failed": return "error";
      case "Shutdown": return "gray";
      case "ShuttingDown": return "orange";
      case "Starting": return "blue";
      case "Exporting":
      case "Updating":
      case "Rebuilding": return "secondary";
      default: return "gray";
    }
  };

  // Safely format an ISO date-time string into the user's locale.
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Build a list of key/value pairs for the codespace metadata.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "State" },
      value: {
        type: "Chip",
        label: input.state,
        variant: "filled",
        color: mapStateToColor(input.state),
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Machine" },
      value: {
        type: "Chip",
        label: input.machine?.display_name ?? "N/A",
        variant: "outlined",
        color: input.machine ? "teal" : "gray",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Owner" },
      value: {
        type: "Avatar",
        src: input.owner.avatar_url,
        name: input.owner.login,
        size: 32,
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Repository" },
      value: {
        type: "Button",
        label: "Open Repo",
        variant: "text",
        startElement: {
          type: "Icon",
          id: "github",
          size: 16,
        },
        href: input.repository.html_url,
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At" },
      value: {
        type: "Text",
        content: formatDate(input.created_at),
      },
    },
  ];

  // Compose a VerticalCard that contains:
  // 1) A header with the codespace name, environment, location, and owner avatar.
  // 2) A content section with a DataList of metadata items.
  // 3) A footer with action buttons to open the codespace or repository.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.display_name ?? input.name,
        description: `Env ID: ${input.environment_id ?? "N/A"} | Location: ${input.location}`,
        startElement: {
          type: "Avatar",
          src: input.owner.avatar_url,
          name: input.owner.login,
          size: 40,
        },
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
        ],
      },
      {
        type: "CardFooter",
        childrenProps: [
          {
            type: "Button",
            label: "Open Codespace",
            variant: "contained",
            color: "primary",
            startElement: {
              type: "Icon",
              id: "external-link-alt",
              size: 16,
            },
            href: input.web_url,
          },
          {
            type: "Button",
            label: "Open Repository",
            variant: "outlined",
            color: "secondary",
            startElement: {
              type: "Icon",
              id: "github",
              size: 16,
            },
            href: input.repository.html_url,
          },
        ],
      },
    ],
  };
}
