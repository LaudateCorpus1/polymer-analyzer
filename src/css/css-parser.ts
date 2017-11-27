/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import * as shadyCss from 'shady-css-parser';

import {InlineDocInfo} from '../model/model';
import {ResolvedUrl} from '../model/url';
import {Parser} from '../parser/parser';
import {UrlResolver} from '../url-loader/url-resolver';

import {ParsedCssDocument} from './css-document';

export class CssParser implements Parser<ParsedCssDocument> {
  private _parser: shadyCss.Parser;

  constructor() {
    this._parser = new shadyCss.Parser();
  }

  parse(
      contents: string, url: ResolvedUrl, _urlResolver: UrlResolver,
      inlineInfo?: InlineDocInfo<any>): ParsedCssDocument {
    const ast = this._parser.parse(contents);
    const isInline = !!inlineInfo;
    inlineInfo = inlineInfo || {};
    return new ParsedCssDocument({
      url,
      contents,
      ast,
      locationOffset: inlineInfo.locationOffset,
      astNode: inlineInfo.astNode,
      isInline,
    });
  }
}
