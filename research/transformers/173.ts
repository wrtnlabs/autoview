import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4CampaignsView = {
                    campaigns?: Schema.legacy.v4.marketing.LegacyV4Campaign[];
                    msgs?: Schema.legacy.v4.marketing.LegacyV4CampaignMsg[];
                    next?: number;
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                /**
                 * ### 이벤트 기록
                 *
                 * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
                */
                export type LegacyV4Campaign = {
                    id?: string;
                    channelId?: string;
                    name: string;
                    state?: "draft" | "active" | "stopped" | "removed";
                    sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    userQuery?: Schema.Expression;
                    triggerEventName: string;
                    triggerEventQuery?: Schema.Expression;
                    waitingTime: string;
                    filterEventName?: string;
                    filterEventQuery?: Schema.Expression;
                    filterMatch?: "positive" | "negative";
                    goalEventName?: string;
                    goalEventQuery?: Schema.Expression;
                    advertising: boolean;
                    enableSupportBot: boolean;
                    followingSupportBotId?: string;
                    sendToOfflineXms?: boolean;
                    sendToOfflineEmail?: boolean;
                    cooldown?: string;
                    sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
                    sendTimeRanges?: Schema.TimeRange[];
                    startAt?: number;
                    endAt?: number;
                    draft?: Schema.marketing.CampaignDraft;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                    userChatExpireDuration?: string;
                    managerId?: string;
                };
                export type LegacyV4CampaignMsg = {
                    id: string;
                    campaignId?: string;
                    name: string;
                    sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
                    settings?: Schema.marketing.SendMediumSettings;
                    createdAt?: number;
                    updatedAt?: number;
                    sent?: number & tags.Type<"int32">;
                    view?: number & tags.Type<"int32">;
                    goal?: number & tags.Type<"int32">;
                    click?: number & tags.Type<"int32">;
                };
            }
        }
    }
    export type Expression = {
        key?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        operator?: Schema.Operator;
        values?: {}[];
        and?: Schema.Expression[];
        or?: Schema.Expression[];
    };
    export type Operator = {};
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export namespace marketing {
        export type CampaignDraft = {
            campaign: Schema.marketing.Campaign;
            msgs: Schema.marketing.CampaignMsg[] & tags.MinItems<1> & tags.MaxItems<4>;
        };
        /**
         * ### 이벤트 기록
         *
         * - 마케팅 이벤트 기록에 대한 [문서](https://www.notion.so/channelio/e5d745446b6342198e9e5b004e48d312)
        */
        export type Campaign = {
            id?: string;
            channelId?: string;
            name: string;
            state?: "draft" | "active" | "stopped" | "removed";
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            userQuery?: Schema.Expression;
            triggerEventName: string;
            triggerEventQuery?: Schema.Expression;
            waitingTime: string;
            filterEventName?: string;
            filterEventQuery?: Schema.Expression;
            filterMatch?: "positive" | "negative";
            filterHpc?: Schema.marketing.HoldingPropertyConstant;
            goalEventName?: string;
            goalEventQuery?: Schema.Expression;
            goalEventDuration?: string;
            goalHpc?: Schema.marketing.HoldingPropertyConstant;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            cooldown?: string;
            sendMode: "always" | "away" | "inOperation" | "customUsingSenderTime" | "customUsingReceiverTime" | "custom";
            channelOperationId?: string;
            sendTimeRanges?: Schema.TimeRange[];
            startAt?: number;
            endAt?: number;
            deleteMessageAfterStop?: boolean;
            draft?: Schema.marketing.CampaignDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
            managerId?: string;
            recipeCaseId?: string;
        };
        export type HoldingPropertyConstant = {
            baseEventName: string;
            baseEventKey: string;
            eventQuery?: Schema.Expression;
            baseEventType: "triggerEvent" | "additionalFilter";
            operator?: Schema.EventSchema;
            values?: {};
        };
        export type CampaignMsg = {
            id: string;
            campaignId?: string;
            channelId?: string;
            name: string;
            sendMedium: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings: Schema.marketing.SendMediumSettings;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
        };
        export type SendMediumSettings = {
            type: string;
        };
    }
    export type EventSchema = {
        id?: string;
        channelId?: string;
        eventName?: string;
        key?: string;
        parentKey?: string;
        type?: "boolean" | "date" | "datetime" | "list" | "listOfNumber" | "number" | "string" | "listOfObject";
        createdAt?: number;
        updatedAt?: number;
        icon?: string;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4CampaignsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure campaigns and pagination cursor
    const { campaigns, next } = input;

    // If there are no campaigns, render a friendly markdown message
    if (!campaigns || campaigns.length === 0) {
        return {
            type: "Markdown",
            content: "### No campaigns to display.\n\nThere are currently no marketing campaigns available."
        };
    }

    // Map each campaign to a DataListItem, showing its name and key metrics as chips
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = campaigns.map(campaign => {
        // Build chips for each metric if present
        const metricChips: IAutoView.IAutoViewChipProps[] = [];

        if (campaign.sent !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.sent}`,
                color: "primary",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.view !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.view}`,
                color: "info",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.goal !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.goal}`,
                color: "success",
                size: "small",
                variant: "filled"
            });
        }
        if (campaign.click !== undefined) {
            metricChips.push({
                type: "Chip",
                label: `${campaign.click}`,
                color: "warning",
                size: "small",
                variant: "filled"
            });
        }

        // Compose the label as a Text component showing the campaign name
        const labelComponent: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "subtitle1",
            color: "primary",
            content: campaign.name
        };

        // The DataListItem.value can be a single component or an array
        const valueComponent =
            metricChips.length === 1
                ? metricChips[0]
                : metricChips; // array if multiple chips

        return {
            type: "DataListItem",
            label: labelComponent,
            value: metricChips.length > 0 ? valueComponent : undefined
        };
    });

    // Wrap the items into a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems
    };

    // Construct the card header with an icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Campaigns Overview",
        startElement: {
            type: "Icon",
            id: "bullhorn",
            color: "blue",
            size: 20
        }
    };

    // Use the DataList as the card content
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // If there is a next cursor, add a "Load More" button in the footer
    let footer: IAutoView.IAutoViewCardFooterProps | undefined;
    if (next !== undefined) {
        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "Load more",
                variant: "outlined",
                color: "primary",
                size: "medium"
            }
        };
    }

    // Assemble everything into a vertical card for responsiveness on mobile
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        // Include header, content, and conditionally footer
        childrenProps: footer ? [header, content, footer] : [header, content]
    };

    return card;
}
