# typedoc-plugin-404: Create a 404 Page for TypeDoc Generated Docs

[![npm version](https://badge.fury.io/js/@8hobbies%2Ftypedoc-plugin-404.svg)](https://badge.fury.io/js/@8hobbies%2Ftypedoc-plugin-404)
[![pipeline status](https://gitlab.com/8hobbies/typedoc-plugin-404/badges/master/pipeline.svg)](https://gitlab.com/8hobbies/typedoc-plugin-404/-/commits/master)

[GitLab](https://gitlab.com/8hobbies/typedoc-plugin-404) | [GitHub](https://github.com/8hobbies/typedoc-plugin-404)

This plugin generates a `404.html` at the root of the documents generated by
[TypeDoc][]. `404.html` is a location for storing the 404 page that are
recognized by web hosts such as [GitHub Pages][] and [GitLab Pages][].

## Install

```
npm install --save-dev @8hobbies/typedoc-plugin-404
```

## Usage

Pass `--plugin @8hobbies/typedoc-plugin-404` when invoking the typedoc command:

```
typedoc --plugin @8hobbies/typedoc-plugin-404
```

Or add the plugin to your `typedoc.json` file:

```
// typedoc.json
{
  "plugin": ["@8hobbies/typedoc-plugin-404"]
}
```

## Configuration

This plugin recognizes a `page404Content` option in your `typedoc.json`. You can specify custom
content that shows up in the 404 page:

```json
{
  "page404Content": "This page does not exist.",
  "useHostedBaseUrlForAbsoluteLinks": true
}
```

The default value is `"404 Page Not Found"`. The content can be HTML. The content is always wrapped
with `"<div class="404-content"></div>"` in the HTML output.

`"useHostedBaseUrlForAbsoluteLinks"` is required, otherwise user visiting non-existent pages in
subfolders will not retrieve the right asset paths.

Alternatively, check out [this blog post][] for a detailed tutorial.

### Use with TypeDoc 0.25.x

<!-- TODO Remove this subsection once TypeDoc 0.27.0 is released -->

TypeDoc by default uses relative asset paths. TypeDoc 0.25.x doesn't have the
`useHostedBaseUrlForAbsoluteLinks` option, therefore, you will need to replace asset paths in
404.html with absolute paths, otherwise user visiting non-existent pages in subfolders will not
retrieve the right asset paths. For the default theme, this can be achieved by:

1. Installing `replace-in-files-cli`:

   ```shell
   npm install --save-dev replace-in-files-cli
   ```

2. Run the replacement after `typedoc`. In your `package.json` file:

   ```json
   {
     "scripts": {
       "doc": "typedoc && replace-in-files --string '=\"assets/' --replacement '=\"/assets/' docs/404.html"
     }
   }
   ```

## Live Example

[The document of this plugin](https://typedoc-404.8hob.io) itself is a live example.
Visit [its 404 page](https://typedoc-404.8hob.io/404.html) or type in a random path from
that domain to check out.

## Contributing

Source code is available on [GitLab][].

To report a bug, visit the [issue tracker][].

To run test, run `npm run test-all`. To display test coverage, run `npm run coverage`. To build for
production, run `npm pack`. To build the documentation, run `npm run doc`.

To send your contribution, open a [merge request][].

## License

```text
Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>

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
[TypeDoc]: https://typedoc.org/
[issue tracker]: https://gitlab.com/8hobbies/typedoc-plugin-404/issues
[merge request]: https://gitlab.com/8hobbies/typedoc-plugin-404/-/merge_requests
[this blog post]: https://8hob.io/posts/make-typedoc-generate-404-page/
