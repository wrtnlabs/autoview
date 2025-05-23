
import Component from "../components/400";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"Windows","architecture":"x64","download_url":"https://download.example.com/test-runner/windows/x64/runner_v1.2.3.zip","filename":"runner_v1.2.3_windows_x64.zip","temp_download_token":"temp_token_ABC123_TEST","sha256_checksum":"3a6eb0798dfdc0f9714aac3892bb50f3d4a9798cb3b1d46a3f786850e387550f"},{"os":"Linux","architecture":"x86_64","download_url":"https://download.example.com/test-runner/linux/x86_64/runner_v1.2.3.tar.gz","filename":"runner_v1.2.3_linux_x86_64.tar.gz"},{"os":"macOS","architecture":"arm64","download_url":"https://download.example.com/test-runner/macos/arm64/runner_v1.2.3.dmg","filename":"runner_v1.2.3_macos_arm64.dmg","sha256_checksum":"9b74c9897bac770ffc029102a200c5de0c1f0db3a9b74c9897bac770ffc029102"}];
}
