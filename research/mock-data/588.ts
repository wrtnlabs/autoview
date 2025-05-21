
import Component from "../components/588";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"windows","architecture":"x64","download_url":"https://downloads.example.com/runner/windows/x64/runner-windows-x64-test.zip","filename":"runner-windows-x64-test.zip","temp_download_token":"test-token-abc123","sha256_checksum":"a3b2c1d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0"},{"os":"linux","architecture":"arm64","download_url":"https://downloads.example.com/runner/linux/arm64/runner-linux-arm64-test.tar.gz","filename":"runner-linux-arm64-test.tar.gz","sha256_checksum":"f0e1d2c3b4a5968778695a4b3c2d1e0f98765432abcdef0123456789abcdef01"}];
}
