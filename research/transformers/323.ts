import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Classroom accepted assignment
     *
     * @title Classroom Accepted Assignment
    */
    export type classroom_accepted_assignment = {
        /**
         * Unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * Whether an accepted assignment has been submitted.
        */
        submitted: boolean;
        /**
         * Whether a submission passed.
        */
        passing: boolean;
        /**
         * Count of student commits.
        */
        commit_count: number & tags.Type<"int32">;
        /**
         * Most recent grade.
        */
        grade: string;
        students: Schema.simple_classroom_user[];
        repository: Schema.simple_classroom_repository;
        assignment: Schema.simple_classroom_assignment;
    };
    /**
     * A GitHub user simplified for Classroom.
     *
     * @title Simple Classroom User
    */
    export type simple_classroom_user = {
        id: number & tags.Type<"int32">;
        login: string;
        avatar_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
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
type IAutoViewTransformerInputType = Schema.classroom_accepted_assignment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle the empty case by showing a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No accepted assignments available.",
            variant: "body1",
        };
    }

    // Map each accepted assignment to a vertical card
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((item) => {
        const { students, repository, commit_count, grade, submitted, passing, assignment } = item;

        // Build a group of student avatars (max 5 visible, show total count)
        const avatarGroup: IAutoView.IAutoViewAvatarGroupProps = {
            type: "AvatarGroup",
            childrenProps: students.map((user) => ({
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
            })),
            maxItems: 5,
            totalItems: students.length,
        };

        // Use the first student as the header avatar (if exists)
        const firstStudent = students[0];
        const headerAvatar: IAutoView.IAutoViewAvatarProps | undefined = firstStudent
            ? {
                  type: "Avatar",
                  src: firstStudent.avatar_url,
                  name: firstStudent.login,
              }
            : undefined;

        // Create an icon to represent pass/fail status
        const statusIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: passing ? "check-circle" : "times-circle",
            color: passing ? "green" : "red",
            size: 20,
        };

        // Compose a markdown summary of the assignment details
        const markdownContent = `
**Grade**: ${grade}  
**Commits**: ${commit_count}  
**Submitted**: ${submitted ? "✅" : "❌"}  
**Passing**: ${passing ? "✅" : "❌"}  
**Repository**: [View on GitHub](${repository.html_url})
`.trim();

        const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: markdownContent,
        };

        // Card header with assignment title, avatar, and status
        const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: assignment.title,
            startElement: headerAvatar,
            endElement: statusIcon,
        };

        // Card content containing the avatar group and markdown details
        const cardContent: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: [avatarGroup, detailsMarkdown],
        };

        // Assemble the vertical card
        return {
            type: "VerticalCard",
            childrenProps: [cardHeader, cardContent],
        };
    });

    // Wrap all cards in a carousel for a responsive, swipeable experience
    const carousel: IAutoView.IAutoViewCarouselProps = {
        type: "Carousel",
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        gutter: 16,
        autoPlay: false,
        interval: 20,
        effect: "slide",
    };

    return carousel;
}
