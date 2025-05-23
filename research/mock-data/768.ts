
import Component from "../components/768";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return [{"ref_name":"sample_porter_upload_001","path":"/mnt/porter/uploads/sample_file_001.bin","oid":"3b3295b5-c07a-4cf2-8c29-f6ec2d2d2f36","size":1048576},{"ref_name":"test_porter_asset_alpha","path":"assets/porter/test_asset_alpha.dat","oid":"7a1e2c3d-4b5f-422a-9e11-222233334444","size":20971520},{"ref_name":"dummy_data_archive_v2","path":"/var/lib/porter/dummy_data_archive_v2.tar.gz","oid":"9f8e7d6c-5b4a-4c3d-8e9f-001122334455","size":52428800}];
}
