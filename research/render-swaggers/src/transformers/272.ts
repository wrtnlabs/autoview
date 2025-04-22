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
  // If there's no user data, show a friendly markdown message
  if (!input.user) {
    return {
      type: "Markdown",
      content: "### User data not available\nPlease check back later or refresh the page."
    };
  }

  const user = input.user;

  // Determine online status
  const isOnline = Boolean(input.online);
  // A small status chip with an icon
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: isOnline ? "Online" : "Offline",
    color: isOnline ? "success" : "gray",
    size: "small",
    variant: "outlined",
    startElement: {
      type: "Icon",
      id: "circle",
      color: isOnline ? "green" : "gray",
      size: 8
    }
  };

  // User avatar, fallback to initials if avatarUrl is missing
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatarUrl,
    name: user.name,
    variant: "primary",
    size: 40
  };

  // Card header with avatar, name, user type, and status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user.name || "Unknown User",
    description: user.type
      ? user.type.charAt(0).toUpperCase() + user.type.slice(1)
      : undefined,
    startElement: avatar,
    endElement: statusChip
  };

  // Helper to create a text component
  const makeText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text
  });

  // Build a list of user details
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  if (user.email) {
    details.push({
      type: "DataListItem",
      label: makeText("Email"),
      value: makeText(user.email)
    });
  }

  if (user.mobileNumber) {
    details.push({
      type: "DataListItem",
      label: makeText("Mobile"),
      value: {
        type: "Button",
        variant: "text",
        size: "small",
        startElement: {
          type: "Icon",
          id: "mobile-alt",
          size: 16,
          color: "blue"
        },
        label: user.mobileNumber
      }
    });
  }

  if (user.lastSeenAt) {
    const dateString = new Date(user.lastSeenAt).toLocaleString();
    details.push({
      type: "DataListItem",
      label: makeText("Last Seen"),
      value: makeText(dateString)
    });
  }

  if (typeof user.sessionsCount === "number") {
    details.push({
      type: "DataListItem",
      label: makeText("Sessions"),
      value: makeText(user.sessionsCount.toString())
    });
  }

  if (Array.isArray(user.tags) && user.tags.length > 0) {
    // Render all user tags as a chip group
    const tagChips: IAutoView.IAutoViewChipProps[] = user.tags.map((tag) => ({
      type: "Chip",
      label: tag,
      size: "small",
      variant: "outlined",
      color: "secondary"
    }));
    details.push({
      type: "DataListItem",
      label: makeText("Tags"),
      value: {
        type: "ChipGroup",
        childrenProps: tagChips,
        maxItems: 10
      }
    });
  }

  // Wrap details in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: details
  };

  // Main card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Compose a vertical card to make it responsive and stackable on mobile
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return card;
}
