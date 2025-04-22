import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        project_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUri._randomFormatUri)(),
        cards_url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUri._randomFormatUri)(),
        id: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _d !== void 0 ? _d : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _e !== void 0 ? _e : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _f !== void 0 ? _f : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        created_at: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _h !== void 0 ? _h : __typia_transform__randomFormatDatetime._randomFormatDatetime)()
    }); }; let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro0()
        });
    }; })()();
}
//# sourceMappingURL=568.js.map