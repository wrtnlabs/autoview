import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.issue_event_for_issue[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Count events by type
  const eventCounts = React.useMemo(() => {
    return value.reduce<Record<string, number>>((acc, ev) => {
      const type = (ev as any).__typename || 'Event';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  }, [value]);

  // Sort events by createdAt descending
  const sortedEvents = React.useMemo(() => {
    return [...value].sort((a, b) => {
      const aTime = new Date((a as any).createdAt).getTime() || 0;
      const bTime = new Date((b as any).createdAt).getTime() || 0;
      return bTime - aTime;
    });
  }, [value]);

  // Format ISO date to readable string
  function formatDate(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  // Generate a human-friendly description for common GitHub issue events
  function renderEventDescription(ev: any): string {
    const type = ev.__typename || '';
    switch (type) {
      case 'LabeledIssueEvent':
        return `added label "${ev.label?.name}"`;
      case 'UnlabeledIssueEvent':
        return `removed label "${ev.label?.name}"`;
      case 'AssignedIssueEvent':
        return `assigned to ${ev.assignee?.login || 'someone'}`;
      case 'UnassignedIssueEvent':
        return `unassigned from ${ev.assignee?.login || 'someone'}`;
      case 'MilestonedIssueEvent':
        return `added to milestone "${ev.milestone?.title}"`;
      case 'DemilestonedIssueEvent':
        return `removed from milestone "${ev.milestone?.title}"`;
      case 'RenamedIssueEvent':
        return `renamed title to "${ev.currentTitle}"`;
      case 'ReviewRequestedIssueEvent':
        return `requested review from ${ev.requestedReviewer?.login || 'user'}`;
      case 'ReviewRequestRemovedIssueEvent':
        return `removed review request for ${ev.requestedReviewer?.login || 'user'}`;
      case 'ReviewDismissedIssueEvent':
        return `dismissed a review`;
      case 'LockedIssueEvent':
        return `locked the conversation`;
      case 'UnlockedIssueEvent':
        return `unlocked the conversation`;
      case 'AddedToProjectIssueEvent':
        return `added to project "${ev.project?.name}"`;
      case 'MovedColumnInProjectIssueEvent':
        return `moved column in project "${ev.project?.name}"`;
      case 'RemovedFromProjectIssueEvent':
        return `removed from project "${ev.project?.name}"`;
      case 'ConvertedNoteToIssueIssueEvent':
        return `converted a note to an issue`;
      default:
        return type ? type.replace(/([A-Z])/g, ' $1').trim() : 'performed an action';
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Summary */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Issue Events Summary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {Object.entries(eventCounts).map(([type, count]) => (
          <div
            key={type}
            className="flex flex-col items-center bg-gray-50 p-2 rounded-lg border border-gray-100"
          >
            <span className="text-sm text-gray-600 truncate">
              {type.replace(/IssueEvent$/, '').replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="text-lg font-bold text-gray-800">{count}</span>
          </div>
        ))}
      </div>

      {/* Recent Events Timeline */}
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Recent Events</h2>
      <ul className="space-y-4">
        {sortedEvents.slice(0, 5).map((ev, idx) => (
          <li key={idx} className="flex items-start space-x-3">
            <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                { (ev as any).actor?.avatarUrl && (
                  <img
                    src={(ev as any).actor.avatarUrl}
                    alt={(ev as any).actor.login}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {(ev as any).actor?.login || 'Unknown'}
                </span>
                <span className="text-xs text-gray-400">{formatDate((ev as any).createdAt)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {renderEventDescription(ev)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
