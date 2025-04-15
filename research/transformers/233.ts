import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_UserType {
    export type ProfileList_gt_ = {
        result: true & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        code: 1000 & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        requestToResponse?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        data: PaginationResponseType_lt_UserType.ProfileList_gt_;
    };
}
namespace PaginationResponseType_lt_UserType {
    export type ProfileList_gt_ = {
        list: UserType.Acquaintance[] & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        count: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalResult: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalPage: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        search?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        page: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
namespace UserType {
    export type Acquaintance = {
        /**
         * 사용자의 별칭, 설정하지 않는 경우도 있다.
        */
        nickname: string & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "minLength",
                    value: 1
                },
                {
                    kind: "maxLength",
                    value: 50
                }
            ],
            "x-typia-jsDocTags": [
                {
                    name: "minLength",
                    text: [
                        {
                            text: "1",
                            kind: "text"
                        }
                    ]
                },
                {
                    name: "maxLength",
                    text: [
                        {
                            text: "50",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 사용자의 프로필 이미지
        */
        profileImage?: (string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | null;
        reason: "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C" | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
    };
}
type IAutoViewTransformerInputType = TryPagination_lt_UserType.ProfileList_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract pagination and list data from the input
  const { data } = input;
  const { list, count, totalResult, totalPage, page } = data;
  
  // Helper: Build a data list item for each user profile
  const dataListItems = (list && list.length > 0 ? list : []).map<IAutoView.IAutoViewDataListItemProps>((user) => {
    // For the avatar component, use the profile image if available,
    // otherwise use the nickname initials via the 'name' property.
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: (user.profileImage || undefined) as any, // 'as any' used due to string & tags.Format<"uri"> constraint
      name: user.nickname,
      size: 40, // choose an appropriate size from allowed sizes (e.g., 40)
      // variant can be assigned if needed. Leaving it undefined uses default styling.
    };

    // Use a markdown component to visually present additional user information.
    // We include the user id and the reason string formatted in markdown.
    const markdownContent = `**ID:** ${user.id}\n\n**Reason:** ${user.reason}`;

    const details: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent
    };

    // Compose the data list item where label is the avatar and value is the markdown component.
    return {
      type: "DataListItem",
      label: avatar,
      value: details
    };
  });

  // If there are no items, display a friendly empty state using markdown.
  const emptyState: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `### No User Profiles Found\n\nThere are no profiles to display at this time.`
  };

  // Build data list component: if there are items, use them; otherwise, show the empty state.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems.length > 0 ? dataListItems : [ {
      type: "DataListItem",
      label: emptyState, // reuse markdown as label to show the message
    } ]
  };

  // Create a CardHeader component to display title and summary info.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "User Profiles",
    description: `Showing ${list.length} of ${totalResult} results. Page ${page} of ${totalPage}.`,
    // For visual interest, display an icon on the left side.
    startElement: {
      type: "Icon",
      id: "user",  // icon name "user" in kebab-case; ensure it exists in the icon library
      size: 24,
      color: "blue"  // choose a suitable color
    }
  };

  // Create a CardContent component that encapsulates the data list.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [ dataList ]
  };

  // Create a CardFooter component for pagination information.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        content: `Page ${page} of ${totalPage} | Total Profiles: ${totalResult}`,
        variant: "footnote",
        color: "gray"
      }
    ]
  };

  // Compose the final UI component using a Vertical Card.
  // This card is responsive and its children (header, content, and footer) will be displayed
  // in a layout suitable for a web browser on mobile and desktop.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  return verticalCard;
}
