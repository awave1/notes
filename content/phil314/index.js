const { log } = console;

const assert = (orig, target) => orig === target;

/**
 * Add one to `num` and return resulting number as string
 * @param {string} num 
 * @returns {string} num += 1
 */
function addone(num) {
  if (num.length) {
    const nums = num.split('').reverse();

    for (let i = 0; i < nums.length; i++) {
      if ((+nums[i]) < 9) {
        nums[i] = +nums[i] + 1; 
        break;
      } else {
        nums[i] = 0;
        if ((i + 1) === nums.length) {
          // Resize array
          nums.length += 1;
          nums[i + 1] = 1;
        } else {
          nums[i + 1] = (+nums[i + 1]) + 1;
        }

        if (nums[i + 1] < 10) {
          break;
        }
      }
    }

    return nums.reverse().join('');
  }

  return '';
}

/**
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target. 
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * 
 * @param {number[]} numbers
 * @param {number} result
 */
function twosum(numbers, target) {
  for(let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}

log('============================================')
log(addone('1'), addone('1') === '2');
log(addone('9'), addone('9') === '10');
log(addone('123'), addone('123') === '124');
log(addone('19'), addone('19') === '20');
log(addone('99'), addone('99') === '100');
log(addone('999'), addone('999') === '1000');
log(addone('9999'), addone('9999') === '10000');
log(addone(''), addone('') === '');
log('============================================')
log(twosum([1, 2], 3));
log(twosum([1, 2, 3], 4));
log(twosum([1, 2, 3], 5));
log(twosum([1, 2, 3, 4], 7));
log(twosum([1, 2, 3, 4], 5));