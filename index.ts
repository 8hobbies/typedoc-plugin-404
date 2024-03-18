/** @license Apache-2.0
 *
 * Copyright 2024 Hong Xu <hong@8hobbies.com>
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

import { Application, Renderer, RendererEvent, UrlMapping } from "typedoc";

/**
 * Add a 404 page.
 */
function add404Page(event: RendererEvent): void {
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
      return "404 Page Not Found";
    },
  );

  event.urls.push(page404UrlMapping);
}

export function load(application: Application): void {
  application.renderer.on(Renderer.EVENT_BEGIN, add404Page);
}
