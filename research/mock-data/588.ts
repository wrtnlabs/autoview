
import Component from "../components/588";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"windows","architecture":"x64","download_url":"https://download.example.com/runner/actions-runner-windows-x64-v2.298.0.zip","filename":"actions-runner-windows-x64-v2.298.0.zip","temp_download_token":"temp_token_dummy_ABC123","sha256_checksum":"3a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef"},{"os":"macos","architecture":"arm64","download_url":"https://download.example.com/runner/actions-runner-macos-arm64-v2.298.0.tar.gz","filename":"actions-runner-macos-arm64-v2.298.0.tar.gz","sha256_checksum":"abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789"},{"os":"linux","architecture":"x86_64","download_url":"https://download.example.com/runner/actions-runner-linux-x86_64-v2.298.0.tar.gz","filename":"actions-runner-linux-x86_64-v2.298.0.tar.gz"}];
}
