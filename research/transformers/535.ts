import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Full Team
    */
    export type team_full = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        html_url: string & tags.Format<"uri">;
        /**
         * Name of the team
        */
        name: string;
        slug: string;
        description: string | null;
        /**
         * The level of privacy this team should have
        */
        privacy?: "closed" | "secret";
        /**
         * The notification setting the team has set
        */
        notification_setting?: "notifications_enabled" | "notifications_disabled";
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent?: Schema.nullable_team_simple;
        members_count: number & tags.Type<"int32">;
        repos_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        organization: Schema.team_organization;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
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
     * Team Organization
     *
     * @title Team Organization
    */
    export type team_organization = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
        name?: string;
        company?: string;
        blog?: string & tags.Format<"uri">;
        location?: string;
        email?: string & tags.Format<"email">;
        twitter_username?: string | null;
        is_verified?: boolean;
        has_organization_projects: boolean;
        has_repository_projects: boolean;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        type: string;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        private_gists?: (number & tags.Type<"int32">) | null;
        disk_usage?: (number & tags.Type<"int32">) | null;
        collaborators?: (number & tags.Type<"int32">) | null;
        billing_email?: (string & tags.Format<"email">) | null;
        plan?: {
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
            filled_seats?: number & tags.Type<"int32">;
            seats?: number & tags.Type<"int32">;
        };
        default_repository_permission?: string | null;
        members_can_create_repositories?: boolean | null;
        two_factor_requirement_enabled?: boolean | null;
        members_allowed_repository_creation_type?: string;
        members_can_create_public_repositories?: boolean;
        members_can_create_private_repositories?: boolean;
        members_can_create_internal_repositories?: boolean;
        members_can_create_pages?: boolean;
        members_can_create_public_pages?: boolean;
        members_can_create_private_pages?: boolean;
        members_can_fork_private_repositories?: boolean | null;
        web_commit_signoff_required?: boolean;
        updated_at: string & tags.Format<"date-time">;
        archived_at: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.team_full;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract organization data for reuse
    const org = input.organization;

    // Compose the card header: show team name, description, and org avatar
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: input.description ?? "No description provided",
        startElement: {
            type: "Avatar",
            // Organization avatar as the leading image
            src: org.avatar_url,
            name: org.login,
            variant: "indigo",
            size: 40,
        },
    };

    // Utility to format ISO timestamps into a friendly date
    const formatDate = (iso: string): string =>
        new Date(iso).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    // Build a data list of key metrics and properties
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // 1) Members count with an icon badge
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Members",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Badge",
            count: input.members_count,
            maxCount: 999,
            color: "teal",
            childrenProps: {
                type: "Icon",
                id: "users",
                color: "teal",
                size: 16,
            },
        },
    });

    // 2) Repositories count
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Repositories",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Badge",
            count: input.repos_count,
            maxCount: 999,
            color: "blue",
            childrenProps: {
                type: "Icon",
                id: "book",
                color: "blue",
                size: 16,
            },
        },
    });

    // 3) Permission as a colored chip
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Permission",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Chip",
            label: input.permission,
            color: "success",
            size: "small",
            variant: "filled",
        },
    });

    // 4) Privacy setting (closed/secret) if present
    if (input.privacy) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Privacy",
                variant: "body2",
                color: "primary",
            },
            value: {
                type: "Chip",
                label: input.privacy,
                color: input.privacy === "secret" ? "error" : "secondary",
                size: "small",
                variant: "outlined",
            },
        });
    }

    // 5) Creation and update timestamps using Markdown for emphasis
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Created",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Markdown",
            content: `**${formatDate(input.created_at)}**`,
        },
    });
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Updated",
            variant: "body2",
            color: "primary",
        },
        value: {
            type: "Markdown",
            content: `**${formatDate(input.updated_at)}**`,
        },
    });

    // Wrap the list items into a DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Compose the main card content
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Optionally, a footer could host links (e.g., to GitHub pages), but omitted for brevity

    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
