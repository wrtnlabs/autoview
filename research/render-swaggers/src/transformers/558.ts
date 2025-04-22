import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiProjectsColumnsCardsMoves {
        export type PostResponse = {};
    }
}
type IAutoViewTransformerInputType = Schema.IApiProjectsColumnsCardsMoves.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If input is completely empty, show a simple markdown message.
    if (Object.keys(input).length === 0) {
        return {
            type: "Markdown",
            content: "No data available."
        };
    }

    // Build a DataList where each key/value pair is a list item.
    const items: IAutoView.IAutoViewDataListItemProps[] = Object.keys(input).map((key) => {
        const value = (input as any)[key];
        let valueComponent: IAutoView.IAutoViewPresentationComponentProps;

        // Primitive values (string/number/boolean/null/undefined): render as Text.
        if (
            value === null ||
            value === undefined ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            valueComponent = {
                type: "Text",
                // Inline text content for primitive.
                content: String(value),
                variant: "body2",
                color: "gray"
            };
        } else {
            // Objects and arrays: render as collapsible JSON code block via Markdown.
            const json = JSON.stringify(value, null, 2);
            valueComponent = {
                type: "Markdown",
                content: [
                    "json",
                    json,
                    "```"
                ].join("\n")
            };
        }

        // Label for each entry: the field name.
        const labelComponent: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: key,
            variant: "subtitle2",
            color: "primary"
        };

        return {
            type: "DataListItem",
            label: labelComponent,
            value: valueComponent
        };
    });

    // Wrap the items in a DataList component.
    return {
        type: "DataList",
        childrenProps: items
    };
}
