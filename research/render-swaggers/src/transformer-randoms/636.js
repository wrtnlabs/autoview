import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        enabled: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _b !== void 0 ? _b : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        })
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=636.js.map