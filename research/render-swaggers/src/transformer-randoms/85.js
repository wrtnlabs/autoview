import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import typia from "typia";
export function random() {
    return (() => { let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        });
    }; })()();
}
//# sourceMappingURL=85.js.map