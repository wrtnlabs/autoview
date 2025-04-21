import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type OneTimeMsgView = {
                oneTimeMsg?: Schema.marketing.OneTimeMsg;
            };
        }
    }
    export namespace marketing {
        export type OneTimeMsg = {
            id?: string;
            channelId?: string;
            name: string;
            state: "draft" | "waiting" | "sent" | "canceled" | "removed";
            sendMode?: "immediately" | "reservedWithSenderTime" | "reservedWithReceiverTime";
            channelOperationId?: string;
            sendMedium?: "appAlimtalk" | "appLine" | "email" | "inAppChat" | "xms";
            settings?: Schema.marketing.SendMediumSettings;
            userQuery?: Schema.Expression;
            goalEventName?: string;
            goalEventQuery?: Schema.Expression;
            goalEventDuration?: string;
            advertising: boolean;
            sendToOfflineXms?: boolean;
            sendToOfflineEmail?: boolean;
            startAt?: number;
            localStartAt?: string & tags.Format<"date-time">;
            draft?: Schema.marketing.OneTimeMsgDraft;
            createdAt?: number;
            updatedAt?: number;
            sent?: number & tags.Type<"int32">;
            view?: number & tags.Type<"int32">;
            goal?: number & tags.Type<"int32">;
            click?: number & tags.Type<"int32">;
            userChatExpireDuration?: string;
        };
        export type SendMediumSettings = {
            type: string;
        };
        export type OneTimeMsgDraft = {
            oneTimeMsg: Schema.marketing.OneTimeMsg;
        };
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
}
type IAutoViewTransformerInputType = Schema.open.marketing.OneTimeMsgView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no message, show a friendly markdown.
    if (!input.oneTimeMsg) {
        return {
            type: "Markdown",
            content: "## No message data available\nThere is nothing to display."
        };
    }

    const msg = input.oneTimeMsg;

    // Helper: format timestamp or date-time string to a human‐readable form.
    const formatDate = (isoOrEpoch?: string | number): string | undefined => {
        if (isoOrEpoch === undefined) return undefined;
        try {
            const d = typeof isoOrEpoch === "number"
                ? new Date(isoOrEpoch)
                : new Date(isoOrEpoch);
            return d.toLocaleString();
        } catch {
            return String(isoOrEpoch);
        }
    };

    // Map sendMedium to fontawesome icon names.
    const mediumIconMap: Record<string, string> = {
        email: "envelope",
        appAlimtalk: "comment-alt",
        appLine: "comment",
        inAppChat: "comments",
        xms: "sms"
    };
    const mediumIcon = msg.sendMedium ? (mediumIconMap[msg.sendMedium] || "question-circle") : undefined;

    // Map state to chip color.
    const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        draft: "gray",
        waiting: "warning",
        sent: "success",
        canceled: "error",
        removed: "darkGray"
    };
    const stateColor = stateColorMap[msg.state] || "primary";

    // Build a list of key/value pairs to render in a DataList.
    const keyValues: Array<{ label: string; value?: string | number }> = [
        { label: "ID", value: msg.id },
        { label: "Channel ID", value: msg.channelId },
        { label: "Channel Op ID", value: msg.channelOperationId },
        { label: "Send Mode", value: msg.sendMode },
        { label: "Send Medium", value: msg.sendMedium },
        { label: "Scheduled Start", value: msg.localStartAt || formatDate(msg.startAt) },
        { label: "Created At", value: formatDate(msg.createdAt) },
        { label: "Updated At", value: formatDate(msg.updatedAt) },
        { label: "Advertising", value: msg.advertising ? "Yes" : "No" },
        { label: "Offline XMS", value: msg.sendToOfflineXms ? "Yes" : "No" },
        { label: "Offline Email", value: msg.sendToOfflineEmail ? "Yes" : "No" }
    ];

    // Construct DataListItems, filtering out undefined values.
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = keyValues
        .filter(kv => kv.value !== undefined && kv.value !== null)
        .map(kv => ({
            type: "DataListItem",
            // Use Markdown for labels to allow bold styling.
            label: [
                {
                    type: "Markdown",
                    content: `**${kv.label}**`
                }
            ],
            // Use plain Text for values.
            value: {
                type: "Text",
                content: String(kv.value)
            }
        }));

    // Prepare metric chips for sent, view, click, goal.
    type MetricKey = "sent" | "view" | "click" | "goal";
    const metrics: Record<MetricKey, { icon: string; count?: number }> = {
        sent: { icon: "paper-plane", count: msg.sent },
        view: { icon: "eye", count: msg.view },
        click: { icon: "mouse-pointer", count: msg.click },
        goal: { icon: "bullseye", count: msg.goal }
    };
    const metricChips: IAutoView.IAutoViewChipProps[] = (Object.keys(metrics) as MetricKey[])
        .filter(key => metrics[key].count !== undefined)
        .map(key => ({
            type: "Chip",
            label: String(metrics[key].count!),
            variant: "outlined",
            size: "small",
            color: "primary",
            startElement: {
                type: "Icon",
                id: metrics[key].icon,
                size: 12,
                color: "gray"
            }
        }));

    // Assemble the final VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with name, medium icon and state chip.
            {
                type: "CardHeader",
                title: msg.name,
                // show medium icon at the start
                startElement: mediumIcon
                    ? { type: "Icon", id: mediumIcon, size: 24, color: "teal" }
                    : undefined,
                // show state as a colored chip at the end
                endElement: {
                    type: "Chip",
                    label: msg.state,
                    color: stateColor,
                    variant: "filled",
                    size: "small"
                }
            },
            // Main content: a DataList of properties
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            // Footer with metric chips
            {
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: metricChips
                }
            }
        ]
    };
}
