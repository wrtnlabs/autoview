import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Porter Author
     *
     * @title Porter Author
    */
    export type porter_author = {
        id: number & tags.Type<"int32">;
        remote_id: string;
        remote_name: string;
        email: string;
        name: string;
        url: string & tags.Format<"uri">;
        import_url: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.porter_author[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If no data, inform the user via a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No authors available\n\nThere is no author data to display."
        };
    }

    // Sort authors by display name for consistent ordering
    const sorted = [...input].sort((a, b) => a.name.localeCompare(b.name));

    // Map each author record into a DataListItem component
    const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map(author => {
        // Construct an avatar; if no image URL is provided, the initials will be shown
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: author.name,
            // we omit src if it's not an image URL to allow initials fallback
            variant: "primary",
            size: 40,
        };

        // Main label: avatar + author's name and remote handle
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            avatar,
            {
                type: "Text",
                // Use an arrayable content: bold name followed by remote handle
                content: [
                    `**${author.name}**`,
                    { type: "Icon", id: "user", color: "gray", size: 12 },
                    ` ${author.remote_name}`
                ],
                variant: "body1",
                color: "primary",
            }
        ];

        // Action buttons: email and website link
        const actionButtons: IAutoView.IAutoViewButtonProps[] = [
            {
                type: "Button",
                label: "Email",
                variant: "text",
                color: "info",
                startElement: { type: "Icon", id: "envelope", color: "blue", size: 16 },
                // mailto link
                href: `mailto:${author.email}`
            },
            {
                type: "Button",
                label: "Website",
                variant: "text",
                color: "info",
                startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
                href: author.url
            }
        ];

        return {
            type: "DataListItem",
            // label is a horizontal row of avatar+text
            label: labelComponents,
            // value is the row of action buttons
            value: actionButtons
        };
    });

    // Wrap all items in a DataList container
    return {
        type: "DataList",
        childrenProps: items
    };
}
