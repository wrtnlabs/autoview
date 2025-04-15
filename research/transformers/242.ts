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
  // Destructure the data object from input
  const { data } = input;
  
  // Transform each user into a DataListItem component.
  // We use an Avatar component if a profile image is provided,
  // otherwise we default to using an Icon component with a "user" icon.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = data.list.map((user) => {
    // Prepare the label component:
    let labelComponent: IAutoView.IAutoViewComponentProps;
    if (user.profileImage) {
      // Use an Avatar when a profile image exists
      labelComponent = {
        type: "Avatar",
        src: user.profileImage,
        name: user.nickname,
        // Choose a size that works well on mobile devices
        size: 40,
        variant: "primary"
      } as IAutoView.IAutoViewAvatarProps;
    } else {
      // Use an Icon as a fallback visual representation
      labelComponent = {
        type: "Icon",
        id: "user",
        size: 40,
        // Choose a color that stands out
        color: "blue"
      } as IAutoView.IAutoViewIconProps;
    }
    
    // Create a markdown content string to visually represent the user's details.
    // Markdown is used to format the text in a more engaging way.
    const markdownContent = `**Nickname:** ${user.nickname}\n\n**Relation:** ${user.reason}\n\n**ID:** ${user.id}`;
    const valueComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent
    };
    
    // Return the DataListItem component composed of the label and value components.
    return {
      type: "DataListItem",
      label: labelComponent,
      value: valueComponent
    };
  });
  
  // Compose a DataList component that contains all user list items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };
  
  // Compose a CardHeader component to display an overview of the list.
  // This includes the title and additional information about pagination.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "User Profiles",
    description: `Showing ${data.count} of ${data.totalResult} results (Page ${data.page} of ${data.totalPage})`
  };
  
  // Compose a CardContent component that contains the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };
  
  // Wrap everything in a VerticalCard to ensure a responsive and engaging layout.
  // VerticalCard can hold multiple children components, here a header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
  
  // Return the final composed component props.
  return verticalCard;
}
