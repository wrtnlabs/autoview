import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Classroom assignment
     *
     * @title Simple Classroom Assignment
    */
    export type simple_classroom_assignment = {
        /**
         * Unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * Whether an accepted assignment creates a public repository.
        */
        public_repo: boolean;
        /**
         * Assignment title.
        */
        title: string;
        /**
         * Whether it's a Group Assignment or Individual Assignment.
        */
        type: "individual" | "group";
        /**
         * The link that a student can use to accept the assignment.
        */
        invite_link: string;
        /**
         * Whether the invitation link is enabled. Visiting an enabled invitation link will accept the assignment.
        */
        invitations_enabled: boolean;
        /**
         * Sluggified name of the assignment.
        */
        slug: string;
        /**
         * Whether students are admins on created repository on accepted assignment.
        */
        students_are_repo_admins: boolean;
        /**
         * Whether feedback pull request will be created on assignment acceptance.
        */
        feedback_pull_requests_enabled: boolean;
        /**
         * The maximum allowable teams for the assignment.
        */
        max_teams?: (number & tags.Type<"int32">) | null;
        /**
         * The maximum allowable members per team.
        */
        max_members?: (number & tags.Type<"int32">) | null;
        /**
         * The selected editor for the assignment.
        */
        editor: string;
        /**
         * The number of students that have accepted the assignment.
        */
        accepted: number & tags.Type<"int32">;
        /**
         * The number of students that have submitted the assignment.
        */
        submitted: number & tags.Type<"int32">;
        /**
         * The number of students that have passed the assignment.
        */
        passing: number & tags.Type<"int32">;
        /**
         * The programming language used in the assignment.
        */
        language: string;
        /**
         * The time at which the assignment is due.
        */
        deadline: (string & tags.Format<"date-time">) | null;
        classroom: Schema.simple_classroom;
    };
    /**
     * A GitHub Classroom classroom
     *
     * @title Simple Classroom
    */
    export type simple_classroom = {
        /**
         * Unique identifier of the classroom.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the classroom.
        */
        name: string;
        /**
         * Returns whether classroom is archived or not.
        */
        archived: boolean;
        /**
         * The url of the classroom on GitHub Classroom.
        */
        url: string;
    };
}
type IAutoViewTransformerInputType = Schema.simple_classroom_assignment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Group assignments by classroom to render subheaders
  const assignmentsByClassroom: Record<string, Schema.simple_classroom_assignment[]> = {};
  for (const assignment of input) {
    const key = `${assignment.classroom.id}`;
    if (!assignmentsByClassroom[key]) {
      assignmentsByClassroom[key] = [];
    }
    assignmentsByClassroom[key].push(assignment);
  }

  // Build a flat array of ListSubheader and ListItem components
  const childrenProps: Array<IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps> = [];

  // Iterate classrooms in insertion order
  for (const key of Object.keys(assignmentsByClassroom)) {
    const group = assignmentsByClassroom[key]!;
    if (group.length === 0) continue;
    const classroom = group[0].classroom;

    // Add a subheader for this classroom
    childrenProps.push({
      type: "ListSubheader",
      stickToTop: true,
      childrenProps: [
        {
          type: "Text",
          content: classroom.name,
          variant: "h6",
        },
      ],
    });

    // For each assignment in the classroom, add a ListItem
    for (const assignment of group) {
      // Format the deadline or show placeholder
      const dueText = assignment.deadline
        ? new Date(assignment.deadline).toLocaleDateString()
        : "No deadline";

      // Choose icon based on individual vs group
      const iconId = assignment.type === "group" ? "users" : "user";

      // Compose the endElement as chips showing accepted/submitted/passing counts
      const endChips: IAutoView.IAutoViewChipProps[] = [
        {
          type: "Chip",
          label: `Accepted: ${assignment.accepted}`,
          color: "success",
          variant: "outlined",
          size: "small",
        },
        {
          type: "Chip",
          label: `Submitted: ${assignment.submitted}`,
          color: "info",
          variant: "outlined",
          size: "small",
        },
        {
          type: "Chip",
          label: `Passing: ${assignment.passing}`,
          color: assignment.passing / Math.max(assignment.submitted, 1) >= 0.5 ? "primary" : "warning",
          variant: "outlined",
          size: "small",
        },
      ];

      childrenProps.push({
        type: "ListItem",
        title: assignment.title,
        description: `Due: ${dueText} | Lang: ${assignment.language}`,
        // Leading icon for assignment type
        startElement: {
          type: "Icon",
          id: iconId,
          color: "blue",
          size: 24,
        },
        // Trailing chips summarizing stats
        endElement: endChips,
        // Make the title clickable if there is an invite link
        href: assignment.invite_link,
      });
    }
  }

  // Return a responsive List component
  return {
    type: "List",
    childrenProps,
  };
}
