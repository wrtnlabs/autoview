import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "commit",
            () => "wiki_commit",
            () => "issue_title",
            () => "issue_body",
            () => "issue_comment",
            () => "discussion_title",
            () => "discussion_body",
            () => "discussion_comment",
            () => "pull_request_title",
            () => "pull_request_body",
            () => "pull_request_comment",
            () => "pull_request_review",
            () => "pull_request_review_comment"
        ])(),
        details: __typia_transform__randomPick._randomPick([
            () => "any type used...",
            () => undefined
        ])()
    }); let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro0()
        });
    }; })()();
}
//# sourceMappingURL=870.js.map