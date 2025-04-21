import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization Invitation
     *
     * @title Organization Invitation
    */
    export type organization_invitation = {
        id: number & tags.Type<"int32">;
        login: string | null;
        email: string | null;
        role: string;
        created_at: string;
        failed_at?: string | null;
        failed_reason?: string | null;
        inviter: Schema.simple_user;
        team_count: number & tags.Type<"int32">;
        node_id: string;
        invitation_teams_url: string;
        invitation_source?: string;
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
type IAutoViewTransformerInputType = Schema.organization_invitation[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no invitations, show a friendly message via Markdown
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No organization invitations found.\n\nAll caught up! 🎉",
        };
    }

    // Helper to format ISO date strings into a human-friendly form
    const formatDate = (iso: string): string => {
        try {
            return new Date(iso).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            // Fallback to the raw string if parsing fails
            return iso;
        }
    };

    // Transform each invitation into a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((invitation) => {
        // Determine the display name: prefer login, then email, then inviter login
        const subject =
            invitation.login ??
            invitation.email ??
            invitation.inviter.login ??
            "Unknown";

        // Format the creation date
        const createdAt = formatDate(invitation.created_at);

        // Create a Chip to show the invitation role
        const roleChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: invitation.role,
            color: "primary",
            variant: "outlined",
            size: "small",
        };

        // Create a Chip to show the status: Pending or Failed
        const statusChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: invitation.failed_at ? "Failed" : "Pending",
            color: invitation.failed_at ? "error" : "info",
            variant: "filled",
            size: "small",
        };

        // Build the ListItem
        const item: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            // Show inviter's avatar on the left
            startElement: {
                type: "Avatar",
                src: invitation.inviter.avatar_url,
                name: invitation.inviter.login,
                size: 40,
            },
            // Primary text: the invited person's login/email
            title: subject,
            // Secondary text: date and, if available, failure reason
            description: invitation.failed_reason
                ? `${createdAt} · ${invitation.failed_reason}`
                : createdAt,
            // On the right, show two Chips: role and status
            endElement: [roleChip, statusChip],
        };

        return item;
    });

    // Return a responsive List component containing all invitations
    const listProps: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: listItems,
    };

    return listProps;
}
