import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Classroom assignment
     *
     * @title Classroom Assignment
    */
    export type classroom_assignment = {
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
         * Whether it's a group assignment or individual assignment.
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
         * Whether students are admins on created repository when a student accepts the assignment.
        */
        students_are_repo_admins: boolean;
        /**
         * Whether feedback pull request will be created when a student accepts the assignment.
        */
        feedback_pull_requests_enabled: boolean;
        /**
         * The maximum allowable teams for the assignment.
        */
        max_teams: (number & tags.Type<"int32">) | null;
        /**
         * The maximum allowable members per team.
        */
        max_members: (number & tags.Type<"int32">) | null;
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
        starter_code_repository: Schema.simple_classroom_repository;
        classroom: Schema.classroom;
    };
    /**
     * A GitHub repository view for Classroom
     *
     * @title Simple Classroom Repository
    */
    export type simple_classroom_repository = {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The full, globally unique name of the repository.
        */
        full_name: string;
        /**
         * The URL to view the repository on GitHub.com.
        */
        html_url: string;
        /**
         * The GraphQL identifier of the repository.
        */
        node_id: string;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        /**
         * The default branch for the repository.
        */
        default_branch: string;
    };
    /**
     * A GitHub Classroom classroom
     *
     * @title Classroom
    */
    export type classroom = {
        /**
         * Unique identifier of the classroom.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the classroom.
        */
        name: string;
        /**
         * Whether classroom is archived.
        */
        archived: boolean;
        organization: Schema.simple_classroom_organization;
        /**
         * The URL of the classroom on GitHub Classroom.
        */
        url: string;
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple for Classroom
    */
    export type simple_classroom_organization = {
        id: number & tags.Type<"int32">;
        login: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        name: string | null;
        avatar_url: string;
    };
}
type IAutoViewTransformerInputType = Schema.classroom_assignment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Build the card header: show organization avatar and assignment title with classroom name
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: input.classroom.name,
    // Show the organization avatar as the startElement
    startElement: {
      type: "Avatar",
      src: input.classroom.organization.avatar_url,
      name: input.classroom.organization.login,
      variant: "primary",
      size: 40,
    },
  };

  // 2. Prepare metrics for the DataList: accepted, submitted, passing, max teams, max members, deadline
  const metrics: Array<[string, string]> = [
    ["Accepted", String(input.accepted)],
    ["Submitted", String(input.submitted)],
    ["Passing", String(input.passing)],
    // Null means unlimited
    ["Max Teams", input.max_teams === null ? "Unlimited" : String(input.max_teams)],
    ["Max Members", input.max_members === null ? "Unlimited" : String(input.max_members)],
    ["Deadline", input.deadline ? new Date(input.deadline).toLocaleString() : "No due date"],
  ];

  // Map each metric into a DataListItemProps
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = metrics.map(
    ([labelText, valueText]) => ({
      type: "DataListItem",
      // Label on the left
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "gray",
        content: labelText,
      },
      // Value on the right
      value: {
        type: "Text",
        variant: "body1",
        content: valueText,
      },
    })
  );

  // 3. Wrap metrics into a DataList component inside CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems,
    },
  };

  // 4. Build footer buttons: view repo always, accept assignment if enabled
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [];

  // Button to view the starter code repository on GitHub
  footerButtons.push({
    type: "Button",
    label: "View Repo",
    href: input.starter_code_repository.html_url,
    variant: "outlined",
    color: "primary",
    size: "medium",
  });

  // If invitations are enabled, allow a direct "Accept Assignment" button
  if (input.invitations_enabled) {
    footerButtons.push({
      type: "Button",
      label: "Accept Assignment",
      href: input.invite_link,
      variant: "contained",
      color: "secondary",
      size: "medium",
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButtons,
  };

  // 5. Compose final VerticalCard with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
