
import Component from "../components/588";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"linux","architecture":"x64","download_url":"https://runner-download.example.com/linux/x64/runner-v2.285.0.tar.gz","filename":"runner-v2.285.0-linux-x64.tar.gz","temp_download_token":"sample-temp-download-token-abcdef123456","sha256_checksum":"3b1d5c182e1d3fedac34b7f6d2c1915bb1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"},{"os":"macos","architecture":"arm64","download_url":"https://runner-download.example.com/macos/arm64/runner-v2.285.0.tar.gz","filename":"runner-v2.285.0-macos-arm64.tar.gz","temp_download_token":"sample-temp-download-token-7890"},{"os":"windows","architecture":"x86","download_url":"https://runner-download.example.com/windows/x86/runner-v2.285.0.zip","filename":"runner-v2.285.0-windows-x86.zip","sha256_checksum":"e1d2c3b4a5968778695a4b3c2d1e0f9876543210fedcba0987654321fedcba09"}];
}
