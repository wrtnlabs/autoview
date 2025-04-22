import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type private_user = any;
    export type public_user = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle null or undefined
    if (input === null || input === undefined) {
        return {
            type: "Text",
            content: "No data",
        };
    }

    // Handle boolean as an icon for quick visual feedback
    if (typeof input === "boolean") {
        return {
            type: "Icon",
            id: input ? "check" : "times",
            color: input ? "green" : "red",
            size: 20,
        };
    }

    // Handle numbers with a simple text
    if (typeof input === "number") {
        return {
            type: "Text",
            variant: "body2",
            content: input.toString(),
        };
    }

    // Handle strings: detect images, long markdown, or simple text
    if (typeof input === "string") {
        const imageUrlPattern = /^https?:\/\/.+\.(png|jpe?g|gif|svg)(\?.*)?$/i;
        if (imageUrlPattern.test(input)) {
            // Render an image if the string is an image URL
            return {
                type: "Image",
                src: input,
                alt: "",
            };
        }
        // Use markdown for multi-line or large text
        if (input.length > 100 || input.includes("\n")) {
            return {
                type: "Markdown",
                content: input,
            };
        }
        // Fallback to plain text for short strings
        return {
            type: "Text",
            content: input,
        };
    }

    // Handle arrays by listing each entry
    if (Array.isArray(input)) {
        const items = input.map((elem) => {
            // Each list item displays the value component of the element
            return {
                type: "DataListItem" as const,
                // no label for arrays; value is the visualization of that element
                value: visualizeData(elem),
            } as IAutoView.IAutoViewDataListItemProps;
        });
        return {
            type: "DataList",
            childrenProps: items,
        };
    }

    // Handle objects by collapsing their key/value pairs
    if (typeof input === "object") {
        const keys = Object.keys(input);
        // If it's an empty object, render as simple text
        if (keys.length === 0) {
            return {
                type: "Text",
                content: "{}",
            };
        }
        // Build a DataList of the object's entries
        const entries = keys.map((key) => {
            const value = (input as Record<string, any>)[key];
            return {
                type: "DataListItem" as const,
                // Label the row with the key
                label: {
                    type: "Text" as const,
                    content: key,
                },
                // Visualize the value recursively
                value: visualizeData(value),
            } as IAutoView.IAutoViewDataListItemProps;
        });

        return {
            type: "Collapse",
            header: {
                type: "CollapseHeader",
                // Small icon to indicate collapsible region
                toggleIcon: {
                    type: "Icon",
                    id: "caret-down",
                    size: 16,
                    color: "gray",
                },
                childrenProps: [
                    // Show object label and entry count
                    {
                        type: "Text",
                        content: `Object (${keys.length} ${keys.length === 1 ? "field" : "fields"})`,
                    },
                ],
            },
            content: {
                type: "CollapseContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: entries,
                    },
                ],
            },
        } as IAutoView.IAutoViewCollapseProps;
    }

    // Fallback: stringify any other types into markdown block
    try {
        const json = JSON.stringify(input, null, 2);
        return {
            type: "Markdown",
            content: "json\n" + json + "\n```",
        };
    } catch {
        return {
            type: "Text",
            content: String(input),
        };
    }
}
