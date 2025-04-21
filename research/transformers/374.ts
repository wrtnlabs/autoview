import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization Full
     *
     * @title Organization Full
    */
    export type organization_full = {
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
        type: string;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        private_gists?: (number & tags.Type<"int32">) | null;
        disk_usage?: (number & tags.Type<"int32">) | null;
        /**
         * The number of collaborators on private repositories.
         *
         * This field may be null if the number of private repositories is over 50,000.
        */
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
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether GitHub Advanced Security is enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        advanced_security_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether Dependabot alerts are automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependabot_alerts_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether Dependabot security updates are automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependabot_security_updates_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether dependency graph is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        dependency_graph_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether secret scanning is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        secret_scanning_enabled_for_new_repositories?: boolean;
        /**
         * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
         *
         * Whether secret scanning push protection is automatically enabled for new repositories and repositories transferred to this organization.
         *
         * This field is only visible to organization owners or members of a team with the security manager role.
         *
         * @deprecated
        */
        secret_scanning_push_protection_enabled_for_new_repositories?: boolean;
        /**
         * Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection.
        */
        secret_scanning_push_protection_custom_link_enabled?: boolean;
        /**
         * An optional URL string to display to contributors who are blocked from pushing a secret.
        */
        secret_scanning_push_protection_custom_link?: string | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        archived_at: (string & tags.Format<"date-time">) | null;
        /**
         * Controls whether or not deploy keys may be added and used for repositories in the organization.
        */
        deploy_keys_enabled_for_repositories?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.organization_full;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // 1. Build the card header with avatar, title (name or login), and description.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name ?? input.login,
        description: input.description ?? undefined,
        startElement: {
            type: "Avatar",
            src: input.avatar_url,
            name: input.login,
            size: 40,
            variant: "primary",
        },
    };

    // 2. Build a statistics list: repos, gists, followers, following.
    //    Each item uses an icon + label on the left, and a count on the right.
    const statsItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Helper to push a stat row
    function pushStat(iconId: string, label: string, value: string | number) {
        statsItems.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: iconId, size: 16, color: "gray" },
                { type: "Text", content: [label], variant: "body2" },
            ],
            value: { type: "Text", content: [String(value)], variant: "body2" },
        });
    }

    pushStat("book", "Repos", input.public_repos);
    pushStat("file", "Gists", input.public_gists);
    pushStat("users", "Followers", input.followers);
    pushStat("user-friends", "Following", input.following);

    const statsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: statsItems,
    };

    // 3. Build chips for optional metadata: company, location, email, twitter.
    const chips: IAutoView.IAutoViewChipProps[] = [];

    if (input.company) {
        chips.push({
            type: "Chip",
            label: input.company,
            startElement: { type: "Icon", id: "building", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.location) {
        chips.push({
            type: "Chip",
            label: input.location,
            startElement: { type: "Icon", id: "map-marker-alt", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.email) {
        chips.push({
            type: "Chip",
            label: input.email,
            startElement: { type: "Icon", id: "envelope", size: 12, color: "gray" },
            variant: "outlined",
            size: "small",
        });
    }
    if (input.twitter_username) {
        chips.push({
            type: "Chip",
            label: `@${input.twitter_username}`,
            startElement: { type: "Icon", id: "twitter", size: 12, color: "blue" },
            variant: "outlined",
            size: "small",
        });
    }

    // If we have any chips, wrap them in a ChipGroup
    const chipGroup: IAutoView.IAutoViewChipGroupProps | null =
        chips.length > 0
            ? {
                  type: "ChipGroup",
                  childrenProps: chips,
              }
            : null;

    // 4. Build call-to-action buttons: GitHub profile, personal website, Twitter.
    const buttons: IAutoView.IAutoViewButtonProps[] = [];

    // GitHub profile
    buttons.push({
        type: "Button",
        label: "GitHub",
        href: input.html_url,
        startElement: { type: "Icon", id: "github", size: 16, color: "gray" },
    });
    // Personal website / blog
    if (input.blog) {
        buttons.push({
            type: "Button",
            label: "Website",
            href: input.blog,
            startElement: { type: "Icon", id: "globe", size: 16, color: "gray" },
        });
    }
    // Twitter link
    if (input.twitter_username) {
        buttons.push({
            type: "Button",
            label: "Twitter",
            href: `https://twitter.com/${input.twitter_username}`,
            startElement: { type: "Icon", id: "twitter", size: 16, color: "blue" },
        });
    }

    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: buttons,
    };

    // 5. Compose all parts into a responsive vertical card.
    const children: Array<
        | IAutoView.IAutoViewCardHeaderProps
        | IAutoView.IAutoViewCardContentProps
        | IAutoView.IAutoViewCardFooterProps
    > = [
        header,
        {
            type: "CardContent",
            // Include the stats list and optionally the chip group
            childrenProps: chipGroup ? [statsList, chipGroup] : [statsList],
        },
        footer,
    ];

    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
