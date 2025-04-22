import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsCopilotBillingSelectedUsers {
        /**
         * The total number of seats set to "pending cancellation" for the specified users.
        */
        export type _DeleteResponse = {
            seats_cancelled: number & tags.Type<"int32">;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiOrgsCopilotBillingSelectedUsers._DeleteResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure the relevant field from the input
    const { seats_cancelled } = input;

    // Determine text color based on value (zero seats might be de-emphasized)
    const textColor = seats_cancelled > 0 ? "error" : "gray";

    // 1. Card header: shows the metric name with an icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Pending Cancellation",
        description: "Seats set for cancellation",
        startElement: {
            type: "Icon",
            id: "user-slash",   // FontAwesome icon denoting user removal
            color: seats_cancelled > 0 ? "red" : "gray",
            size: 24
        }
    };

    // 2. Card content: displays the numeric value prominently
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "Text",
            variant: "h3",                    // Large heading style for emphasis
            color: textColor,                 // Use error color when >0, gray when 0
            content: seats_cancelled.toString()
        }
    };

    // Compose the vertical card with header and content.
    // This layout is responsive by default and stacks nicely on small screens.
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
