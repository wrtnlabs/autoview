export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Helper to create a DataListItem with a label and a simple text value
    const makeTextItem = (label, value) => ({
        type: "DataListItem",
        label: { type: "Text", content: label },
        value: { type: "Text", content: value },
    });
    // Safely stringify designer info
    const designerStr = (() => {
        try {
            if (input.designer == null)
                return "N/A";
            if (typeof input.designer === "string")
                return input.designer;
            return JSON.stringify(input.designer);
        }
        catch (_a) {
            return String(input.designer);
        }
    })();
    // Determine discount display (percent or amount)
    const discountObj = input.discount;
    let discountStr = "N/A";
    if (discountObj != null) {
        if (typeof discountObj.percent === "number") {
            discountStr = `${discountObj.percent}%`;
        }
        else if (typeof discountObj.amount === "number") {
            discountStr = `$${discountObj.amount}`;
        }
        else {
            // Fallback to JSON
            discountStr = JSON.stringify(discountObj);
        }
    }
    // Count criteria entries
    const criteriaCount = Array.isArray(input.criterias) ? input.criterias.length : 0;
    // Normalize inventory values
    const invVolume = input.inventory.volume != null ? String(input.inventory.volume) : "Unlimited";
    const invPerCitizen = input.inventory.volume_per_citizen != null
        ? String(input.inventory.volume_per_citizen)
        : "Unlimited";
    // Normalize restriction values
    const restr = input.restriction;
    const accessStr = (_a = restr.access) !== null && _a !== void 0 ? _a : "N/A";
    const exclusiveStr = restr.exclusive ? "Yes" : "No";
    const restrVolume = restr.volume != null ? String(restr.volume) : "Unlimited";
    const restrPerCitizen = restr.volume_per_citizen != null ? String(restr.volume_per_citizen) : "Unlimited";
    const expiredInStr = restr.expired_in != null ? `${restr.expired_in} days` : "N/A";
    const expiredAtStr = (_b = restr.expired_at) !== null && _b !== void 0 ? _b : "N/A";
    // Dates
    const openedAt = (_c = input.opened_at) !== null && _c !== void 0 ? _c : "N/A";
    const closedAt = (_d = input.closed_at) !== null && _d !== void 0 ? _d : "N/A";
    const createdAt = (_e = input.created_at) !== null && _e !== void 0 ? _e : "N/A";
    // Build a list of data items summarizing the coupon
    const dataItems = [
        makeTextItem("ID", input.id),
        makeTextItem("Designer", designerStr),
        makeTextItem("Inventory Volume", invVolume),
        makeTextItem("Per-Citizen Inventory", invPerCitizen),
        makeTextItem("Criteria Count", String(criteriaCount)),
        makeTextItem("Discount", discountStr),
        makeTextItem("Access Level", accessStr),
        makeTextItem("Exclusive", exclusiveStr),
        makeTextItem("Max Issued", restrVolume),
        makeTextItem("Per-Citizen Max", restrPerCitizen),
        makeTextItem("Expires In", expiredInStr),
        makeTextItem("Expires At", expiredAtStr),
        makeTextItem("Opened At", openedAt),
        makeTextItem("Closed At", closedAt),
        makeTextItem("Created At", createdAt),
    ];
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Header with a coupon icon, name, and a subtitle
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Coupon #${input.id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt", // FontAwesome ticket icon
            size: 24,
            color: "blue",
        },
    };
    // Card content wrapping the data list
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card that is responsive and easy to read
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=127.js.map