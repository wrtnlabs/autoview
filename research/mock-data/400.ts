
import Component from "../components/400";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"linux","architecture":"x64","download_url":"https://download.example.com/actions/runner/linux-x64/2.284.0/test-runner.tar.gz","filename":"actions-runner-linux-x64-2.284.0.tar.gz","temp_download_token":"Bearer sample_temp_token_1234567890","sha256_checksum":"3f2d1e4c5b6a7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8b9a0c1d2"},{"os":"Windows","architecture":"arm64","download_url":"https://downloads.example.org/actions/runner/windows-arm64/2.284.0/sample-runner.zip","filename":"actions-runner-windows-arm64-2.284.0.zip"}];
}
