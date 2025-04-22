import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import typia from "typia";
export function random() {
    return (() => { let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        });
    }; })()();
}
//# sourceMappingURL=1015.js.map