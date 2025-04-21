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
  // If there is no user information, show a markdown notice
  if (!input.user) {
    return {
      type: "Markdown",
      content: "## No user data available\nPlease check back later or contact support."
    };
  }

  const user = input.user;

  // Helper to safely push DataList items
  const details: IAutoView.IAutoViewDataListItemProps[] = [];
  function addDetail(label: string, value: string | number | boolean | undefined) {
    if (value === undefined || value === null || String(value).trim() === "") return;
    details.push({
      type: "DataListItem",
      // Label on the left
      label: {
        type: "Text",
        content: label,
        variant: "subtitle2"
      },
      // Value on the right
      value: {
        type: "Text",
        content: String(value),
        variant: "body2"
      }
    });
  }

  // Collect key user properties
  addDetail("ID", user.id);
  addDetail("Email", user.email);
  addDetail("Phone", user.mobileNumber);
  addDetail("Country", user.country);
  addDetail("Language", user.language);
  if (user.lastSeenAt) {
    // Convert timestamp to locale string
    addDetail("Last Seen", new Date(user.lastSeenAt).toLocaleString());
  }

  // Build the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: details
  };

  // Header: avatar + name + role
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user.name || user.id || "Unnamed User",
    // Capitalize the user.type if present
    description: user.type
      ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
      : undefined,
    startElement: user.avatarUrl
      ? {
          type: "Avatar",
          src: user.avatarUrl,
          name: user.name,
          size: 40,
          variant: "primary"
        }
      : undefined
  };

  // Footer: online status chip
  const onlineChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.online ? "Online" : "Offline",
    color: input.online ? "success" : "gray",
    variant: "filled",
    size: "small"
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: onlineChip
  };

  // Compose a vertical card: header + content + footer
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: dataList
      },
      footer
    ]
  };
}
