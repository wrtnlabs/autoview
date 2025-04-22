import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        status: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "deployment_in_progress",
            () => "syncing_files",
            () => "finished_file_sync",
            () => "updating_pages",
            () => "purging_cdn",
            () => "deployment_cancelled",
            () => "deployment_failed",
            () => "deployment_content_failed",
            () => "deployment_attempt_error",
            () => "deployment_lost",
            () => "succeed"
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=820.js.map