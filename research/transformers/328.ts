import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Code Of Conduct
     *
     * @title Code Of Conduct
    */
    export type code_of_conduct = {
        key: string;
        name: string;
        url: string & tags.Format<"uri">;
        body?: string;
        html_url: (string & tags.Format<"uri">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.code_of_conduct[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Transform an array of code_of_conduct entries into a DataList of DataListItems
    // Each item shows an icon + title, a markdown snippet of the body (if any), and a link button or fallback URL text.
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((coc) => {
        // Compose the label: an icon and the code-of-conduct name
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Icon",
                id: "file-alt",       // document icon
                color: "gray",
                size: 16
            },
            {
                type: "Text",
                variant: "subtitle1",
                // `content` can be a string for simple text
                content: coc.name
            }
        ];

        // Compose the value: markdown snippet and a link or URL text
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        if (coc.body) {
            // Truncate long bodies for brevity
            const snippet =
                coc.body.length > 200
                    ? coc.body.slice(0, 200) + "..."
                    : coc.body;
            valueComponents.push({
                type: "Markdown",
                content: `#### Description\n\n${snippet}`
            });
        }

        if (coc.html_url) {
            // If there's an HTML URL, render a link button with a GitHub icon
            valueComponents.push({
                type: "Button",
                variant: "text",
                color: "primary",
                label: "View on GitHub",
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "gray",
                    size: 16
                },
                href: coc.html_url
            });
        } else {
            // Fallback: show the raw URL as text
            valueComponents.push({
                type: "Text",
                variant: "body2",
                content: coc.url
            });
        }

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });

    // Wrap all items in a DataList component for display
    return {
        type: "DataList",
        childrenProps: items
    };
}
