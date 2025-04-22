import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type GroupView = {
            managers?: Schema.Manager[];
            onlines?: Schema.Online[];
            bookmark?: Schema.ChatBookmark;
            session?: Schema.ChatSession;
            group?: Schema.Group;
        };
    }
    export type Manager = {
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
        email?: string;
        showEmailToFront?: boolean;
        mobileNumber?: string & tags.Default<"+18004424000">;
        showMobileNumberToFront?: boolean;
        roleId?: string;
        removed?: boolean;
        createdAt?: number;
        updatedAt?: number;
        removedAt?: number;
        displayAsChannel?: boolean;
        defaultGroupWatch?: "all" | "info" | "none";
        defaultDirectChatWatch?: "all" | "info" | "none";
        defaultUserChatWatch?: "all" | "info" | "none";
        chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
        meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
        showPrivateMessagePreview?: boolean;
        operatorScore?: number;
        touchScore?: number;
        avatar?: Schema.TinyFile;
        operatorEmailReminder?: boolean;
        receiveUnassignedAlert?: boolean;
        receiveUnassignedChatAlert?: boolean;
        receiveUnassignedMeetAlert?: boolean;
        operator?: boolean;
        operatorStatusId?: string;
        defaultAllMentionImportant?: boolean;
        userMessageImportant?: boolean;
        assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
        autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100>;
        enableAutoAssignOnSync?: boolean;
        statusEmoji?: string;
        statusText?: string;
        statusClearAt?: number;
        doNotDisturb?: boolean;
        doNotDisturbClearAt?: number;
        accountDoNotDisturb?: boolean;
        accountDoNotDisturbClearAt?: number;
        enableReactedMessageIndex?: boolean;
        enableTeamMentionedMessageIndex?: boolean;
        operatorUpdatedAt?: number;
        pcInboxMeetAlert?: boolean;
        mobileInboxMeetAlert?: boolean;
        pcTeamChatMeetAlert?: boolean;
        mobileTeamChatMeetAlert?: boolean;
        managerId?: string;
        avatarUrl?: string;
        /**
         * @deprecated
        */
        meetOperator?: boolean;
        emailForFront?: string;
        mobileNumberForFront?: string & tags.Default<"+18004424000">;
    };
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
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
    export type ChatBookmark = {
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
    export type ChatSession = {
        key?: string;
        chatId?: string;
        teamChatSectionId?: string;
        chatKey?: string;
        updatedKey?: string;
        unreadKey?: string;
        channelId?: string;
        alert?: number & tags.Type<"int32">;
        unread?: number & tags.Type<"int32">;
        watch?: "all" | "info" | "none";
        allMentionImportant?: boolean;
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
    export type Group = {
        id?: string;
        channelId?: string;
        title: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
        scope: "all" | "public" | "private";
        managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        liveMeetId?: string;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        /**
         * @deprecated
        */
        name?: string;
        active?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.desk.GroupView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { managers = [], onlines = [], session, bookmark, group } = input;

    // 1. Build card header showing group title, description and scope tag
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: group?.title,
        description: group?.description,
        // use a users icon to indicate this is a group
        startElement: {
            type: "Icon",
            id: "users",
            color: "blue",
            size: 24,
        },
        // show group scope as a chip
        endElement: group?.scope
            ? {
                  type: "Chip",
                  label: group.scope,
                  variant: "outlined",
                  size: "small",
                  // map scope to a semantic color
                  color:
                      group.scope === "all"
                          ? "blue"
                          : group.scope === "public"
                          ? "green"
                          : "gray",
              }
            : undefined,
    };

    // 2. Build card content: avatar group for managers + data list for online people
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (managers.length > 0) {
        // Transform each manager into an avatar
        const avatars: IAutoView.IAutoViewAvatarProps[] = managers.map((mgr) => ({
            type: "Avatar",
            src: mgr.avatarUrl,
            name: mgr.name,
            variant: "cyan",
            size: 32,
        }));

        contentChildren.push({
            type: "AvatarGroup",
            childrenProps: avatars,
            maxItems: 5,
            totalItems: managers.length,
        });
    }

    if (onlines.length > 0) {
        // Build a data list of online users
        const items: IAutoView.IAutoViewDataListItemProps[] = onlines.map((o) => ({
            type: "DataListItem",
            // label slot: show person type or fallback to "User"
            label: [
                {
                    type: "Text",
                    content: `${o.personType ?? "User"}: ${o.personId ?? o.id ?? ""}`,
                },
            ],
            // value slot: we could show channelId or id
            value: [
                {
                    type: "Text",
                    content: o.channelId ? `Channel: ${o.channelId}` : "",
                },
            ],
        }));

        contentChildren.push({
            type: "DataList",
            childrenProps: items,
        });
    }

    // If there's no content to show, render a markdown notice
    if (contentChildren.length === 0) {
        contentChildren.push({
            type: "Markdown",
            content: "### No group members or online sessions available",
        });
    }

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    // 3. Build card footer: unread badge and bookmark chip
    const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (session?.unread !== undefined) {
        footerChildren.push({
            type: "Badge",
            count: session.unread,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "blue",
                size: 20,
            },
        });
    }

    if (bookmark?.bookmarkKey) {
        footerChildren.push({
            type: "Chip",
            label: bookmark.bookmarkKey,
            startElement: {
                type: "Icon",
                id: "bookmark",
                color: "orange",
                size: 20,
            },
            variant: "filled",
            color: "orange",
            size: "small",
        });
    }

    // If no footer elements, add a subtle note
    if (footerChildren.length === 0) {
        footerChildren.push({
            type: "Text",
            content: "No active sessions or bookmarks",
        });
    }

    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };

    // 4. Assemble into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
