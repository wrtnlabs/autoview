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
    // If there are no teams, render a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available\nThere are no teams to display at this time.",
        };
    }

    // Map each team to a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((team) => {
        // Fallback to slug if description is null or empty
        const description = team.description ?? team.slug;

        return {
            type: "ListItem",
            title: team.name,
            description: description,
            // Use a user icon to represent a team
            startElement: {
                type: "Icon",
                id: "users",
                color: "blue",
                size: 24,
            },
            // Show a chevron icon on the right to indicate navigation
            endElement: {
                type: "Icon",
                id: "arrow-right",
                color: "gray",
                size: 16,
            },
            // Make the entire item clickable, linking to the team's GitHub page
            href: team.html_url,
        };
    });

    // Return a responsive List component wrapping those items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
