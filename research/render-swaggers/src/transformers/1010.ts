import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Social media account
     *
     * @title Social account
    */
    export type social_account = {
        provider: string;
        url: string;
    };
}
type IAutoViewTransformerInputType = Schema.social_account[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Maps common social providers to FontAwesome icon IDs.
 * Extend this map to support more providers as needed.
 */
const providerIconMap: Record<string, string> = {
  twitter: "twitter",
  github: "github",
  facebook: "facebook",
  linkedin: "linkedin",
  instagram: "instagram",
  youtube: "youtube",
  // Add more mappings here...
};

/**
 * Transforms an array of social account objects into an AutoView component
 * that visually represents each account with an icon and a link button.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown notice
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "*No social accounts available.*",
    };
  }

  // Build a DataListItem for each social account
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((account) => {
    const providerKey = account.provider.trim().toLowerCase();
    // Fallback to a generic link icon if provider is unknown
    const iconId = providerIconMap[providerKey] || "link";

    // Left side: icon + provider name
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: iconId,
        size: 16,
        color: "blue",
      },
      {
        type: "Text",
        content: ` ${account.provider}`,
        variant: "body1",
      },
    ];

    // Right side: a text button that navigates to the social URL
    const visitButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      label: "Visit",
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        size: 12,
      },
      href: account.url,
    };

    return {
      type: "DataListItem",
      label: labelComponents,
      value: visitButton,
    };
  });

  // Wrap all items in a DataList for responsive display
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  return dataList;
}
