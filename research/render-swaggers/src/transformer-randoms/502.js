import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        name: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        registry_type: "maven_repository",
        username: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        visibility: __typia_transform__randomPick._randomPick([
            () => "private",
            () => "all",
            () => "selected"
        ])(),
        created_at: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatDatetime._randomFormatDatetime)()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=502.js.map