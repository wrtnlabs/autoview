import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type starred_repository = any;
    export type repository = any;
}
type IAutoViewTransformerInputType = any[] | any[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If input is not an array or empty, show a friendly message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Text",
      variant: "body1",
      content: "No data available to display.",
    };
  }

  // Heuristic: if items look like GitHub repositories (have 'name' property), render as a DataList
  const first = input[0] as any;
  if (typeof first === "object" && typeof first.name === "string") {
    const items = (input as any[]).map((repo): IAutoView.IAutoViewDataListItemProps => {
      const name = repo.name as string;
      const url = repo.html_url as string | undefined;
      const description = repo.description as string | undefined;
      const ownerAvatar = repo.owner?.avatar_url as string | undefined;
      const stars = typeof repo.stargazers_count === "number" ? repo.stargazers_count : undefined;
      const language = typeof repo.language === "string" ? repo.language : undefined;

      // Build chips for stars and language
      const chips: IAutoView.IAutoViewChipProps[] = [];

      if (stars !== undefined) {
        chips.push({
          type: "Chip",
          label: stars.toLocaleString(),
          variant: "outlined",
          startElement: {
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 16,
          },
        });
      }

      if (language) {
        chips.push({
          type: "Chip",
          label: language,
          variant: "outlined",
        });
      }

      const chipGroup: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: chips,
      };

      // Compose the DataListItem
      const listItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        // Label: repository title with optional link
        label: [
          {
            type: "Text",
            variant: "h6",
            color: "primary",
            content: url ? `[${name}](${url})` : name,
          } as IAutoView.IAutoViewTextProps,
        ],
        // Value: description and chips
        value: [
          // Description as markdown to allow rich text
          description
            ? ({
                type: "Markdown",
                content: description,
              } as IAutoView.IAutoViewMarkdownProps)
            : null,
          // Show chips if any
          chips.length > 0 ? chipGroup : null,
        ].filter(Boolean) as IAutoView.IAutoViewPresentationComponentProps[],
      };

      // If owner avatar exists, show it as leading icon
      if (ownerAvatar) {
        (listItem as any).startElement = {
          type: "Avatar",
          src: ownerAvatar,
          variant: "primary",
          size: 32,
        } as IAutoView.IAutoViewAvatarProps;
      }

      return listItem;
    });

    return {
      type: "DataList",
      childrenProps: items,
    };
  }

  // Fallback: render raw JSON in a code block using Markdown
  const jsonStr = JSON.stringify(input, null, 2);
  return {
    type: "Markdown",
    content: "json\n" + jsonStr + "\n```",
  };
}
