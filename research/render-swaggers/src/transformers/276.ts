import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type UserView = {
            user?: Schema.user.User;
            online?: Schema.Online;
        };
    }
    export namespace user {
        export type User = {
            id?: string;
            channelId?: string;
            memberId?: string;
            veilId?: string;
            unifiedId?: string;
            type?: "member" | "lead" | "unified";
            name?: string;
            mobileNumberQualified?: boolean;
            emailQualified?: boolean;
            profile?: {
                [key: string]: {};
            };
            profileOnce?: Schema.profile.UserProfile;
            tags?: string[] & tags.MinItems<0> & tags.MaxItems<20> & tags.UniqueItems;
            userImportTags?: string[] & tags.MinItems<0> & tags.MaxItems<30>;
            alert?: number & tags.Type<"int32">;
            unread?: number & tags.Type<"int32">;
            popUpChatId?: string;
            blocked?: boolean;
            blockedKey?: string;
            unsubscribeEmail?: boolean;
            unsubscribeEmailUpdatedAt?: number;
            unsubscribeTexting?: boolean;
            unsubscribeTextingUpdatedAt?: number;
            hasChat?: boolean;
            mainChatId?: string;
            hasPushToken?: boolean;
            language?: string & tags.Default<"en">;
            country?: string;
            timeZone?: string;
            province?: string;
            city?: string;
            latitude?: number;
            longitude?: number;
            web?: Schema.WebInfo;
            mobile?: Schema.MobileInfo;
            sessionsCount?: number & tags.Type<"int32">;
            lastSeenAt?: number;
            createdAt?: number;
            updatedAt?: number;
            version?: number & tags.Type<"int32">;
            managedKey?: number & tags.Type<"int32">;
            named?: boolean;
            member?: boolean;
            email?: string;
            avatarUrl?: string;
            mobileNumber?: string & tags.Default<"+18004424000">;
            landlineNumber?: string & tags.Default<"+18004424000">;
            constrainted?: boolean;
            systemLanguage?: string & tags.Default<"en">;
        };
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
type IAutoViewTransformerInputType = Schema.desk.UserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { user, online } = input;

  // If there's no user, show a simple markdown note
  if (!user) {
    return {
      type: "Markdown",
      content: "### No user data available"
    };
  }

  // Build an avatar: prefer src; fallback to user name initials
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatarUrl,
    name: user.name || "Unknown",
    variant: "primary",
    size: 40
  };

  // Online/offline status as a colored chip
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: online ? "Online" : "Offline",
    color: online ? "green" : "gray",
    variant: "filled"
  };

  // Card header: avatar + name + type + online status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: avatar,
    title: user.name || "Unnamed User",
    description: user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : undefined,
    endElement: statusChip
  };

  // Prepare key/value rows for the user properties
  const rows: IAutoView.IAutoViewDataListItemProps[] = [];

  // Utility to push a yes/no row
  function pushBooleanRow(labelText: string, value: boolean | undefined) {
    rows.push({
      type: "DataListItem",
      label: { type: "Text", content: labelText },
      value: { type: "Text", content: value ? "Yes" : "No" }
    });
  }

  // Utility to push a generic text row
  function pushTextRow(labelText: string, valueText: string | undefined) {
    rows.push({
      type: "DataListItem",
      label: { type: "Text", content: labelText },
      value: { type: "Text", content: valueText || "-" }
    });
  }

  // Boolean flags
  pushBooleanRow("Email Qualified", user.emailQualified);
  pushBooleanRow("Mobile Qualified", user.mobileNumberQualified);
  pushBooleanRow("Has Chat", user.hasChat);

  // Numeric counters
  pushTextRow("Unread Messages", user.unread?.toString());
  pushTextRow("Alerts", user.alert?.toString());

  // Optional IDs
  if (user.channelId) {
    pushTextRow("Channel ID", user.channelId);
  }
  if (user.memberId) {
    pushTextRow("Member ID", user.memberId);
  }

  // Render as data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: rows
  };

  // Wrap the data list in card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Footer: show created/updated timestamps if available
  const footerElements: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (user.createdAt) {
    footerElements.push({
      type: "Text",
      content: `Created: ${new Date(user.createdAt).toLocaleString()}`
    });
  }
  if (user.updatedAt) {
    footerElements.push({
      type: "Text",
      content: `Updated: ${new Date(user.updatedAt).toLocaleString()}`
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerElements.length > 0 ? footerElements : undefined
  };

  // Assemble the vertical card for responsive display
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };

  return card;
}
