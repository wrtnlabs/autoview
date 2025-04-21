import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_UserType {
        export type ProfileList_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_UserType.ProfileList_gt_;
        };
    }
    export namespace PaginationResponseType_lt_UserType {
        export type ProfileList_gt_ = {
            list: Schema.UserType.Acquaintance[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace UserType {
        export type Acquaintance = {
            /**
             * 사용자의 별칭, 설정하지 않는 경우도 있다.
            */
            nickname: string;
            id: number;
            /**
             * 사용자의 프로필 이미지
            */
            profileImage?: string | null;
            reason: "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C" | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
        };
    }
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_UserType.ProfileList_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Extract the acquaintance list from the input
  const acquaintances = input.data.list;

  // If there are no acquaintances, show a simple markdown message
  if (!acquaintances || acquaintances.length === 0) {
    return {
      type: "Markdown",
      content: "#### No users to display",
    };
  }

  // Map each user to a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = acquaintances.map(
    (user) => {
      // Determine if this user follows me or I follow them
      const isFollower = user.reason.includes("팔로우한 사람");

      // Construct an Avatar for the startElement.
      // If profileImage is provided, use it; otherwise fallback to initials.
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        variant: isFollower ? "success" : "info",
        size: 40,
        name: user.nickname,
        ...(user.profileImage
          ? { src: user.profileImage }
          : {}), // do not include src if null/undefined
      };

      // A Chip to display the relationship reason
      const reasonChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: user.reason,
        color: isFollower ? "success" : "info",
        size: "small",
        variant: "filled",
      };

      // An Icon indicating the direction of follow relationship
      const directionIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: isFollower ? "user-plus" : "user-check",
        color: isFollower ? "green" : "blue",
        size: 16,
      };

      return {
        type: "ListItem",
        title: user.nickname,
        // We use endElement array to place both chip and icon on the right
        startElement: avatar,
        endElement: [reasonChip, directionIcon],
      };
    },
  );

  // Return a List component containing all acquaintances
  return {
    type: "List",
    childrenProps: listItems,
  };
}
