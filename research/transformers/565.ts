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
type IAutoViewTransformerInputType = Schema.project;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to map project state to a chip color
    const stateColor = (state: string): IAutoView.IAutoViewChipProps["color"] => {
        switch (state.toLowerCase()) {
            case "open":
                return "success";
            case "closed":
                return "error";
            default:
                return "gray";
        }
    };

    // Build the card header, including an avatar for the creator and a state chip
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: input.body ?? undefined,
        // If we have a creator with an avatar, show it
        startElement: input.creator
            ? {
                  type: "Avatar",
                  src: input.creator.avatar_url,
                  name: input.creator.login,
                  variant: "primary",
                  size: 40,
              }
            : undefined,
        // Show a chip indicating open/closed state
        endElement: {
            type: "Chip",
            label: input.state,
            color: stateColor(input.state),
            variant: "filled",
            size: "small",
        },
    };

    // Build a DataList of key project metadata
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: ["ID"] },
                value: { type: "Text", content: [String(input.id)] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Number"] },
                value: { type: "Text", content: [String(input.number)] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Created"] },
                value: { type: "Text", content: [input.created_at] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Updated"] },
                value: { type: "Text", content: [input.updated_at] },
            },
        ],
    };

    // If the project has a non-null body, render it in markdown below the details
    const bodyContent: IAutoView.IAutoViewCardContentProps | undefined = input.body
        ? {
              type: "CardContent",
              childrenProps: [
                  {
                      type: "Markdown",
                      content: input.body,
                  },
              ],
          }
        : undefined;

    // Footer with a button linking to the project page on GitHub
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            variant: "outlined",
            href: input.html_url,
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "gray",
            },
        },
    };

    // Compose the vertical card with header, details, optional body, and footer
    const cardChildren: Array<
        | IAutoView.IAutoViewCardHeaderProps
        | IAutoView.IAutoViewCardContentProps
        | IAutoView.IAutoViewCardFooterProps
    > = [header, { type: "CardContent", childrenProps: detailsList }];

    if (bodyContent) {
        cardChildren.push(bodyContent);
    }
    cardChildren.push(footer);

    // Return a VerticalCard as the top-level component
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };

    return card;
}
