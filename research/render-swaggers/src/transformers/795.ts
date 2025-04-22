import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Timeline Event
     *
     * @title Timeline Event
    */
    export type timeline_issue_events = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
    export type labeled_issue_event = any;
    export type unlabeled_issue_event = any;
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
    export type timeline_comment_event = any;
    export type timeline_cross_referenced_event = any;
    export type timeline_committed_event = any;
    export type timeline_reviewed_event = any;
    export type timeline_line_commented_event = any;
    export type timeline_commit_commented_event = any;
    export type timeline_assigned_issue_event = any;
    export type timeline_unassigned_issue_event = any;
    export type state_change_issue_event = any;
}
type IAutoViewTransformerInputType = Schema.timeline_issue_events[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform timeline events into a DataList of DataListItems
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((evt: any) => {
    // Extract actor information; provide graceful fallbacks
    const actor = evt.actor ?? {};
    const actorLogin = typeof actor.login === 'string' ? actor.login : 'unknown';
    const actorAvatar = typeof actor.avatar_url === 'string' ? actor.avatar_url : undefined;

    // Build the label section: an avatar + actor name
    const labelComponents: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewTextProps | (IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewTextProps)[] = [
      {
        type: "Avatar",
        src: actorAvatar,
        name: actorLogin,
      },
      {
        type: "Text",
        content: actorLogin,
        variant: "body1",
        color: "primary",
      },
    ];

    // Build the value section: event type and timestamp
    const valueComponents: (IAutoView.IAutoViewTextProps | IAutoView.IAutoViewChipProps | IAutoView.IAutoViewMarkdownProps)[] = [];

    // Show the event name and timestamp
    const when = evt.created_at ? new Date(evt.created_at).toLocaleString() : "";
    valueComponents.push({
      type: "Text",
      content: `${evt.event ?? "event"} at ${when}`,
      variant: "caption",
      color: "gray",
    });

    // If the event adds or removes a label, show a Chip for the label name
    if (evt.label && typeof evt.label.name === "string") {
      valueComponents.push({
        type: "Chip",
        label: evt.label.name,
        variant: "outlined",
        color: "primary",
      });
    }

    // If the event has a body or message, render it as markdown (for readability and mobile responsiveness)
    if (typeof evt.body === "string" && evt.body.trim() !== "") {
      valueComponents.push({
        type: "Markdown",
        content: evt.body,
      });
    } else if (evt.commit && typeof evt.commit.message === "string") {
      // Some timeline events (commits) might carry a commit.message
      valueComponents.push({
        type: "Markdown",
        content: "\n" + evt.commit.message + "\n```",
      });
    }

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Wrap all items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
