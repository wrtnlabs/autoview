import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_CategoryType {
        export type FindAllResponse_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_CategoryType.FindAllResponse_gt_;
        };
    }
    export namespace PaginationResponseType_lt_CategoryType {
        export type FindAllResponse_gt_ = {
            list: Schema.CategoryType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace CategoryType {
        export type Element = {
            /**
             * 카테고리의 이름으로, 디자인 계열의 카테고리 이름
            */
            name: string;
            id: number;
        };
    }
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_CategoryType.FindAllResponse_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract paginated category list
  const categories = input.data.list;

  // If there are no categories, show a clear markdown message
  if (categories.length === 0) {
    return {
      type: "Markdown",
      content: "**No categories found**",
    };
  }

  // Prepare individual Chip components for each category
  const chipProps: IAutoView.IAutoViewChipProps[] = categories.map((cat) => ({
    type: "Chip",
    label: cat.name,
    color: "primary",
    variant: "outlined",
    size: "medium",
    // Use a tag icon to visually represent each category
    startElement: {
      type: "Icon",
      id: "tag",
      color: "blue",
      size: 16,
    },
  }));

  // Compose the UI as a vertical card:
  // - Header with an icon and title
  // - Content with a group of chips
  // - Footer showing pagination info
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with title and category icon
        type: "CardHeader",
        title: "Categories",
        startElement: {
          type: "Icon",
          id: "tag",
          color: "blue",
          size: 28,
        },
      },
      {
        // Card content embedding the chip group
        type: "CardContent",
        childrenProps: {
          type: "ChipGroup",
          childrenProps: chipProps,
        },
      },
      {
        // Card footer displaying the current page and total pages
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          variant: "caption",
          color: "tertiary",
          content: `Page ${input.data.page} of ${input.data.totalPage}`,
        },
      },
    ],
  };
}
