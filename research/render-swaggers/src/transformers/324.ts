import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Grade for a student or groups GitHub Classroom assignment
     *
     * @title Classroom Assignment Grade
    */
    export type classroom_assignment_grade = {
        /**
         * Name of the assignment
        */
        assignment_name: string;
        /**
         * URL of the assignment
        */
        assignment_url: string;
        /**
         * URL of the starter code for the assignment
        */
        starter_code_url: string;
        /**
         * GitHub username of the student
        */
        github_username: string;
        /**
         * Roster identifier of the student
        */
        roster_identifier: string;
        /**
         * Name of the student's assignment repository
        */
        student_repository_name: string;
        /**
         * URL of the student's assignment repository
        */
        student_repository_url: string;
        /**
         * Timestamp of the student's assignment submission
        */
        submission_timestamp: string;
        /**
         * Number of points awarded to the student
        */
        points_awarded: number & tags.Type<"int32">;
        /**
         * Number of points available for the assignment
        */
        points_available: number & tags.Type<"int32">;
        /**
         * If a group assignment, name of the group the student is in
        */
        group_name?: string;
    };
}
type IAutoViewTransformerInputType = Schema.classroom_assignment_grade[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Clone and sort by descending percentage score for better prominence of top performers
  const sorted = [...input].sort((a, b) => {
    const pa = a.points_awarded / a.points_available;
    const pb = b.points_awarded / b.points_available;
    return pb - pa;
  });

  // Build a DataListItem for each grade record
  const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map((record) => {
    const percent = record.points_awarded / record.points_available;
    // Choose a chip color based on score thresholds
    const chipColor: IAutoView.IAutoViewChipProps["color"] =
      percent >= 0.9
        ? "success"
        : percent >= 0.75
        ? "primary"
        : percent >= 0.5
        ? "warning"
        : "error";

    // GitHub avatar for the student
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: `https://github.com/${record.github_username}.png`,
      name: record.github_username,
      size: 32,
      variant: "secondary",
    };

    // A chip showing "points_awarded/points_available"
    const scoreChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${record.points_awarded}/${record.points_available}`,
      color: chipColor,
      size: "small",
      variant: "filled",
    };

    // A button linking to the student's repository
    const repoButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: ["Repo"],
      href: record.student_repository_url,
      startElement: { type: "Icon", id: "github", size: 16, color: "gray" },
      variant: "text",
      size: "small",
      color: "primary",
    };

    // Markdown block with assignment link, submission timestamp, optional starter code and group info.
    // Using Markdown for rich link formatting and line breaks.
    const detailsMd: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content:
        `**Assignment:** [${record.assignment_name}](${record.assignment_url})  \n` +
        `**Submitted:** ${new Date(record.submission_timestamp).toLocaleString()}` +
        (record.starter_code_url
          ? `  \n**Starter Code:** [Link](${record.starter_code_url})`
          : "") +
        (record.group_name ? `  \n**Group:** ${record.group_name}` : ""),
    };

    return {
      // DataListItem displays a "label" (left) and a "value" (right)
      type: "DataListItem",
      label: [
        // Avatar + username
        avatar,
        {
          type: "Text",
          content: record.github_username,
          variant: "subtitle1",
          color: "primary",
        },
        // Detailed info below
        detailsMd,
      ],
      value: [
        // Visual score chip + a direct link button
        scoreChip,
        repoButton,
      ],
    };
  });

  // Return the DataList component wrapping all items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
