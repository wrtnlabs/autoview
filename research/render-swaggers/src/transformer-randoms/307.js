import * as __typia_transform__randomFormatUriTemplate from "typia/lib/internal/_randomFormatUriTemplate.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6; return ({
        current_user_url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        current_user_authorizations_html_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        authorizations_url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        code_search_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _d !== void 0 ? _d : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        commit_search_url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        emails_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        emojis_url: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        events_url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _h !== void 0 ? _h : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        feeds_url: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _j !== void 0 ? _j : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        followers_url: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _k !== void 0 ? _k : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        following_url: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        gists_url: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _m !== void 0 ? _m : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        hub_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(); }
        ])(),
        issue_search_url: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _o !== void 0 ? _o : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        issues_url: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _p !== void 0 ? _p : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        keys_url: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _q !== void 0 ? _q : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        label_search_url: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _r !== void 0 ? _r : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        notifications_url: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _s !== void 0 ? _s : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        organization_url: ((_t = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _t !== void 0 ? _t : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        organization_repositories_url: ((_u = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _u !== void 0 ? _u : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        organization_teams_url: ((_v = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _v !== void 0 ? _v : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        public_gists_url: ((_w = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _w !== void 0 ? _w : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        rate_limit_url: ((_x = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _x !== void 0 ? _x : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        repository_url: ((_y = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _y !== void 0 ? _y : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        repository_search_url: ((_z = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _z !== void 0 ? _z : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        current_user_repositories_url: ((_0 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _0 !== void 0 ? _0 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        starred_url: ((_1 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _1 !== void 0 ? _1 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        starred_gists_url: ((_2 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _2 !== void 0 ? _2 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        topic_search_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(); }
        ])(),
        user_url: ((_3 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _3 !== void 0 ? _3 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        user_organizations_url: ((_4 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _4 !== void 0 ? _4 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        user_repositories_url: ((_5 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _5 !== void 0 ? _5 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)(),
        user_search_url: ((_6 = _generator === null || _generator === void 0 ? void 0 : _generator.uriTemplate) !== null && _6 !== void 0 ? _6 : __typia_transform__randomFormatUriTemplate._randomFormatUriTemplate)()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=307.js.map