import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pages Health Check Status
     *
     * @title Pages Health Check Status
    */
    export type pages_health_check = {
        domain?: {
            host?: string;
            uri?: string;
            nameservers?: string;
            dns_resolves?: boolean;
            is_proxied?: boolean | null;
            is_cloudflare_ip?: boolean | null;
            is_fastly_ip?: boolean | null;
            is_old_ip_address?: boolean | null;
            is_a_record?: boolean | null;
            has_cname_record?: boolean | null;
            has_mx_records_present?: boolean | null;
            is_valid_domain?: boolean;
            is_apex_domain?: boolean;
            should_be_a_record?: boolean | null;
            is_cname_to_github_user_domain?: boolean | null;
            is_cname_to_pages_dot_github_dot_com?: boolean | null;
            is_cname_to_fastly?: boolean | null;
            is_pointed_to_github_pages_ip?: boolean | null;
            is_non_github_pages_ip_present?: boolean | null;
            is_pages_domain?: boolean;
            is_served_by_pages?: boolean | null;
            is_valid?: boolean;
            reason?: string | null;
            responds_to_https?: boolean;
            enforces_https?: boolean;
            https_error?: string | null;
            is_https_eligible?: boolean | null;
            caa_error?: string | null;
        };
        alt_domain?: {
            host?: string;
            uri?: string;
            nameservers?: string;
            dns_resolves?: boolean;
            is_proxied?: boolean | null;
            is_cloudflare_ip?: boolean | null;
            is_fastly_ip?: boolean | null;
            is_old_ip_address?: boolean | null;
            is_a_record?: boolean | null;
            has_cname_record?: boolean | null;
            has_mx_records_present?: boolean | null;
            is_valid_domain?: boolean;
            is_apex_domain?: boolean;
            should_be_a_record?: boolean | null;
            is_cname_to_github_user_domain?: boolean | null;
            is_cname_to_pages_dot_github_dot_com?: boolean | null;
            is_cname_to_fastly?: boolean | null;
            is_pointed_to_github_pages_ip?: boolean | null;
            is_non_github_pages_ip_present?: boolean | null;
            is_pages_domain?: boolean;
            is_served_by_pages?: boolean | null;
            is_valid?: boolean;
            reason?: string | null;
            responds_to_https?: boolean;
            enforces_https?: boolean;
            https_error?: string | null;
            is_https_eligible?: boolean | null;
            caa_error?: string | null;
        } | null;
    };
}
type IAutoViewTransformerInputType = Schema.pages_health_check;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to build a ChipProps for a boolean status
  const makeStatusChip = (
    label: string,
    status: boolean | null | undefined
  ): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    size: "small",
    variant: "filled",
    // if status is truthy => success, if false/null => error, if undefined => default gray
    color: status === true ? "success" : status === false || status === null ? "error" : "gray",
  });

  // If there's no primary domain data, show a simple text fallback
  if (!input.domain) {
    return {
      type: "Text",
      content: "No domain health check data available.",
      variant: "body1",
    };
  }

  // Prepare an array of domain entries: primary plus alt if present
  const entries: { label: string; data: NonNullable<typeof input.domain> }[] = [
    { label: "Primary Domain", data: input.domain },
  ];
  if (input.alt_domain) {
    entries.push({ label: "Alternative Domain", data: input.alt_domain });
  }

  // Map each domain entry to a VerticalCardProps
  const cards: IAutoView.IAutoViewVerticalCardProps[] = entries.map(({ label, data }) => {
    // Determine overall validity for icon in header
    const overallValid = data.is_valid_domain && data.dns_resolves && data.responds_to_https;

    // Define a set of key/label to visualize as chips
    const booleanFields: [keyof typeof data, string][] = [
      ["dns_resolves", "DNS Resolves"],
      ["responds_to_https", "HTTPS Responds"],
      ["enforces_https", "HTTPS Enforced"],
      ["is_valid_domain", "Valid Domain"],
      ["is_pages_domain", "GitHub Pages"],
    ];

    const chips = booleanFields
      // include only fields that exist (not undefined)
      .filter(([key]) => data[key] !== undefined)
      .map(([key, title]) => makeStatusChip(title, data[key] as boolean | null | undefined));

    return {
      type: "VerticalCard",
      childrenProps: [
        // Card header with domain name, URI, and an icon indicating overall status
        {
          type: "CardHeader",
          title: data.host ?? "–",
          description: data.uri ?? undefined,
          startElement: {
            type: "Icon",
            id: overallValid ? "check-circle" : "exclamation-circle",
            color: overallValid ? "green" : "red",
            size: 24,
          },
        },
        // Card content showing a chip group of statuses
        {
          type: "CardContent",
          childrenProps: {
            type: "ChipGroup",
            maxItems: 5,
            childrenProps: chips,
          },
        },
      ],
    };
  });

  // If there's only one card, return it directly; otherwise wrap in a carousel
  if (cards.length === 1) {
    return cards[0];
  } else {
    return {
      type: "Carousel",
      autoPlay: false,
      infinite: false,
      navControls: true,
      indicators: true,
      interval: 40,
      effect: "slide",
      childrenProps: cards,
    };
  }
}
