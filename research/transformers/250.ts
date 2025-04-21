import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type OneTimeMsgsView = {
                next?: number;
                oneTimeMsgs?: Schema.marketing.OneTimeMsg[];
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
type IAutoViewTransformerInputType = Schema.open.marketing.OneTimeMsgsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Mapping of message states to chip colors
    const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        draft: "gray",
        waiting: "warning",
        sent: "success",
        canceled: "error",
        removed: "secondary",
    };

    // Mapping of metric keys to icon identifiers and colors
    const metricIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
        sent: { id: "paper-plane", color: "blue" },
        view: { id: "eye", color: "teal" },
        goal: { id: "bullseye", color: "green" },
        click: { id: "mouse-pointer", color: "violet" },
    };

    // If there are no messages, show a friendly markdown notice
    if (!input.oneTimeMsgs || input.oneTimeMsgs.length === 0) {
        return {
            type: "Markdown",
            content: "### No one-time messages to display\nYou can schedule messages to see them here.",
        };
    }

    // Build a DataListItem for each message record
    const items: IAutoView.IAutoViewDataListItemProps[] = input.oneTimeMsgs.map((msg) => {
        // Primary label: message name styled as heading
        const nameLabel: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "h6",
            content: msg.name,
        };

        // Chip to indicate the message state
        const stateChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: msg.state,
            color: stateColorMap[msg.state] || "gray",
            size: "small",
            variant: "filled",
        };

        // Optional: chip to indicate send mode if provided
        const sendModeChip: IAutoView.IAutoViewChipProps | null = msg.sendMode
            ? {
                  type: "Chip",
                  label: msg.sendMode,
                  color: "primary",
                  size: "small",
                  variant: "outlined",
              }
            : null;

        // Build badges for each available metric
        const metricBadges: IAutoView.IAutoViewBadgeProps[] = [];
        (["sent", "view", "goal", "click"] as const).forEach((key) => {
            const value = (msg as any)[key] as number | undefined;
            if (typeof value === "number") {
                const iconMeta = metricIconMap[key];
                metricBadges.push({
                    type: "Badge",
                    count: value,
                    childrenProps: {
                        type: "Icon",
                        id: iconMeta.id,
                        color: iconMeta.color,
                        size: 16,
                    },
                    // showZero false by default
                });
            }
        });

        // Assemble the label area with name and state (and optional send mode)
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            nameLabel,
            stateChip,
        ];
        if (sendModeChip) {
            labelComponents.push(sendModeChip);
        }

        // The value area shows the metric badges inline
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = metricBadges;

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });

    // Return the overall DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
