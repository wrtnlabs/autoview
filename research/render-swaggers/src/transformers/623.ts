import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposAttestations {
        export type GetResponse = {
            attestations?: {
                /**
                 * The attestation's Sigstore Bundle.
                 * Refer to the [Sigstore Bundle Specification](https://github.com/sigstore/protobuf-specs/blob/main/protos/sigstore_bundle.proto) for more information.
                */
                bundle?: {
                    mediaType?: string;
                    verificationMaterial?: {};
                    dsseEnvelope?: {};
                };
                repository_id?: number & tags.Type<"int32">;
                bundle_url?: string;
            }[];
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiReposAttestations.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms the attestations response into a responsive list UI.
// Each attestation is rendered as a ListItem with a repository icon,
// the repository ID, and a button linking to the Sigstore bundle.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const attestations = input.attestations ?? [];

  // If no attestations, show a friendly markdown message.
  if (attestations.length === 0) {
    return {
      type: "Markdown",
      content: "### No attestations available\nThere are currently no attestations to display.",
    };
  }

  // Map each attestation to a ListItemProps.
  const items: IAutoView.IAutoViewListItemProps[] = attestations.map((attestation, index) => {
    // Repository ID might be missing—fall back to "Unknown"
    const repoId = typeof attestation.repository_id === "number"
      ? attestation.repository_id.toString()
      : "Unknown";

    // Button to view the Sigstore bundle, if URL is provided.
    const bundleUrl = attestation.bundle_url;
    const viewButton: IAutoView.IAutoViewButtonProps | undefined = bundleUrl
      ? {
          type: "Button",
          href: bundleUrl,
          variant: "text",
          color: "blue",
          size: "small",
          // prepend an external-link icon to the label
          startElement: {
            type: "Icon",
            id: "external-link-alt",
            color: "blue",
            size: 16,
          },
          label: "View Bundle",
        }
      : undefined;

    return {
      type: "ListItem",
      // Display the repository ID in the title
      title: `Repository #${repoId}`,
      // Use a database icon as the leading element
      startElement: {
        type: "Icon",
        id: "database",
        color: "indigo",
        size: 24,
      },
      // If a bundle URL exists, show it as the description
      description: bundleUrl ?? undefined,
      // If we have a view button, attach it on the right
      endElement: viewButton,
      // For accessibility or testing, add a unique key via href or index
      href: bundleUrl ?? undefined,
    };
  });

  // Return a responsive List component with all items
  return {
    type: "List",
    childrenProps: items,
  };
}
