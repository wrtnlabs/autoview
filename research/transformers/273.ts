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

  // Helper: safely format any primitive or undefined
  const formatValue = (value: string | number | undefined, placeholder = "N/A"): string =>
    value !== undefined && value !== null && value !== "" ? String(value) : placeholder;

  // If no user data, render a friendly markdown message
  if (!user) {
    return {
      type: "Markdown",
      content: "### No user data available\nPlease check back later or contact support."
    };
  }

  // 1. Build the card header with avatar, name and online status indicator
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Display user name or fallback to ID
    title: user.name || formatValue(user.id),
    // Show user type as subtitle (e.g. member, lead, unified)
    description: user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : undefined,
    // Avatar: show image if available, otherwise initials derived from name
    startElement: {
      type: "Avatar",
      src: user.avatarUrl,
      name: user.name,
      size: 40,
      variant: "primary"
    },
    // Status indicator: green when online object exists, gray otherwise
    endElement: {
      type: "Icon",
      id: "circle",
      color: online ? "green" : "gray",
      size: 12
    }
  };

  // 2. Prepare a list of key user properties for details view
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  function addDetail(label: string, value: string | number | undefined) {
    dataItems.push({
      type: "DataListItem",
      // Label cell
      label: {
        type: "Text",
        content: label + ":",
        variant: "body2",
        color: "secondary"
      },
      // Value cell
      value: {
        type: "Text",
        content: formatValue(value),
        variant: "body1"
      }
    });
  }

  addDetail("Email", user.emailQualified ? user.email : undefined);
  addDetail("Mobile", user.mobileNumberQualified ? user.mobileNumber : undefined);
  addDetail("Country", user.country);
  addDetail("Language", user.language);
  addDetail("Sessions", user.sessionsCount);
  addDetail(
    "Last Seen",
    user.lastSeenAt ? new Date(user.lastSeenAt).toLocaleString() : undefined
  );

  // 3. Assemble the data list component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems
  };

  // 4. Build a chip group to display user tags (if any)
  const tagsList = Array.isArray(user.tags) ? user.tags : [];
  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: tagsList.map((tag) => ({
      type: "Chip",
      label: tag,
      size: "small",
      variant: "outlined",
      color: "primary"
    }))
  };

  // 5. Combine data list and tags into card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList, chipGroup]
  };

  // 6. Return a vertical card wrapping header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
