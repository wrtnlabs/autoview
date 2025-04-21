import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4GroupView = {
                    managers?: Schema.legacy.v4.LegacyV4Manager[];
                    onlines?: Schema.legacy.v4.LegacyV4Online[];
                    bookmark?: Schema.legacy.v4.LegacyV4ChatBookmark;
                    session?: Schema.legacy.v4.LegacyV4ChatSession;
                    group?: Schema.legacy.v4.LegacyV4Group;
                };
            }
        }
        export namespace v4 {
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
            export type LegacyV4Online = {
                channelId?: string;
                personType?: string;
                personId?: string;
                id?: string;
            };
            export type LegacyV4ChatBookmark = {
                key?: string;
                chatId?: string;
                chatKey?: string;
                bookmarkKey?: string;
                channelId?: string;
                version?: number & tags.Type<"int32">;
                chatType?: string;
                personType?: string;
                personId?: string;
            };
            export type LegacyV4ChatSession = {
                key?: string;
                chatId?: string;
                chatKey?: string;
                updatedKey?: string;
                unreadKey?: string;
                channelId?: string;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                watch?: "all" | "info" | "none";
                readAt?: number;
                receivedAt?: number;
                postedAt?: number;
                updatedAt?: number;
                createdAt?: number;
                version?: number & tags.Type<"int32">;
                id?: string;
                chatType?: string;
                personType?: string;
                personId?: string;
            };
            export type LegacyV4Group = {
                id?: string;
                channelId?: string;
                name: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
                scope: "all" | "public" | "private";
                managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                icon?: string & tags.Pattern<"\\S+">;
                description?: string;
                createdAt?: number;
                updatedAt?: number;
                active?: boolean;
            };
        }
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4GroupView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If no group data provided, show a simple markdown notice
    if (!input.group) {
        return {
            type: "Markdown",
            content: "### No Group Data Available"
        };
    }

    const { group, managers, onlines, session, bookmark } = input;

    // Prepare manager avatars for an AvatarGroup
    const managerAvatars: IAutoView.IAutoViewAvatarProps[] = (managers ?? [])
        .filter(m => m.name) // ensure at least a name
        .map(m => ({
            type: "Avatar",
            src: m.avatarUrl,
            name: m.name,
            size: 32,
            variant: "blue"
        }));

    const managerCount = managers?.length ?? 0;
    const onlineCount = onlines?.length ?? 0;
    const unreadCount = session?.unread ?? 0;
    const bookmarkKey = bookmark?.bookmarkKey;

    // Build data list items dynamically, skipping undefined values
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // 1) Group scope
    if (group.scope) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Scope", variant: "subtitle2" }],
            value: [{ type: "Text", content: group.scope, variant: "body1" }]
        });
    }

    // 2) Managers (with AvatarGroup)
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Managers", variant: "subtitle2" }],
        value: {
            type: "AvatarGroup",
            childrenProps: managerAvatars,
            maxItems: 5,
            totalItems: managerCount
        }
    });

    // 3) Online members (with Badge + Icon)
    listItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: "Online", variant: "subtitle2" }],
        value: {
            type: "Badge",
            count: onlineCount,
            showZero: true,
            childrenProps: {
                type: "Icon",
                id: "user",
                size: 20,
                color: "green"
            }
        }
    });

    // 4) Unread messages (if session info exists)
    if (session) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Unread", variant: "subtitle2" }],
            value: {
                type: "Badge",
                count: unreadCount,
                showZero: true,
                childrenProps: {
                    type: "Icon",
                    id: "comment",
                    size: 20,
                    color: "red"
                }
            }
        });
    }

    // 5) Bookmark (if exists)
    if (bookmarkKey) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Bookmark", variant: "subtitle2" }],
            value: {
                type: "Chip",
                label: bookmarkKey,
                variant: "outlined",
                size: "small"
            }
        });
    }

    // Compose the card header: group name and optional icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: group.name,
        description: group.description,
        // use group.icon as a FontAwesome icon if pattern matches
        startElement: group.icon
            ? {
                  type: "Icon",
                  id: group.icon,
                  size: 32,
                  color: "blue"
              }
            : undefined
    };

    // Compose the card content: a DataList of all items
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };

    // Return a vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
