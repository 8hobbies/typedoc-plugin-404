# typedoc-plugin-404: Create a 404 Page

This plugin generates a `404.html` at the root of the document. `404.html` is a recognized location
that are recognized by web hosts such as [GitHub Pages][] and [GitLab Pages][].

## Install

```
npm install --save-dev @8hobbies/typedoc-plugin-404
```

## Usage

Pass `--plugin typedoc-plugin-404` when invoking the typedoc command:

```
typedoc --plugin typedoc-plugin-404
```

## Configuration

This plugin recognizes a `page404Content` option in your `typedoc.json`. You can specify custom content that shows up in the 404 page:

```json
{
  "page404Content": "This page does not exist."
}
```

The default value is `"404 Page Not Found"`.

## Contributing

Source code is available on [GitLab][].

To report a bug, visit the [issue tracker][].

To run test, run `npm run test-all`. To display test coverage, run `npm run
coverage`. To build for production, run `npm pack`. To build the documentation,
run `npm run doc`.

To send your contribution, open a [merge request][].

## License

```text
Copyright 2024 Hong Xu <hong@8hobbies.com>

Licensed under the Apache License, Version 2.0(the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[GitHub Pages]: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
[GitLab Pages]: https://docs.gitlab.com/ee/user/project/pages/introduction.html#custom-error-codes-pages
[GitLab]: https://gitlab.com/8hobbies/typedoc-plugin-404
[issue tracker]: https://gitlab.com/8hobbies/typedoc-plugin-404/issues
[merge request]: https://gitlab.com/8hobbies/typedoc-plugin-404/-/merge_requests