import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Set secrets for GitHub Actions.
     *
     * @title Actions Secret
    */
    export type actions_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.actions_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to safely format ISO datetime strings to locale strings.
    const formatDateTime = (isoString: string): string => {
        const date = new Date(isoString);
        // Fall back to the raw string if parsing fails
        return isNaN(date.getTime())
            ? isoString
            : date.toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
              });
    };

    // DataListItem for creation timestamp
    const createdItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        // Use an icon + text for the label to make it visually engaging
        label: [
            {
                type: "Icon",
                id: "calendar-day",    // FontAwesome calendar icon
                color: "blue",
                size: 16,
            },
            {
                type: "Text",
                content: "Created At",
                variant: "subtitle2",
                color: "gray",
            },
        ],
        // Show the formatted timestamp as a responsive text
        value: {
            type: "Text",
            content: formatDateTime(input.created_at),
            variant: "body2",
            color: "primary",
        },
    };

    // DataListItem for update timestamp
    const updatedItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: [
            {
                type: "Icon",
                id: "history",        // FontAwesome history icon
                color: "green",
                size: 16,
            },
            {
                type: "Text",
                content: "Updated At",
                variant: "subtitle2",
                color: "gray",
            },
        ],
        value: {
            type: "Text",
            content: formatDateTime(input.updated_at),
            variant: "body2",
            color: "primary",
        },
    };

    // The core list visualizing the timestamps
    const timestampList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [createdItem, updatedItem],
    };

    // The card header with a lock icon and the secret name
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: "GitHub Actions Secret",
        startElement: {
            type: "Icon",
            id: "lock",
            color: "red",
            size: 20,
        },
    };

    // The card content wrapping our DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: timestampList,
    };

    // Compose everything into a vertical card for responsive rendering
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
