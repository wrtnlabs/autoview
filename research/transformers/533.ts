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



// Transform a `Schema.team_full` object into a visual AutoView component (a vertical card)
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // 1. Header: show team name, description, avatar, and member count badge
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: input.description ?? "No description provided",
        // show the organization avatar as a circle
        startElement: {
            type: "Avatar",
            src: input.organization.avatar_url,
            name: input.organization.login,
            size: 40,
            variant: "primary"
        },
        // show a badge with the members_count and a "users" icon
        endElement: {
            type: "Badge",
            count: input.members_count,
            maxCount: 999,
            showZero: true,
            color: "info",
            childrenProps: {
                type: "Icon",
                id: "users",
                color: "gray",
                size: 16
            }
        }
    };

    // 2. Content: list key properties in a data list
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Helper to push a labeled text pair
    const pushPair = (labelText: string, valueText: string) => {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: labelText },
            value: { type: "Text", content: valueText }
        });
    };

    pushPair("Team ID", String(input.id));
    pushPair("Permission", input.permission);
    if (input.privacy) pushPair("Privacy", input.privacy);
    if (input.notification_setting) pushPair("Notifications", input.notification_setting);
    pushPair("Repositories", String(input.repos_count));
    pushPair("Created At", new Date(input.created_at).toLocaleDateString());
    pushPair("Updated At", new Date(input.updated_at).toLocaleDateString());

    // build the DataList component
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };

    // 3. Footer: action buttons for navigating to team page and repos page
    const footerButtons: IAutoView.IAutoViewButtonProps[] = [
        {
            type: "Button",
            label: "View Team",
            href: input.html_url,
            variant: "contained",
            color: "primary",
            size: "medium"
        },
        {
            type: "Button",
            label: "View Repos",
            href: input.repositories_url,
            variant: "outlined",
            color: "secondary",
            size: "medium"
        }
    ];

    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerButtons
    };

    // 4. Assemble a vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
