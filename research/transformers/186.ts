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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // 1. Card header: show group name and description, with an avatar derived from the group name
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.group?.name ?? "Group",
    description: input.group?.description,
    startElement: {
      type: "Avatar",
      name: input.group?.name ?? "",
      size: 40,
    },
  };

  // 2. Card content: render a DataList of managers, or a Markdown notice if none
  let content: IAutoView.IAutoViewCardContentProps;
  if (input.managers && input.managers.length > 0) {
    const listItems: IAutoView.IAutoViewDataListItemProps[] =
      input.managers.map((mgr) => ({
        type: "DataListItem",
        // label shows avatar + manager name
        label: [
          {
            type: "Avatar",
            src: mgr.avatarUrl,
            name: mgr.name,
            size: 32,
          },
          {
            type: "Text",
            content: mgr.name,
            variant: "body1",
          },
        ],
        // value shows email in a lighter style
        value: {
          type: "Text",
          content: mgr.email,
          variant: "body2",
          color: "secondary",
        },
      }));

    content = {
      type: "CardContent",
      // DataList is itself a presentation component, so we can pass it directly
      childrenProps: {
        type: "DataList",
        childrenProps: listItems,
      },
    };
  } else {
    // fallback message when no managers are present
    content = {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: "⚠️ No managers available in this group.",
      },
    };
  }

  // 3. Card footer: summary chips for online count, unread session messages, bookmark status
  const footerChips: IAutoView.IAutoViewChipProps[] = [];

  if (input.onlines) {
    footerChips.push({
      type: "Chip",
      label: `${input.onlines.length} Online`,
      color: "success",
      size: "small",
      variant: "filled",
    });
  }

  if (input.session) {
    const unread = input.session.unread ?? 0;
    footerChips.push({
      type: "Chip",
      label: `Unread: ${unread}`,
      // highlight if there are unread messages
      color: unread > 0 ? "error" : "primary",
      size: "small",
      variant: "filled",
    });
  }

  if (input.bookmark) {
    footerChips.push({
      type: "Chip",
      label: "Bookmarked",
      color: "warning",
      size: "small",
      variant: "filled",
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // pass chips array directly; if empty, it's simply ignored
    childrenProps: footerChips.length > 0 ? footerChips : undefined,
  };

  // 4. Compose the VerticalCard with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
