import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export type team = {
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        slug: string;
        description: string | null;
        privacy?: string;
        notification_setting?: string;
        permission: string;
        permissions?: {
            pull: boolean;
            triage: boolean;
            push: boolean;
            maintain: boolean;
            admin: boolean;
        };
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent: Schema.nullable_team_simple;
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
}
type IAutoViewTransformerInputType = Schema.team[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If no teams, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available\n\nThere are currently no teams to display."
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Map each team to a ListItem component
    const items: IAutoView.IAutoViewListItemProps[] = input.map(team => {
        // Use the first letter of the team name as avatar fallback
        const initials = team.name
            .split(/\s+/)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

        // Build a description string, fallback if null
        const desc = team.description ?? "_No description provided_";

        // Compose endElement as a button that links to the team's page
        const viewButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "View",
            variant: "outlined",
            size: "small",
            href: team.html_url,
            color: "primary"
        };

        return {
            type: "ListItem",
            title: team.name,
            // Render the description in Markdown for better styling
            description: desc,
            startElement: {
                type: "Avatar",
                name: team.name,
                // We don't have an image URL, so we show initials
                variant: "primary",
                size: 32
            },
            endElement: viewButton,
            href: team.html_url
        };
    });

    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items
    } as IAutoView.IAutoViewListProps;
}
