import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsArtifacts {
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsArtifacts.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Formats bytes into human-readable strings (KB, MB, GB, etc.).
 * @param bytes The size in bytes.
 * @returns A formatted string with appropriate unit.
 */
function humanFileSize(bytes: number): string {
  const thresh = 1024;
  if (bytes < thresh) return bytes + ' B';
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  let value = bytes;
  do {
    value /= thresh;
    u++;
  } while (value >= thresh && u < units.length - 1);
  return value.toFixed(1) + ' ' + units[u];
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each artifact to a DataListItem with an icon, name, size, and status chip
  const items: IAutoView.IAutoViewDataListItemProps[] = input.artifacts.map((artifact) => {
    // Compose the label: a file icon followed by the artifact name
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "file-zipper",       // FontAwesome icon for zipped archive
        size: 20,
        color: "blue"
      },
      {
        type: "Text",
        content: artifact.name,   // Name of the artifact
        variant: "body1",
        color: "primary"
      }
    ];

    // Compose the value: human-readable size and a status chip (Expired/Active)
    const value: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Text",
        content: humanFileSize(artifact.size_in_bytes),
        variant: "body2",
        color: "gray"
      },
      {
        type: "Chip",
        label: artifact.expired ? "Expired" : "Active",
        color: artifact.expired ? "error" : "success",
        size: "small",
        variant: "filled"
      }
    ];

    return {
      type: "DataListItem",
      label,
      value
    };
  });

  // Wrap the list into a DataList component; it's responsive for desktop and mobile
  return {
    type: "DataList",
    childrenProps: items
  };
}
