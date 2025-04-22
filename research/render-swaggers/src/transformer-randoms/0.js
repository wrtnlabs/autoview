import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        cpu: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        memory: _ro2(_recursive, _recursive ? 1 + _depth : _depth),
        resource: _ro3(_recursive, _recursive ? 1 + _depth : _depth)
    }); const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b; return ({
        user: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        system: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        })
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e; return ({
        rss: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        heapTotal: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        heapUsed: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _c !== void 0 ? _c : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        external: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _d !== void 0 ? _d : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        arrayBuffers: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _e !== void 0 ? _e : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        })
    }); }; const _ro3 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r; return ({
        fsRead: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        fsWrite: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        involuntaryContextSwitches: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _c !== void 0 ? _c : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        ipcReceived: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _d !== void 0 ? _d : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        ipcSent: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _e !== void 0 ? _e : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        majorPageFault: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _f !== void 0 ? _f : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        maxRSS: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _g !== void 0 ? _g : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        minorPageFault: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _h !== void 0 ? _h : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        sharedMemorySize: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _j !== void 0 ? _j : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        signalsCount: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _k !== void 0 ? _k : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        swappedOut: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _l !== void 0 ? _l : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        systemCPUTime: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _m !== void 0 ? _m : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        unsharedDataSize: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _o !== void 0 ? _o : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        unsharedStackSize: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _p !== void 0 ? _p : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        userCPUTime: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _q !== void 0 ? _q : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        voluntaryContextSwitches: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _r !== void 0 ? _r : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        })
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=0.js.map