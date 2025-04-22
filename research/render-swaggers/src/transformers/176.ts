import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChannelView = {
                    channel?: Schema.legacy.v4.LegacyV4Channel;
                    manager?: Schema.legacy.v4.LegacyV4Manager;
                    managerBadge?: Schema.legacy.v4.LegacyV4ManagerBadge;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Channel = {
                id?: string;
                name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
                homepageUrl?: string;
                description?: string;
                nameDescI18nMap?: {
                    [key: string]: Schema.NameDesc;
                };
                country?: string;
                createdAt?: number;
                domain?: string & tags.Pattern<"^[0-9a-z][0-9a-z-]*[0-9a-z]$">;
                color: string & tags.Default<"#123456">;
                userInfoUrl?: string;
                timeZone: string & tags.Default<"UTC">;
                inOperation?: boolean;
                operationTimeScheduling?: boolean;
                operationTimeRanges?: Schema.TimeRange[];
                trafficSource?: {
                    [key: string]: {};
                };
                phoneNumber?: string & tags.Default<"+18004424000">;
                avatar?: Schema.TinyFile;
                billAccountId?: string;
                servicePlan?: "xsmall" | "small" | "medium" | "large" | "entA" | "entAA";
                operationFeature?: boolean;
                mktFeature?: boolean;
                whiteLabelFeature?: boolean;
                billingPeriod?: "yearly" | "monthly";
                billingDay?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<31>;
                stopRenewal?: boolean;
                mau?: number & tags.Type<"int32">;
                enableTexting: boolean;
                enableEmail: boolean;
                state?: "waiting" | "active" | "restricted" | "preIndebted" | "indebted" | "banned" | "removed";
                bizGrade: "AA" | "A" | "B" | "C" | "D" | "F" | "unknown";
                /**
                 * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
                 * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
                 * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
                */
                trialBeginDate?: string;
                /**
                 * - 2022 BM 개편으로 인해 메인 모델에서 필드가 사라짐.
                 * - SDK 에서 mapping 은 하지만 사용하지 않아서 null 처리.
                 * - https://desk.channel.io/root/threads/groups/(TF)BM개편_개발-176808/62ff2b5fa88ef94f0923/62ff2b5fa88ef94f0923
                */
                trialEndDate?: string;
                /**
                 * @deprecated
                */
                autoSolvingTimeMinutes?: number & tags.Type<"int32">;
                blockReplyingAfterClosed?: boolean;
                blockReplyingAfterClosedTime?: string;
                defaultPluginId?: string;
                expectedResponseDelay?: "instant" | "normal" | "delayed";
                workingType?: "always" | "never" | "custom";
                awayOption?: "active" | "disabled" | "hidden";
                sourceSurvey?: {
                    [key: string]: {};
                };
                bizCategory?: string;
                staffs?: number & tags.Type<"int32">;
                appCommerceId?: string;
                appCommerceType?: string;
                enableMemberHash?: boolean;
                memberHashSalt?: string;
                defaultEmailDomainId?: string;
                enableMfa?: boolean;
                hideAppMessenger?: boolean;
                /**
                 * @deprecated
                */
                useSecureFile?: boolean;
                /**
                 * @deprecated
                */
                limited?: boolean;
                messengerPlan?: "none" | "standard" | "pro";
                blocked?: boolean;
                working?: boolean;
                avatarUrl?: string;
                trial?: boolean;
                textColor?: string;
                nextOperatingAt?: number;
                initial?: string;
                utcOffset?: string;
                systemDomain?: string;
            };
            export type LegacyV4Manager = {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: Schema.NameDesc;
                };
                profile?: {
                    [key: string]: {};
                };
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: Schema.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
            };
            export type LegacyV4ManagerBadge = {
                id?: string;
                teamChatAlert?: number & tags.Type<"int32">;
                teamChatUnread?: number & tags.Type<"int32">;
                userChatAlert?: number & tags.Type<"int32">;
                userChatUnread?: number & tags.Type<"int32">;
                teamChatThreadAlert?: number & tags.Type<"int32">;
                teamChatThreadUnread?: number & tags.Type<"int32">;
                updatedAt?: number;
                version?: number & tags.Type<"int32">;
                managerId?: string;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
            };
        }
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TimeRange = {
        dayOfWeeks: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] & tags.UniqueItems;
        from: number & tags.Type<"uint32"> & tags.Maximum<1440>;
        to: number & tags.Type<"uint32"> & tags.Maximum<1440>;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ChannelView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { channel, manager, managerBadge } = input;

    // If no channel data, show a friendly message
    if (!channel) {
        return {
            type: "Text",
            content: "No channel data available.",
        };
    }

    // Build the card header: channel name, description, and avatar if present
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: channel.name,
        description: channel.description,
        // Use an avatar component for the channel image
        startElement: channel.avatarUrl
            ? {
                  type: "Avatar",
                  src: channel.avatarUrl,
                  name: channel.name,
                  variant: "primary",
              }
            : undefined,
    };

    // Helper to push a DataListItem if value exists
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    function addItem(labelText: string, valueComponent: IAutoView.IAutoViewPresentationComponentProps | null) {
        if (valueComponent != null) {
            items.push({
                type: "DataListItem",
                // Label as simple text
                label: { type: "Text", content: labelText },
                // Value can be any presentation component
                value: valueComponent,
            });
        }
    }

    // Domain
    addItem("Domain", channel.domain ? { type: "Text", content: channel.domain } : null);

    // Homepage URL: render as a link-style button
    addItem(
        "Homepage",
        channel.homepageUrl
            ? {
                  type: "Button",
                  variant: "text",
                  label: "Visit",
                  href: channel.homepageUrl,
                  color: "primary",
              }
            : null
    );

    // Country
    addItem("Country", channel.country ? { type: "Text", content: channel.country } : null);

    // State / Status
    addItem("Status", channel.state ? { type: "Chip", label: channel.state, color: "info", variant: "filled" } : null);

    // Service Plan
    addItem("Plan", channel.servicePlan ? { type: "Text", content: channel.servicePlan } : null);

    // Created at: format timestamp
    if (typeof channel.createdAt === "number") {
        const dateStr = new Date(channel.createdAt).toLocaleString();
        addItem("Created", { type: "Text", content: dateStr });
    }

    // Monthly active users (mau)
    if (typeof channel.mau === "number") {
        addItem("MAU", { type: "Text", content: String(channel.mau) });
    }

    // Features toggles
    addItem(
        "Texting",
        channel.enableTexting
            ? { type: "Chip", label: "Enabled", color: "success", variant: "filled" }
            : { type: "Chip", label: "Disabled", color: "gray", variant: "outlined" }
    );
    addItem(
        "Email",
        channel.enableEmail
            ? { type: "Chip", label: "Enabled", color: "success", variant: "filled" }
            : { type: "Chip", label: "Disabled", color: "gray", variant: "outlined" }
    );

    // Compose the DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };

    // Build the footer: manager info and badge counts
    let footer: IAutoView.IAutoViewCardFooterProps | undefined;
    if (manager) {
        const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Manager avatar + name
        footerChildren.push({
            type: "Avatar",
            src: manager.avatarUrl,
            name: manager.name,
            variant: "secondary",
        });

        // Manager name as text
        footerChildren.push({
            type: "Text",
            content: manager.name,
        });

        // Badge counts: use chips for clarity
        if (managerBadge) {
            // Alerts
            footerChildren.push({
                type: "Chip",
                label: `Alert: ${managerBadge.alert ?? 0}`,
                color: "error",
                variant: "filled",
                startElement: { type: "Icon", id: "exclamation-triangle", color: "red" },
            });
            // Unread
            footerChildren.push({
                type: "Chip",
                label: `Unread: ${managerBadge.unread ?? 0}`,
                color: "info",
                variant: "filled",
                startElement: { type: "Icon", id: "envelope", color: "blue" },
            });
        }

        footer = {
            type: "CardFooter",
            childrenProps: footerChildren,
        };
    }

    // Return a vertical card with header, content, and optional footer
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };

    return verticalCard;
}
