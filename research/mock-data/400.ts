
import Component from "../components/400";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"os":"linux","architecture":"x64","download_url":"https://downloads.example.com/runners/linux/x64/actions-runner-linux-x64-2.300.2.tar.gz","filename":"actions-runner-linux-x64-2.300.2.tar.gz","temp_download_token":"eyJzYW1wbGUtdG9rZW4iOiAiZXhhbXBsZSJ9","sha256_checksum":"d2c3b4a5968778695a4b3c2d1e0f98765432abcdefabcdefabcdefabcdefabcdabcd"},{"os":"windows","architecture":"x86","download_url":"https://downloads.example.com/runners/windows/x86/actions-runner-win-x86-2.300.2.zip","filename":"actions-runner-win-x86-2.300.2.zip","sha256_checksum":"a1b2c3d4e5f60718293a4b5c6d7e8f90abcdef1234567890abcdef1234567890"}];
}
