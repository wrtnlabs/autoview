
import Component from "../components/359";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"key":"mit-sample","name":"MIT License (Sample)","spdx_id":"MIT","url":"https://api.example.com/licenses/mit-sample","node_id":"LIC_NODEID_SAMPLE_001","html_url":"https://www.example.com/licenses/mit-sample.html","description":"A sample MIT-like license for UI testing. All content is fictional and for demonstration only.","implementation":"Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction. [Sample-Only]","permissions":["commercial_use","modification","distribution","private_use"],"conditions":["include-copyright","include-notice"],"limitations":["liability","warranty"],"body":"Sample License Body for UI Testing Purposes. This is a fictional license text. Do not use for production.\n\n1. Grant of Rights\n2. Conditions\n3. Limitations\n\n[End of sample license]","featured":true};
}
