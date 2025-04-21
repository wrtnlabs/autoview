import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage summary stats for an organization
     *
     * @title Summary Stats
    */
    export type api_insights_summary_stats = {
        /**
         * The total number of requests within the queried time period
        */
        total_request_count?: number & tags.Type<"int32">;
        /**
         * The total number of requests that were rate limited within the queried time period
        */
        rate_limited_request_count?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.api_insights_summary_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Normalize input values, defaulting missing counts to zero
    const totalRequests = input.total_request_count ?? 0;
    const rateLimitedRequests = input.rate_limited_request_count ?? 0;

    // Compute percentage of rate‐limited requests; avoid division by zero
    const rateLimitPercent = totalRequests > 0
        ? (rateLimitedRequests / totalRequests) * 100
        : 0;

    // Format percentage with two decimal places
    const formattedPercent = rateLimitPercent.toFixed(2);

    // Choose a color for the rate-limit chip: red if above 10%, green otherwise
    const percentChipColor: IAutoView.IAutoViewChipProps['color'] =
        rateLimitPercent > 10 ? 'error' : 'success';

    // Build a small icon for the header
    const headerIcon: IAutoView.IAutoViewIconProps = {
        type: 'Icon',
        id: 'chart-bar',   // FontAwesome "chart-bar" icon
        size: 24,
        color: 'blue',
    };

    // Compose the DataList items for each metric
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: 'DataListItem',
            // Label column: a simple text component
            label: {
                type: 'Text',
                content: 'Total Requests',
                variant: 'body1',
            },
            // Value column: a filled chip displaying the count
            value: {
                type: 'Chip',
                label: String(totalRequests),
                color: 'primary',
                variant: 'filled',
                size: 'medium',
            },
        },
        {
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Rate Limited Requests',
                variant: 'body1',
            },
            value: {
                type: 'Chip',
                label: String(rateLimitedRequests),
                color: rateLimitedRequests > 0 ? 'warning' : 'gray',
                variant: 'filled',
                size: 'medium',
            },
        },
        {
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Rate Limit Rate',
                variant: 'body1',
            },
            value: {
                type: 'Chip',
                label: `${formattedPercent}%`,
                color: percentChipColor,
                variant: 'filled',
                size: 'medium',
            },
        },
    ];

    // Assemble the full UI: a vertical card with header and data list
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                type: 'CardHeader',
                title: 'API Usage Summary',
                // Show a chart icon next to the title
                startElement: headerIcon,
            },
            {
                type: 'CardContent',
                // Embed the data list within the card content
                childrenProps: {
                    type: 'DataList',
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
