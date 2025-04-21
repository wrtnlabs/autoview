import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
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
    };
}
type IAutoViewTransformerInputType = Schema.organization_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a simple message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No organizations found.",
        };
    }

    // Transform each organization into a VerticalCard
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((org) => {
        // Build the CardHeader with avatar on the left and link icon on the right
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: org.login,
            description: org.id.toString(),
            startElement: {
                type: "Avatar",
                src: org.avatar_url,
                name: org.login,
                variant: "primary",
                size: 40,
            },
            endElement: {
                type: "Icon",
                id: "external-link",
                color: "blue",
                size: 20,
            },
        };

        // If the org has a description, render it as Markdown to allow rich text
        const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
        if (org.description) {
            contentChildren.push({
                type: "Markdown",
                content: org.description,
            });
        }

        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            // Use markdown component for description; skip if absent
            childrenProps: contentChildren.length > 0 ? contentChildren : undefined,
        };

        // Footer with a button linking to the organization's GitHub page
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "View on GitHub",
                href: org.url,
                variant: "contained",
                color: "primary",
                size: "medium",
            },
        };

        return {
            type: "VerticalCard",
            // Compose header, content, and footer in order
            childrenProps: [header, content, footer],
        };
    });

    // Wrap all cards in a horizontal, swipeable carousel for better mobile UX
    return {
        type: "Carousel",
        // Show one card at a time, allow navigation and indicators
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        autoPlay: false,
        // Comfortable spacing between cards
        gutter: 16,
        // A modest slide effect
        effect: "slide",
    };
}
