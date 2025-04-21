import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Issue Event for Issue
     *
     * @title Issue Event for Issue
    */
    export type issue_event_for_issue = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
    export type labeled_issue_event = any;
    export type unlabeled_issue_event = any;
    export type assigned_issue_event = any;
    export type unassigned_issue_event = any;
    export type milestoned_issue_event = any;
    export type demilestoned_issue_event = any;
    export type renamed_issue_event = any;
    export type review_requested_issue_event = any;
    export type review_request_removed_issue_event = any;
    export type review_dismissed_issue_event = any;
    export type locked_issue_event = any;
    export type added_to_project_issue_event = any;
    export type moved_column_in_project_issue_event = any;
    export type removed_from_project_issue_event = any;
    export type converted_note_to_issue_issue_event = any;
}
type IAutoViewTransformerInputType = Schema.issue_event_for_issue[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each raw event into a DataListItem for display
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((event) => {
    // Derive a human-friendly event name from common fields
    const eventName =
      (event as any).event ||
      (event as any).action ||
      (event as any).type ||
      "Event";

    // If the event has an actor/user with an avatar, use it; otherwise fall back to an icon
    const actor = (event as any).actor || (event as any).user;
    const hasAvatar = actor?.avatar_url || actor?.avatar;
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = hasAvatar
      ? {
          type: "Avatar",
          src: actor.avatar_url || actor.avatar,
          name: actor.login || actor.name,
          size: 24,
        }
      : {
          type: "Icon",
          id: "bell",
          size: 24,
          color: "blue",
        };

    // Label combines the avatar/icon with the event name text
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      startElement,
      {
        type: "Text",
        content: eventName,
        variant: "body1",
      },
    ];

    // Display the full event payload as a collapsible markdown code block
    // This keeps JSON pretty-printed but within a markdown renderer
    const markdownContent =
      "json\n" + JSON.stringify(event, null, 2) + "\n```";
    const value: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent,
    };

    return {
      type: "DataListItem",
      label,
      value,
    };
  });

  // Wrap all items in a responsive DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
