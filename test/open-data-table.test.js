/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, fixture, expect } from '@open-wc/testing';
import '../src/open-data-table.js';

describe('open-data-table', () => {
  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <open-data-table></open-data-table>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
