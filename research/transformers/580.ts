import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An object without any properties.
     *
     * @title Empty Object
    */
    export type empty_object = {};
}
type IAutoViewTransformerInputType = Schema.empty_object;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Since `IAutoViewTransformerInputType` is an empty object, there's no
    // dynamic data to render. We choose to render a friendly Markdown message
    // to inform the user there’s no data available.
    return {
        type: "Markdown",
        content: "# No Data Available\n\nThere is no information to display."
    };
}
