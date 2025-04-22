import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.classroom;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare organization display name (fall back to login if name is null)
  const orgDisplayName = input.organization.name ?? input.organization.login;

  // Avatar for the organization
  const orgAvatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: input.organization.avatar_url,
    name: input.organization.login,
    variant: "primary",
    size: 40,
  };

  // Chip for archived status, only shown when archived
  const archivedChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: "Archived",
    color: "error",
    variant: "filled",
    size: "small",
  };

  // Chip for organization identity
  const orgChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: orgDisplayName,
    color: "primary",
    variant: "outlined",
    size: "small",
    startElement: orgAvatar,  // show avatar inside chip
  };

  // Button to open the classroom URL
  const viewClassroomButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View Classroom",
    variant: "contained",
    color: "primary",
    size: "medium",
    href: input.url,
    startElement: {
      type: "Icon",
      id: "external-link-alt",  // using a FontAwesome-style icon
      color: "blue",
      size: 16,
    },
  };

  // Card header: displays classroom name and ID with an avatar
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: orgAvatar,
  };

  // Card content: chips for archived status and organization
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      // Show archived chip only if classroom is archived
      ...(input.archived ? [archivedChip] : []),
      // Always show organization chip
      orgChip,
    ],
  };

  // Card footer: action button
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: viewClassroomButton,
  };

  // Assemble into a vertical card for a clear, mobile-friendly layout
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  return verticalCard;
}
