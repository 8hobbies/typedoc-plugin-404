/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Application,
  JSX,
  ParameterType,
  Renderer,
  RendererEvent,
  UrlMapping,
} from "typedoc";

const default404PageContent = "404 Page Not Found" as const;
const optionName = "page404Content" as const;

/**
 * Add a 404 page.
 */
function add404Page(event: RendererEvent, page404Content: string): void {
  if (event.urls === undefined) {
    throw Error("URLs not detected. Unable to add a 404 page.");
  }

  // Add a URL mapping that's similar to the index page. Use the same model, and create the 404
  // page.
  const indexUrlMapping = event.urls.find(
    (element) => element.url === "index.html",
  );
  if (indexUrlMapping === undefined) {
    throw Error("Unable to find the URL mapping for the index page.");
  }
  const page404UrlMapping = new UrlMapping(
    "404.html",
    indexUrlMapping.model,
    (_) => {
      return JSX.createElement(
        "div",
        { class: "404-content" },
        JSX.createElement(JSX.Raw, { html: page404Content }),
      );
    },
  );

  event.urls.push(page404UrlMapping);
}

/** @ignore */
export function load(application: Application): void {
  const useHostedBaseUrlForAbsoluteLinksOptionName =
    "useHostedBaseUrlForAbsoluteLinks" as const;
  application.options.addDeclaration({
    name: optionName,
    type: ParameterType.String,
    help: `Content of the 404 page.`,
    defaultValue: default404PageContent,
  });

  // Add the 404 page.
  application.renderer.on(Renderer.EVENT_BEGIN, (event: RendererEvent) => {
    const page404Content = application.options.getValue(optionName);
    if (typeof page404Content !== "string") {
      throw TypeError(
        `Unexpected ${optionName} type: ${JSON.stringify(page404Content)}`,
      );
    }
    add404Page(event, page404Content);

    // Print the warning message here, as the option value isn't yet available before rendering.
    if (
      !application.options.getValue(useHostedBaseUrlForAbsoluteLinksOptionName)
    ) {
      throw new Error(
        `typedoc-plugin-404 requires setting '"${useHostedBaseUrlForAbsoluteLinksOptionName}": true' to typedoc.json`,
      );
    }
  });

  // Add the noindex meta tag to the 404 page, since a soft 404 page should not be indexed.
  application.renderer.hooks.on("head.end", (ctx) => {
    if (ctx.page.url !== "404.html") {
      return JSX.createElement(JSX.Fragment, {});
    }
    return JSX.createElement(JSX.Raw, {
      html: '<meta name="robots" content="noindex"/>',
    });
  });
}
