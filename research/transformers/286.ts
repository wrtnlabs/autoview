import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FIND_ONE_REPLY_COMMENT = any;
    export type NOT_FOUND_ARTICLE_TO_COMMENT = any;
    export type TOO_MANY_REPORTED_ARTICLE = any;
    export type CANNOT_FIND_IMAGE_TO_LEFT_COMMENT = any;
    export namespace ResponseForm_lt_CommentType {
        export type CreateResponse_gt_ = any;
    }
}
type IAutoViewTransformerInputType = any | any | any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Recursively transforms arbitrary input data into AutoView presentation components.
 * - Objects and arrays are rendered as DataList.
 * - Strings recognized as URLs render as Images.
 * - Other primitives use Markdown text.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to detect URL strings
    const isUrl = (str: string): boolean =>
        /^https?:\/\/[^\s]+$/.test(str);

    // Create a Markdown text component
    const mkText = (content: string): IAutoView.IAutoViewMarkdownProps => ({
        type: "Markdown",
        content: content.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    });

    // Create an Image component
    const mkImage = (src: string, alt = ""): IAutoView.IAutoViewImageProps => ({
        type: "Image",
        src,
        alt,
    });

    // Create a DataListItem: label / value
    const mkListItem = (
        label: string,
        valueComp: IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: mkText(label),
        value: valueComp,
    });

    /**
     * Recursive renderer: turns any value into a single presentation component.
     */
    function renderValue(
        val: any
    ): IAutoView.IAutoViewPresentationComponentProps {
        if (val === null || val === undefined) {
            return mkText("_No data_");
        }
        if (typeof val === "string") {
            if (isUrl(val)) return mkImage(val, "Image");
            // render string via markdown for rich formatting
            return mkText(val);
        }
        if (typeof val === "number" || typeof val === "boolean") {
            return mkText(String(val));
        }
        if (Array.isArray(val)) {
            // Render array as nested DataList
            const children = val.map((item, idx) =>
                mkListItem(`#${idx + 1}`, renderValue(item))
            );
            return {
                type: "DataList",
                childrenProps: children,
            };
        }
        if (typeof val === "object") {
            // Render object as DataList of its properties
            const children: IAutoView.IAutoViewDataListItemProps[] = [];
            for (const key of Object.keys(val)) {
                children.push(mkListItem(key, renderValue(val[key])));
            }
            return {
                type: "DataList",
                childrenProps: children,
            };
        }
        // Fallback: stringify
        return mkText(String(val));
    }

    // Root: wrap entire input into a VerticalCard with header + content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Data Overview",
                description: Array.isArray(input)
                    ? `Array of ${input.length} items`
                    : typeof input === "object" && input !== null
                    ? "Object"
                    : "Primitive value",
                startElement: {
                    type: "Icon",
                    id: "database",
                    color: "cyan",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                childrenProps: renderValue(input),
            },
        ],
    };
}
