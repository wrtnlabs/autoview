import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export type project = {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
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
}
type IAutoViewTransformerInputType = Schema.project[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no projects, show a simple markdown message.
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No projects to display.*",
        };
    }

    // Helper: format ISO date string into a user‐friendly date.
    const formatDate = (iso: string): string =>
        new Date(iso).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    // Map each project into a VerticalCard component.
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((project) => {
        // CardHeader: show project title, state, and owner's avatar if available.
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: project.name,
            description: project.state === "open" ? "Open" : "Closed",
            // Only include avatar if creator is not null
            startElement:
                project.creator !== null && project.creator !== undefined
                    ? {
                          type: "Avatar",
                          src: project.creator.avatar_url,
                          name: project.creator.login,
                          // fixed size for consistency
                          size: 32,
                      }
                    : undefined,
        };

        // Build a list of key‐value pairs about the project.
        const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
            {
                type: "DataListItem",
                label: [
                    {
                        type: "Text",
                        content: "ID",
                        variant: "body2",
                        color: "secondary",
                    },
                ],
                value: [
                    {
                        type: "Text",
                        content: project.id.toString(),
                        variant: "body2",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Number", variant: "body2", color: "secondary" },
                ],
                value: [
                    { type: "Text", content: project.number.toString(), variant: "body2" },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Created", variant: "body2", color: "secondary" },
                ],
                value: [
                    {
                        type: "Text",
                        content: formatDate(project.created_at),
                        variant: "body2",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Updated", variant: "body2", color: "secondary" },
                ],
                value: [
                    {
                        type: "Text",
                        content: formatDate(project.updated_at),
                        variant: "body2",
                    },
                ],
            },
        ];

        // Optionally include the project body as markdown, if present.
        const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
        if (project.body) {
            contentChildren.push({
                type: "Markdown",
                content: project.body,
            });
        }

        // Insert the DataList of raw fields.
        contentChildren.push({
            type: "DataList",
            childrenProps: dataListItems,
        });

        // Footer: a button to view the project on GitHub.
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                variant: "contained",
                color: "primary",
                size: "medium",
                href: project.html_url,
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "gray",
                    size: 16,
                },
                label: "View on GitHub",
            },
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, { type: "CardContent", childrenProps: contentChildren }, footer],
        };
    });

    // Compose all cards into a responsive carousel.
    return {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        gutter: 16,
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
}
