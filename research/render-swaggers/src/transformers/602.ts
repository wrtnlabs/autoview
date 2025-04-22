import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunsArtifacts {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            artifacts: Schema.artifact[];
        };
    }
    /**
     * An artifact
     *
     * @title Artifact
    */
    export type artifact = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the artifact.
        */
        name: string;
        /**
         * The size in bytes of the artifact.
        */
        size_in_bytes: number & tags.Type<"int32">;
        url: string;
        archive_download_url: string;
        /**
         * Whether or not the artifact has expired.
        */
        expired: boolean;
        created_at: (string & tags.Format<"date-time">) | null;
        expires_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        /**
         * The SHA256 digest of the artifact. This field will only be populated on artifacts uploaded with upload-artifact v4 or newer. For older versions, this field will be null.
        */
        digest?: string | null;
        workflow_run?: {
            id?: number & tags.Type<"int32">;
            repository_id?: number & tags.Type<"int32">;
            head_repository_id?: number & tags.Type<"int32">;
            head_branch?: string;
            head_sha?: string;
        } | null;
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunsArtifacts.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no artifacts, show a simple markdown message
  if (!input.artifacts || input.artifacts.length === 0) {
    return {
      type: "Markdown",
      content: "### No artifacts found for this workflow run",
    };
  }

  // Sort artifacts by creation date descending (newest first)
  const sortedArtifacts = [...input.artifacts].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });

  // Map each artifact to a VerticalCard component
  const cards: IAutoView.IAutoViewVerticalCardProps[] = sortedArtifacts.map((artifact) => {
    // Convert size to kilobytes and format
    const sizeKB = Math.round((artifact.size_in_bytes || 0) / 1024);
    const sizeLabel = `${sizeKB.toLocaleString()} KB`;

    // Format creation date in a locale‑aware way
    const createdLabel = artifact.created_at
      ? new Date(artifact.created_at).toLocaleDateString()
      : "Unknown";

    // Build chips for metadata: size, creation date, and expiration status
    const sizeChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: sizeLabel,
      size: "small",
      variant: "outlined",
    };
    const dateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: createdLabel,
      size: "small",
      variant: "outlined",
    };
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: artifact.expired ? "Expired" : "Active",
      size: "small",
      variant: "filled",
      color: artifact.expired ? "error" : "success",
    };

    return {
      type: "VerticalCard",
      childrenProps: [
        // Header with file icon and artifact name
        {
          type: "CardHeader",
          title: artifact.name,
          startElement: {
            type: "Icon",
            id: "archive",      // FontAwesome "archive" icon
            color: "blue",
            size: 24,
          },
        },
        // Content area with metadata chips
        {
          type: "CardContent",
          childrenProps: [
            {
              type: "ChipGroup",
              maxItems: 3,
              childrenProps: [sizeChip, dateChip, statusChip],
            },
          ],
        },
      ],
    };
  });

  // Wrap all cards in a responsive carousel
  return {
    type: "Carousel",
    autoPlay: false,
    infinite: false,
    indicators: true,
    navControls: true,
    effect: "slide",
    interval: 40,
    gutter: 16,
    childrenProps: cards,
  };
}
