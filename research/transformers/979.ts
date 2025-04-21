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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No social accounts available."
    };
  }

  // Map common providers to FontAwesome icon IDs and brand colors.
  const providerIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    github: { id: "github", color: "gray" },
    twitter: { id: "twitter", color: "cyan" },
    facebook: { id: "facebook", color: "blue" },
    linkedin: { id: "linkedin", color: "indigo" },
    instagram: { id: "instagram", color: "pink" }
  };

  // Transform each social_account into a ListItem
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((acct) => {
    const key = acct.provider.trim().toLowerCase();
    const mapping = providerIconMap[key] || { id: "link", color: "gray" };

    // Use an icon to represent the provider
    const icon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: mapping.id,
      color: mapping.color,
      size: 24
    };

    // A button that links to the social URL
    const visitButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      label: "Visit",
      href: acct.url
    };

    return {
      type: "ListItem",
      title: acct.provider,
      description: acct.url,
      startElement: icon,
      endElement: visitButton
    };
  });

  // Compose a responsive list of social accounts
  return {
    type: "List",
    // On mobile, this will stack cleanly; on wider screens, it remains a simple list
    childrenProps: listItems
  };
}
