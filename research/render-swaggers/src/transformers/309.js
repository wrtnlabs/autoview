export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map advisory severity to UI color variants
    const severityColorMap = {
        critical: 'error',
        high: 'error',
        medium: 'warning',
        low: 'info',
        unknown: 'gray',
    };
    // Helper: create a simple text component
    const makeText = (content) => ({
        type: 'Text',
        content: Array.isArray(content) ? content : [content],
    });
    // Build a list of key-value pairs as DataListItems
    const items = [];
    // GHSA ID with link button
    items.push({
        type: 'DataListItem',
        label: makeText('Advisory'),
        value: {
            type: 'Button',
            label: input.ghsa_id,
            variant: 'text',
            startElement: { type: 'Icon', id: 'arrow-up-right-from-square' },
            href: input.html_url,
        },
    });
    // CVE ID if available
    if (input.cve_id) {
        items.push({
            type: 'DataListItem',
            label: makeText('CVE'),
            value: {
                type: 'Chip',
                label: input.cve_id,
                variant: 'outlined',
            },
        });
    }
    // Advisory Type
    items.push({
        type: 'DataListItem',
        label: makeText('Type'),
        value: {
            type: 'Chip',
            label: input.type,
            variant: 'filled',
            color: 'primary',
        },
    });
    // Severity
    items.push({
        type: 'DataListItem',
        label: makeText('Severity'),
        value: {
            type: 'Chip',
            label: input.severity.toUpperCase(),
            variant: 'filled',
            color: severityColorMap[input.severity] || 'gray',
        },
    });
    // Published timestamp
    items.push({
        type: 'DataListItem',
        label: makeText('Published'),
        value: makeText(new Date(input.published_at).toLocaleDateString()),
    });
    // Last updated
    items.push({
        type: 'DataListItem',
        label: makeText('Updated'),
        value: makeText(new Date(input.updated_at).toLocaleDateString()),
    });
    // GitHub Reviewed date if present
    if (input.github_reviewed_at) {
        items.push({
            type: 'DataListItem',
            label: makeText('Reviewed'),
            value: makeText(new Date(input.github_reviewed_at).toLocaleDateString()),
        });
    }
    // NVD Published date if present
    if (input.nvd_published_at) {
        items.push({
            type: 'DataListItem',
            label: makeText('NVD Published'),
            value: makeText(new Date(input.nvd_published_at).toLocaleDateString()),
        });
    }
    // CVSS details if available
    if (input.cvss && (input.cvss.score !== null || input.cvss.vector_string)) {
        const vec = (_a = input.cvss.vector_string) !== null && _a !== void 0 ? _a : 'N/A';
        const score = input.cvss.score !== null ? input.cvss.score.toFixed(1) : 'N/A';
        items.push({
            type: 'DataListItem',
            label: makeText('CVSS'),
            value: {
                type: 'Chip',
                label: `${vec} (${score})`,
                variant: 'outlined',
            },
        });
    }
    // Summary
    items.push({
        type: 'DataListItem',
        label: makeText('Summary'),
        value: {
            type: 'Markdown',
            content: input.summary,
        },
    });
    // Detailed description if available
    if (input.description) {
        items.push({
            type: 'DataListItem',
            label: makeText('Description'),
            value: {
                type: 'Markdown',
                content: input.description,
            },
        });
    }
    // References: each as a link button
    if (Array.isArray(input.references) && input.references.length > 0) {
        const refButtons = input.references.map((url, idx) => ({
            type: 'Button',
            label: `Link ${idx + 1}`,
            variant: 'text',
            startElement: { type: 'Icon', id: 'link' },
            href: url,
        }));
        items.push({
            type: 'DataListItem',
            label: makeText('References'),
            // group buttons inline
            value: refButtons, // DataListItem.value can accept array of presentation components
        });
    }
    // Return a DataList component that is responsive and mobile-friendly
    return {
        type: 'DataList',
        childrenProps: items,
    };
}
//# sourceMappingURL=309.js.map