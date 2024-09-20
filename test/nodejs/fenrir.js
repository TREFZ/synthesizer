import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import * as cheerio from 'cheerio';

describe('Fenrir', () => {
  describe('basic stability checks', () => {
    describe('the homepage', () => {
      let response;
      let $;
      before(async () => {
        response = await fetch('https://www.businessinsider.com')
        $ = cheerio.load(await response.text());
      });
      it('responds', async () => {
        assert.equal(response.status, 200);
      });
      it('has a title tag', () => {
        assert($('title').text().length > 0);
      });
    })
    describe('a post page', () => {
      let response;
      let $;
      before(async () => {
        response = await fetch('https://www.businessinsider.com/guy-fieri-shares-his-two-favorite-foods-2022-11')
        $ = cheerio.load(await response.text());
      });
      it('responds', async () => {
        assert.equal(response.status, 200);
      });
      it('has a title tag', () => {
        assert($('title').text().length > 0);
      });
    })
    describe('PFI and Reviews Homepages', () => {
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
          });
          it('responds', async () => {
            assert.equal(response.status, 200);
          });
          it('has a title tag', () => {
            assert($('title').text().length > 0);
          });
        })
      })  
    })
  });
});