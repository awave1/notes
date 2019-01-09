/**
 * Format string to-kebab-format
 *
 * @param {string} str
 * @returns {integer} word count
 * @description Takes a html string and returns the number of images
 * Note: This code is taken from @tryghost/helpers package
 **/
const leKebab = str => str.replace(/[^A-Za-z0-9\s]+/g, '').replace(/\s/g, '-');

/**
 * Word count utility
 *
 * @param {string} html string
 * @returns {integer} word count
 * @description Takes a html string and returns the number of words after sanitizing any html
 * Note: This code is taken from @tryghost/helpers package
 **/
const countWords = html => {
  const text = html.replace(/<(.|\n)*?>/g, ' '); // strip any HTML tags

  const pattern = /[a-zA-ZÀ-ÿ0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const match = text.match(pattern);
  let count = 0;

  if (match === null) {
    return count;
  }

  for (let i = 0; i < match.length; i++) {
    if (match[i].charCodeAt(0) >= 0x4e00) {
      count += match[i].length;
    } else {
      count += 1;
    }
  }

  return count;
};

/**
 * Image count utility
 *
 * @param {string} html string
 * @returns {integer} word count
 * @description Takes a html string and returns the number of images
 * Note: This code is taken from @tryghost/helpers package
 **/
const countImages = html => (html.match(/<img(.|\n)*?>/g) || []).length;

const contentCount = html => ({
  wordCount: countWords(html),
  imageCount: countImages(html),
});

/**
 * Estimated reading time (based on medium https://blog.medium.com/read-time-and-you-bc2048ab620c)
 *
 * @param {integer} wordCount
 * @param {integer} imageCount
 * @returns {integer} estimated reading time in seconds
 **/
const estimatedReadingTime = (wordCount, imageCount) => {
  const wordsPerMinute = 275;
  const wordsPerSecond = wordsPerMinute / 60;
  let readingTimeSeconds = wordCount / wordsPerSecond;

  if (imageCount) {
    for (let i = 12; i > 12 - imageCount; i--) {
      readingTimeSeconds += Math.max(i, 3);
    }
  }

  const readingTimeMinutes = Math.round(readingTimeSeconds / 60);

  return readingTimeMinutes;
};

const getReadingTime = html => {
  const { wordCount, imageCount } = contentCount(html);
  const readingTime = estimatedReadingTime(wordCount, imageCount);

  return readingTime <= 1 ? '1 min read' : `${readingTime} min read`;
};

module.exports = {
  leKebab,
  getReadingTime,
};
