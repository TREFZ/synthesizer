import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import * as cheerio from 'cheerio';

describe('On Fenrir BI', () => {
  describe('the probe', () => {
    describe('for the homepage', () => {
      let response;
      let $;
      before(async () => {
        response = await fetch('https://www.businessinsider.com/foo')
        $ = cheerio.load(await response.text());
      });
      it('responds successfully', async () => {
        assert.ok(
          response.status === 200,
          `A request to <https://www.businessinsider.com|the homepage> did not respond successfully. The status code was ${response.status}.`
        );
      });
      it('has a title tag', () => {
        const titleTagCount = $('head title').length;
        assert.ok(
          titleTagCount === 1,
          `The homepage should have 1 <title> tag, but has ${titleTagCount}.`
        );
      });
    })
    describe('for a post page', () => {
      let response;
      let $;
      before(async () => {
        response = await fetch('https://www.businessinsider.com/guy-fieri-shares-his-two-favorite-foods-2022-11')
        $ = cheerio.load(await response.text());
      });
      it('responds', async () => {
        assert.ok(
          response.status === 200,
          `The requested page did not respond successfully. The status code was ${response.status}.`
        );
      });
      it('has a title tag', () => {
        const titleTagCount = $('head title').length;
        assert.ok(
          titleTagCount === 1,
          `The homepage should have 1 <title> tag, but has ${titleTagCount}.`
        );
      });
    })
    describe('for PFI and Reviews Homepages', () => {
      const urls = [
        'https://www.businessinsider.com/personal-finance',
        'https://www.businessinsider.com/personal-finance/credit-cards',
        'https://www.businessinsider.com/guides',
        'https://www.businessinsider.com/guides/tech',
        'https://www.businessinsider.com/guides/home',
        'https://www.businessinsider.com/guides/beauty/skin-care'
      ]
      urls.forEach(url => {
        describe(url, () => {
          let response;
          let $;
          before(async () => {
            response = await fetch(url)
            $ = cheerio.load(await response.text());
          })
          it('responds successfully', async () => {
            assert.ok(
              response.status === 200,
            `The url ${url} did not respond successfully. The status code was ${response.status}.`);
          })
          it('returns a page with a title tag', () => {
            assert($('title').text().length > 0);
          })
        })
      })  
    })
  })
})

describe('The Fenrir MI', () => {
  describe('probe', () => {
    describe('for the homepage pizza', () => {
      let response;
      let $;
      before(async () => {
        response = await fetch('https://markets.businessinsider.com')
        $ = cheerio.load(await response.text());
      });
      it('responds successfully', async () => {
        assert.ok(
          response.status === 200,
          `A request to <https://markets.businessinsider.com|the homepage> did not respond successfully. The status code was ${response.status}.`
        )
      })
    })
  })
})
