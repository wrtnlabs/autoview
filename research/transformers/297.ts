import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CANNOT_FIND_DESIGNER_PROFILE = any;
    export namespace ResponseForm_lt_UserType {
        export type DetailProfile_gt_ = any;
    }
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms arbitrary input into an AutoView component tree.
// Attempts to detect error vs. “user profile” shape and renders accordingly.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1) Error handling: if input carries an `error` property or is null/undefined
  if (input === null || input === undefined || typeof (input as any).error === "string") {
    const msg = (input as any)?.error ?? "Unable to load data.";
    return {
      type: "Markdown",
      content: `# Error\n\n${msg}`
    };
  }

  // 2) Assume `input` is a user‐profile‐like shape:
  //    { name, title, avatarUrl, bio, skills: string[], social: { iconName, url }[] }
  const {
    name,
    title,
    avatarUrl,
    bio,
    skills,
    social
  } = input as {
    name?: string;
    title?: string;
    avatarUrl?: string;
    bio?: string;
    skills?: string[];
    social?: Array<{ iconName: string; url: string }>;
  };

  // Build the CardHeader: show avatar + name + title
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: name,
    description: title,
    startElement: avatarUrl
      ? { type: "Avatar", src: avatarUrl, name }
      : undefined
  };

  // Build the CardContent: markdown bio + skills as chips
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (bio) {
    // Use markdown for rich formatting
    contentChildren.push({
      type: "Markdown",
      content: bio
    });
  }
  if (Array.isArray(skills) && skills.length > 0) {
    const chips = skills.map((skill) => ({
      type: "Chip" as const,
      label: skill,
      variant: "outlined" as const,
      size: "small" as const,
      color: "primary" as const
    }));
    contentChildren.push({
      type: "ChipGroup" as const,
      childrenProps: chips
    });
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren.length ? contentChildren : undefined
  };

  // Build the CardFooter: social links as icon buttons wrapped in text‐buttons
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (Array.isArray(social) && social.length > 0) {
    social.forEach((item) => {
      if (item.iconName && item.url) {
        footerChildren.push({
          type: "Button" as const,
          variant: "text" as const,
          size: "small" as const,
          href: item.url,
          startElement: {
            type: "Icon" as const,
            id: item.iconName
          }
        });
      }
    });
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren.length ? footerChildren : undefined
  };

  // 3) Final composition: a responsive VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
