import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.timeline_issue_events[];



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Sort events chronologically (oldest first)
  const events = React.useMemo(() => {
    if (!Array.isArray(value)) return [];
    return [...value].sort((a: any, b: any) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return da - db;
    });
  }, [value]);

  // 2. Render a human‐readable description for each event
  function renderDescription(event: any): React.ReactNode {
    const type = (event.__typename as string) || '';
    const actor = event.actor?.login || 'Someone';

    // Label added/removed
    if (type.toLowerCase().includes('labeledissueevent') || type.toLowerCase().includes('labeled_issue_event')) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          added label{' '}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
            {event.label?.name}
          </span>
        </>
      );
    }
    if (type.toLowerCase().includes('unlabeledissueevent') || type.toLowerCase().includes('unlabeled_issue_event')) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          removed label{' '}
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
            {event.label?.name}
          </span>
        </>
      );
    }

    // Renamed title
    if (type.toLowerCase().includes('renamedissueevent') || type.toLowerCase().includes('renamed_issue_event')) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          renamed title from{' '}
          <span className="italic text-gray-700">{event.previousTitle}</span> to{' '}
          <span className="italic text-gray-700">{event.currentTitle}</span>
        </>
      );
    }

    // Assigned / Unassigned
    if (type.toLowerCase().includes('assignedissueevent') || type.toLowerCase().includes('assigned_issue_event')) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          assigned to{' '}
          <span className="font-semibold text-gray-900">{event.assignee?.login}</span>
        </>
      );
    }
    if (
      type.toLowerCase().includes('unassignedissueevent') ||
      type.toLowerCase().includes('unassigned_issue_event')
    ) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          unassigned{' '}
          <span className="font-semibold text-gray-900">{event.assignee?.login}</span>
        </>
      );
    }

    // Milestoned / Demilestoned
    if (
      type.toLowerCase().includes('milestonedissueevent') ||
      type.toLowerCase().includes('milestoned_issue_event')
    ) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          added milestone{' '}
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
            {event.milestone?.title}
          </span>
        </>
      );
    }
    if (
      type.toLowerCase().includes('demilestonedissueevent') ||
      type.toLowerCase().includes('demilestoned_issue_event')
    ) {
      return (
        <>
          <span className="font-semibold text-gray-900">{actor}</span>{' '}
          removed milestone{' '}
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
            {event.milestone?.title}
          </span>
        </>
      );
    }

    // Issue Comment
    if (event.body) {
      return (
        <div className="prose prose-sm text-gray-800 line-clamp-3">
          <span className="font-semibold text-gray-900">{actor}</span> commented:
          <p>{event.body}</p>
        </div>
      );
    }

    // Fallback: generic description
    return (
      <>
        <span className="font-semibold text-gray-900">{actor}</span>{' '}
        performed <span className="italic">{type || 'an action'}</span>
      </>
    );
  }

  // 3. Main render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="space-y-4">
        {events.map((event: any, idx: number) => (
          <li key={idx} className="flex space-x-3">
            <img
              src={event.actor?.avatarUrl}
              alt={event.actor?.login || ''}
              className="h-8 w-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="text-sm text-gray-800">{renderDescription(event)}</div>
              {event.createdAt && (
                <div className="mt-1 text-xs text-gray-500">
                  {new Date(event.createdAt).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
