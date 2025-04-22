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
  const user = input.user;
  // If there's no user, render a friendly markdown message
  if (!user) {
    return {
      type: "Markdown",
      content: "### No user data available\n> Please check back later."
    };
  }

  // Build the avatar component for the user
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatarUrl,
    name: user.name || undefined,
    variant: user.type === "member" ? "primary" : "secondary",
    size: 40
  };

  // Wrap the avatar in a badge to indicate online status
  const avatarBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    dot: true,
    color: input.online ? "success" : "gray",
    offset: { vertical: "bottom", horizontal: "right" },
    // Badge overlays on the avatar
    childrenProps: avatar
  };

  // Header of the card: avatar+badge, name and user type
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: avatarBadge,
    title: user.name,
    description: user.type
  };

  // Helper to build an icon + text presentation component
  const makeIconText = (
    iconId: string,
    label: string
  ): IAutoView.IAutoViewPresentationComponentProps[] => [
    { type: "Icon", id: iconId, color: "gray", size: 16 },
    { type: "Text", content: ` ${label}`, variant: "body2" }
  ];

  // Build the data list items for the user's key fields
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  // Email
  details.push({
    type: "DataListItem",
    label: makeIconText("envelope", "Email"),
    value: [
      { type: "Icon", id: "at", color: "gray", size: 16 },
      { type: "Text", content: ` ${user.email || "N/A"}`, variant: "body2" }
    ]
  });

  // Phone
  details.push({
    type: "DataListItem",
    label: makeIconText("phone", "Phone"),
    value: [
      { type: "Icon", id: "phone-alt", color: "gray", size: 16 },
      { type: "Text", content: ` ${user.mobileNumber || "N/A"}`, variant: "body2" }
    ]
  });

  // Channel ID, if present
  if (user.channelId) {
    details.push({
      type: "DataListItem",
      label: makeIconText("comments", "Channel"),
      value: { type: "Text", content: user.channelId, variant: "body2" }
    });
  }

  // Unread count, if present
  if (typeof user.unread === "number") {
    details.push({
      type: "DataListItem",
      label: makeIconText("inbox", "Unread"),
      value: {
        type: "Badge",
        count: user.unread,
        maxCount: 99,
        showZero: false,
        childrenProps: { type: "Icon", id: "inbox", color: "gray", size: 16 }
      }
    });
  }

  // Compose the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: details
  };

  // Wrap details in card content
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Assemble a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
