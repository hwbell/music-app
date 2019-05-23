import { 
  getUsablePicUrl,
  convertMillisToStandard, 
  shortenStr 
} from '../../tools/functions';

test('should shorten a string to supplied length with trailing dots', () => {
  const result = shortenStr("Hello world, lorem ispum dolor.", 10);
  expect(result).toBe("Hello worl ...");
});

test('should convert milliseconds to standard time display', () => {
  const result = convertMillisToStandard(10000);
  const result2 = convertMillisToStandard(40000);
  expect(result).toBe("0:10");
  expect(result2).toBe("0:40");
});

test('should return picture url with numbers from supplied size substituted for {w}x{h}', () => {
  const url = "https://is4-ssl.mzstatic.com/image/thumb/Video113/v4/3b/e5/1a/3be51aaf-5b00-0692-c737-217e03a0bc95/dj.bxzkvqyj.jpg/{w}x{h}bb.jpeg";
  const result = getUsablePicUrl(url, 1000);
  expect(result).toBe("https://is4-ssl.mzstatic.com/image/thumb/Video113/v4/3b/e5/1a/3be51aaf-5b00-0692-c737-217e03a0bc95/dj.bxzkvqyj.jpg/1000x1000bb.jpeg")
});