import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Minimal representation of an organization programmatic access grant request for enumerations
     *
     * @title Simple Organization Programmatic Access Grant Request
    */
    export type organization_programmatic_access_grant_request = {
        /**
         * Unique identifier of the request for access via fine-grained personal access token. The `pat_request_id` used to review PAT requests.
        */
        id: number & tags.Type<"int32">;
        /**
         * Reason for requesting access.
        */
        reason: string | null;
        owner: Schema.simple_user;
        /**
         * Type of repository selection requested.
        */
        repository_selection: "none" | "all" | "subset";
        /**
         * URL to the list of repositories requested to be accessed via fine-grained personal access token. Should only be followed when `repository_selection` is `subset`.
        */
        repositories_url: string;
        /**
         * Permissions requested, categorized by type of permission.
        */
        permissions: {
            organization?: {
                [key: string]: string;
            };
            repository?: {
                [key: string]: string;
            };
            other?: {
                [key: string]: string;
            };
        };
        /**
         * Date and time when the request for access was created.
        */
        created_at: string;
        /**
         * Unique identifier of the user's token. This field can also be found in audit log events and the organization's settings for their PAT grants.
        */
        token_id: number & tags.Type<"int32">;
        /**
         * The name given to the user's token. This field can also be found in an organization's settings page for Active Tokens.
        */
        token_name: string;
        /**
         * Whether the associated fine-grained personal access token has expired.
        */
        token_expired: boolean;
        /**
         * Date and time when the associated fine-grained personal access token expires.
        */
        token_expires_at: string | null;
        /**
         * Date and time when the associated fine-grained personal access token was last used for authentication.
        */
        token_last_used_at: string | null;
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
}
type IAutoViewTransformerInputType = Schema.organization_programmatic_access_grant_request[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to format ISO datetime strings to a user-friendly string.
    const formatDate = (iso?: string | null): string =>
        iso ? new Date(iso).toLocaleString() : "Never";

    // Build a DataListItem for simple label/value pairs.
    const buildDetailItem = (
        labelText: string,
        value: string | IAutoView.IAutoViewButtonProps
    ): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: labelText,
        },
        value:
            typeof value === "string"
                ? { type: "Text", variant: "body2", content: value }
                : value,
    });

    // Transform each request into a VerticalCard.
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((req) => {
        const {
            owner,
            reason,
            repository_selection,
            repositories_url,
            created_at,
            id,
            token_name,
            token_id,
            token_expired,
            token_expires_at,
            token_last_used_at,
            permissions,
        } = req;

        // Card header: owner's avatar, login, and creation date.
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: owner.login,
            description: new Date(created_at).toLocaleDateString(),
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                variant: "primary",
                size: 32,
            },
        };

        // Assemble the content of the card.
        const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // 1) Reason section via Markdown for rich text.
        contentChildren.push({
            type: "Markdown",
            content: reason
                ? `**Reason for Access**\n\n${reason}`
                : "**Reason for Access**\n\n_None provided_",
        });

        // 2) Divider
        contentChildren.push({
            type: "Divider",
            orientation: "horizontal",
            color: "#CCCCCC",
        });

        // 3) Permissions broken out into colored chips.
        contentChildren.push({
            type: "Text",
            variant: "subtitle2",
            content: "Permissions",
        });
        const permissionChips: IAutoView.IAutoViewChipProps[] = [];
        // Organization-level permissions
        if (permissions.organization) {
            for (const key in permissions.organization) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.organization[key]}`,
                    color: "teal",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        // Repository-level permissions
        if (permissions.repository) {
            for (const key in permissions.repository) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.repository[key]}`,
                    color: "cyan",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        // Other permissions
        if (permissions.other) {
            for (const key in permissions.other) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.other[key]}`,
                    color: "gray",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: permissionChips,
            maxItems: 8,
        });

        // 4) Divider
        contentChildren.push({
            type: "Divider",
            orientation: "horizontal",
            color: "#CCCCCC",
        });

        // 5) Detailed fields using a DataList.
        const detailItems: IAutoView.IAutoViewDataListItemProps[] = [];

        detailItems.push(
            buildDetailItem("Request ID", id.toString()),
            buildDetailItem("Repository Selection", repository_selection),
            buildDetailItem("Repositories List", {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "View Repositories",
                href: repositories_url,
            }),
            buildDetailItem("Token Name", token_name),
            buildDetailItem("Token ID", token_id.toString()),
            buildDetailItem("Expires At", formatDate(token_expires_at)),
            buildDetailItem("Last Used At", formatDate(token_last_used_at)),
            buildDetailItem("Token Expired", token_expired ? "Yes" : "No")
        );

        contentChildren.push({
            type: "DataList",
            childrenProps: detailItems,
        });

        // Wrap the content in CardContent.
        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: contentChildren,
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, content],
        };
    });

    // If only one card, return it directly; otherwise wrap in a carousel.
    if (cards.length === 1) {
        return cards[0];
    }

    return {
        type: "Carousel",
        infinite: true,
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
}
