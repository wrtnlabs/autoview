import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Runner Application
     *
     * @title Runner Application
    */
    export type runner_application = {
        os: string;
        architecture: string;
        download_url: string;
        filename: string;
        /**
         * A short lived bearer token used to download the runner, if needed.
        */
        temp_download_token?: string;
        sha256_checksum?: string;
    };
}
type IAutoViewTransformerInputType = Schema.runner_application[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms an array of runner_application objects into a carousel of cards,
 * each showing details and a download action.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to choose an OS-specific icon
    const mapOSIcon = (os: string): IAutoView.IAutoViewIconProps => {
        const name = os.toLowerCase();
        let iconId: string = "server";
        if (name.includes("windows")) iconId = "windows";
        else if (name.includes("linux")) iconId = "linux";
        else if (name.includes("darwin") || name.includes("mac")) iconId = "apple";
        return {
            type: "Icon",
            id: iconId,
            size: 32,
            color: "blue",
        };
    };

    // Empty case: show a friendly message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No runners available.\nPlease check back later.",
        };
    }

    // Build a VerticalCard for each runner entry
    const cards = input.map((item) => {
        // Compose download URL, attach token if present
        const downloadUrl = item.temp_download_token
            ? `${item.download_url}?token=${encodeURIComponent(item.temp_download_token)}`
            : item.download_url;

        // Card header: filename as title, OS/arch as description, OS icon
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: item.filename,
            description: `${item.os} / ${item.architecture}`,
            startElement: mapOSIcon(item.os),
        };

        // Card content: show a list of details via markdown for readability
        const detailsMdLines = [
            `- **Download URL:** [Click here](${downloadUrl})`,
            item.sha256_checksum ? `- **SHA256:** \`${item.sha256_checksum}\`` : undefined,
        ].filter(Boolean) as string[];

        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: detailsMdLines.join("\n"),
            },
        };

        // Card footer: a prominent download button
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "Download",
                color: "primary",
                variant: "contained",
                size: "medium",
                href: downloadUrl,
            },
        };

        // Combine into a vertical card
        const card: IAutoView.IAutoViewVerticalCardProps = {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };

        return card;
    });

    // If only one card, return it directly for a simpler UI
    if (cards.length === 1) {
        return cards[0];
    }

    // Otherwise return a carousel to allow swiping through multiple runners
    const carousel: IAutoView.IAutoViewCarouselProps = {
        type: "Carousel",
        childrenProps: cards,
        gutter: 16,
        indicators: true,
        navControls: true,
        infinite: false,
        autoPlay: false,
    };

    return carousel;
}
