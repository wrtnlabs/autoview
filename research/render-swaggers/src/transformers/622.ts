import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposAttestations {
        export type PostResponse = {
            /**
             * The ID of the attestation.
            */
            id?: number & tags.Type<"int32">;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiReposAttestations.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract the attestation ID (may be undefined)
    const attestationId = input.id;

    // Construct a descriptive title and description for the card header
    const headerTitle = "Attestation Created";
    const headerDescription = attestationId !== undefined
        ? `ID: ${attestationId}`
        : "ID not available";

    // Choose an icon to represent the attestation; uses FontAwesome kebab-case naming
    const headerIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "id-badge",       // visualize as an ID badge icon
        color: "blue",
        size: 24,
    };

    // Display the raw ID in a Chip for quick visual reference
    const idChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: attestationId !== undefined ? attestationId.toString() : "N/A",
        variant: "filled",
        color: attestationId !== undefined ? "success" : "warning",
        size: "medium",
    };

    // CardHeader: shows title, description and icon
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: headerTitle,
        description: headerDescription,
        startElement: headerIcon,
    };

    // CardContent: wraps the Chip in the card body
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: idChip,
    };

    // Return a vertical card that is responsive and mobile-friendly
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };

    return verticalCard;
}
