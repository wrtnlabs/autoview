import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4UserView = {
                    user?: Schema.legacy.v4.LegacyV4User;
                    online?: Schema.Online;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4User = {
                id?: string;
                channelId?: string;
                memberId?: string;
                veilId?: string;
                unifiedId?: string;
                name?: string;
                profile?: {
                    [key: string]: {};
                };
                profileOnce?: Schema.profile.UserProfile;
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                popUpChatId?: string;
                blocked?: boolean;
                unsubscribed?: boolean;
                hasChat?: boolean;
                hasPushToken?: boolean;
                language?: string & tags.Default<"en">;
                country?: string;
                city?: string;
                latitude?: number;
                longitude?: number;
                web?: Schema.WebInfo;
                mobile?: Schema.MobileInfo;
                sessionsCount?: number & tags.Type<"int32">;
                lastSeenAt?: number;
                createdAt?: number;
                updatedAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
                managedKey?: number & tags.Type<"int32">;
                member?: boolean;
                email?: string;
                userId?: string;
                avatarUrl?: string;
                managed?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                systemLanguage?: string & tags.Default<"en">;
            };
        }
    }
    export namespace profile {
        export type UserProfile = {
            [key: string]: {};
        };
    }
    export type WebInfo = {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type MobileInfo = {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4UserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const user = input.user;
    const online = input.online;

    // If there is no user data, render a friendly markdown message
    if (!user) {
        return {
            type: "Markdown",
            content: "**No user data available**",
        };
    }

    // Helper to format timestamps into human-readable strings
    const formatDate = (ts?: number): string =>
        ts != null ? new Date(ts).toLocaleString() : "-";

    // Determine online status
    const isOnline = online != null;

    // Build a list of key/value pairs to display in the details section
    const details: Array<[string, string]> = [
        ["User ID", user.id ?? "-"],
        ["Channel ID", user.channelId ?? "-"],
        ["Member ID", user.memberId ?? "-"],
        ["Unified ID", user.unifiedId ?? "-"],
        ["Email", user.email ?? "-"],
        ["Country", user.country ?? "-"],
        ["City", user.city ?? "-"],
        ["Language", user.language ?? "-"],
        ["Sessions", user.sessionsCount != null ? String(user.sessionsCount) : "-"],
        ["Last Seen", formatDate(user.lastSeenAt)],
        ["Created At", formatDate(user.createdAt)],
        ["Updated At", formatDate(user.updatedAt)],
    ];

    // Transform each detail into a DataListItemProps
    const detailItems: IAutoView.IAutoViewDataListItemProps[] = details.map(
        ([labelText, valueText]) => ({
            type: "DataListItem",
            // label rendered in smaller gray text
            label: {
                type: "Text",
                content: labelText,
                variant: "body2",
                color: "gray",
            },
            // value in primary body text
            value: {
                type: "Text",
                content: valueText,
                variant: "body1",
            },
        })
    );

    // Compose the overall card UI
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: user.name,
                // Show channel ID as subtitle
                description: user.channelId,
                // Show avatar if available
                startElement: {
                    type: "Avatar",
                    src: user.avatarUrl,
                    name: user.name,
                    size: 40,
                },
                // Show an online/offline chip
                endElement: {
                    type: "Chip",
                    label: isOnline ? "Online" : "Offline",
                    color: isOnline ? "success" : "gray",
                    size: "small",
                    variant: "filled",
                },
            },
            {
                type: "CardContent",
                // Wrap the details list in a DataList for structured layout
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailItems,
                },
            },
        ],
    };
}
