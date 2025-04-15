import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_ArticleType {
    export type GetAllArticlesReponse_gt_ = {
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
        data: PaginationResponseType_lt_ArticleType.GetAllArticlesReponse_gt_;
    };
}
namespace PaginationResponseType_lt_ArticleType {
    export type GetAllArticlesReponse_gt_ = {
        list: ArticleType.Element[] & tags.JsonSchemaPlugin<{
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
namespace ArticleType {
    export type Element = {
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        contents: string & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        createdAt: Date;
        thumbnail: (string & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>) | null;
        /**
         * 내가 pick(좋아요) 한 게시글인지 아닌지 여부를 의미하며 기본 값은 false이다.
        */
        myPick: boolean & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        isMine: boolean & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        writer: any;
        comments: any[] & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
type Date = {};
type IAutoViewTransformerInputType = TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the paginated articles data from the input.
  const {
    data: { list, count, totalPage, page }
  } = input;

  // Transform each article into a DataListItem component.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((article) => {
    // Build the "label" array with visual elements.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // If a thumbnail is provided, add it as an Image component.
    if (article.thumbnail) {
      labelComponents.push({
        type: "Image",
        src: article.thumbnail,
        alt: `Thumbnail for article ${article.id}`
      } as IAutoView.IAutoViewImageProps);
    }
    // If the article is "picked" by the user, add a heart icon.
    if (article.myPick) {
      labelComponents.push({
        type: "Icon",
        id: "heart", // icon name in kebab-case without fa prefix
        color: "red",
        size: 16
      } as IAutoView.IAutoViewIconProps);
    }
    // If no visual element was added, we add a minimal default icon
    if (labelComponents.length === 0) {
      labelComponents.push({
        type: "Icon",
        id: "file-alt", // default document icon in kebab-case
        color: "gray",
        size: 16
      } as IAutoView.IAutoViewIconProps);
    }

    // Use Markdown component to render the article contents.
    // This allows formatting if contents include markdown syntax.
    const valueComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: article.contents
    };

    return {
      type: "DataListItem",
      // The label is an array of visual elements (images/icons).
      label: labelComponents,
      // The value displays article contents in markdown format.
      value: valueComponent
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Create a DataList component containing all article items.
  const dataListComponent: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Create a CardHeader component to summarize the article list.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Articles",
    description: `Showing ${count} articles. Page ${page} of ${totalPage}.`,
    // Use an icon as the start element to provide a visual cue.
    startElement: {
      type: "Icon",
      id: "article", // using a generic article/list icon name
      color: "blue",
      size: 24
    } as IAutoView.IAutoViewIconProps
  };

  // Wrap the DataList component inside a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The childrenProps can be a single component or an array; here we choose the DataList.
    childrenProps: dataListComponent
  };

  // Compose a VerticalCard that groups the header and article list content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the final composed value,
  // which is of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
