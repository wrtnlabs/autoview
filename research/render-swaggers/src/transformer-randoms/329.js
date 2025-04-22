import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        key: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUri._randomFormatUri)(),
        body: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        html_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=329.js.map