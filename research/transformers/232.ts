import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_CategoryType {
    export type FindAllResponse_gt_ = {
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
        data: PaginationResponseType_lt_CategoryType.FindAllResponse_gt_;
    };
}
namespace PaginationResponseType_lt_CategoryType {
    export type FindAllResponse_gt_ = {
        list: CategoryType.Element[] & tags.JsonSchemaPlugin<{
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
namespace CategoryType {
    export type Element = {
        /**
         * 카테고리의 이름으로, 디자인 계열의 카테고리 이름
        */
        name: string & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
type IAutoViewTransformerInputType = TryPagination_lt_CategoryType.FindAllResponse_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract data from the input
  const { data } = input;
  const { list, totalPage, totalResult, page } = data;

  // For each category element, create a DataListItem component.
  // Here we use an Avatar as the label to visually represent the category,
  // and a Markdown component as the value to display additional details.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((category) => {
    // Create an Avatar for the category label:
    // We use the category name as the avatar's name.
    const avatarLabel: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: category.name,
      variant: "primary",
      size: 32
    };

    // Create a Markdown component to display category details (e.g., its ID)
    const detailMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**ID:** ${category.id}`
    };

    return {
      type: "DataListItem",
      // Use the avatar for a visual label instead of plain text
      label: avatarLabel,
      value: detailMarkdown
    };
  });

  // Create a DataList component that will contain all the DataListItems.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Create a CardHeader to introduce the list.
  // Using an Icon in the startElement to enhance the visual appeal.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Categories",
    description: `Found ${list.length} categor${list.length === 1 ? "y" : "ies"}.`,
    startElement: {
      type: "Icon",
      id: "list", // icon name depicting a list; must be in kebab-case without prefix
      size: 16,
      color: "blue"
    }
  };

  // Create a CardContent that embeds our DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Create a CardFooter to display pagination info using a Markdown component.
  const paginationMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `**Page:** ${page} / ${totalPage}\n**Total Items:** ${totalResult}`
  };
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: paginationMarkdown
  };

  // Compose the final UI component using a VerticalCard to wrap header, content, and footer.
  // A VerticalCard is chosen for its responsive design and ease of arranging components vertically.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the composed UI component.
  return verticalCard;
}
