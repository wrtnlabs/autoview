import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_ArticleType {
        export type GetAllArticlesReponse_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_ArticleType.GetAllArticlesReponse_gt_;
        };
    }
    export namespace PaginationResponseType_lt_ArticleType {
        export type GetAllArticlesReponse_gt_ = {
            list: Schema.ArticleType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace ArticleType {
        export type Element = {
            id: number;
            contents: string;
            createdAt: Schema.Date;
            thumbnail: string | null;
            /**
             * 내가 pick(좋아요) 한 게시글인지 아닌지 여부를 의미하며 기본 값은 false이다.
            */
            myPick: boolean;
            isMine: boolean;
            writer: any;
            comments: any[];
        };
    }
    export type Date = {};
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_ArticleType.GetAllArticlesReponse_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Helper to truncate long text for preview
function getSnippet(content: string, maxLength = 100): string {
  return content.length > maxLength
    ? content.slice(0, maxLength) + "…"
    : content;
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each article into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = input.data.list.map((article) => {
    // Safely format the createdAt timestamp
    let dateStr: string;
    try {
      dateStr = new Date(article.createdAt as any).toLocaleDateString();
    } catch {
      dateStr = String(article.createdAt);
    }

    // Build the left side (label) components: optional thumbnail, snippet, and date
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (article.thumbnail) {
      labelComponents.push({
        type: "Image",
        src: article.thumbnail,
        alt: `Thumbnail for article ${article.id}`,
      });
    }

    labelComponents.push({
      type: "Text",
      variant: "body1",
      content: getSnippet(article.contents),
    });

    labelComponents.push({
      type: "Text",
      variant: "caption",
      color: "gray",
      content: dateStr,
    });

    // Build the right side (value) components: badges for comment count and likes
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    valueComponents.push({
      type: "Badge",
      count: article.comments.length,
      showZero: true,
      childrenProps: {
        type: "Icon",
        id: "comment",
        color: "gray",
      },
    });

    // Show like badge only when myPick is true; hide zero otherwise
    valueComponents.push({
      type: "Badge",
      count: article.myPick ? 1 : 0,
      showZero: false,
      childrenProps: {
        type: "Icon",
        id: "heart",
        color: article.myPick ? "red" : "gray",
      },
    });

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Wrap all items in a DataList for responsive, scrollable display
  return {
    type: "DataList",
    childrenProps: items,
  };
}
