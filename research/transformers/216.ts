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

    // If there's no user data, render a simple message
    if (!user) {
        return {
            type: "Text",
            content: "No user data available",
        };
    }

    // Helper to format timestamps into human-readable strings
    const formatDate = (ts?: number): string =>
        ts ? new Date(ts).toLocaleString() : "Unknown";

    // Build tag chips if any tags exist
    const tagsComponent: IAutoView.IAutoViewComponentProps =
        user.tags && user.tags.length > 0
            ? {
                  type: "ChipGroup",
                  childrenProps: user.tags.map((tag) => ({
                      type: "Chip",
                      label: tag,
                  })),
              }
            : {
                  type: "Text",
                  content: "No tags",
              };

    // Build the main card header with avatar, name, email, and online badge
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: user.name || "Unnamed User",
        description: user.email,
        startElement: {
            type: "Avatar",
            // Use the user's avatar URL if provided, otherwise fallback to initials
            src: user.avatarUrl,
            name: user.name,
            variant: "secondary",
            size: 40,
        },
        endElement: input.online
            ? {
                  type: "Badge",
                  dot: true,
                  color: "green",
                  // A dot badge with no count
                  childrenProps: {
                      type: "Icon",
                      id: "circle", // small circle icon to attach the dot to
                      size: 8,
                      color: "green",
                  },
              }
            : undefined,
    };

    // Build a list of key user statistics
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            // Display tags
            label: { type: "Icon", id: "tags", color: "gray", size: 16 },
            value: tagsComponent,
        },
        {
            type: "DataListItem",
            // Display alert count with a bell icon badge
            label: { type: "Icon", id: "bell", color: "orange", size: 16 },
            value: {
                type: "Badge",
                count: user.alert ?? 0,
                showZero: true,
                maxCount: 99,
                childrenProps: { type: "Icon", id: "bell", color: "orange", size: 16 },
            },
        },
        {
            type: "DataListItem",
            // Display unread messages with an envelope icon badge
            label: { type: "Icon", id: "envelope", color: "blue", size: 16 },
            value: {
                type: "Badge",
                count: user.unread ?? 0,
                showZero: true,
                maxCount: 99,
                childrenProps: { type: "Icon", id: "envelope", color: "blue", size: 16 },
            },
        },
        {
            type: "DataListItem",
            // Display location icon + city, country
            label: { type: "Icon", id: "map-marker-alt", color: "red", size: 16 },
            value: {
                type: "Text",
                content: `${user.city ?? "Unknown city"}${user.country ? `, ${user.country}` : ""}`,
            },
        },
        {
            type: "DataListItem",
            // Display last seen timestamp
            label: { type: "Icon", id: "clock", color: "gray", size: 16 },
            value: {
                type: "Text",
                content: formatDate(user.lastSeenAt),
            },
        },
        {
            type: "DataListItem",
            // Display account creation date
            label: { type: "Icon", id: "calendar-alt", color: "gray", size: 16 },
            value: {
                type: "Text",
                content: formatDate(user.createdAt),
            },
        },
        {
            type: "DataListItem",
            // Display total sessions count
            label: { type: "Icon", id: "users", color: "teal", size: 16 },
            value: {
                type: "Text",
                content: `${user.sessionsCount ?? 0}`,
            },
        },
    ];

    // Wrap the items into a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Compose the vertical card presenting all the information
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
}
