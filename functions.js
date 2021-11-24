// test if a number is odd, used when finding median
function isOdd(n) {
    return (n % 2) !== 0;
}

function mean(nums) {
    let sum = 0;
    let length = nums.length;
    for (let n of nums) {
        sum += n;
    }
    return (sum / length);
}

function median(nums) {
    nums.sort((a, b) => a - b);
    let result = 0;
    if (isOdd(nums.length)) {
        result = nums[((nums.length - 1) / 2)];
    } else {
        let first = ((nums.length / 2) - 1);
        let second = (nums.length / 2);
        result = (nums[first] + nums[second]) / 2;
    }
    return result;
}

function mode(nums) {
    nums.sort((a, b) => a - b);
    let numSet = new Set();
    let numFreqObj = {};
    for (let n of nums) {
        numSet.add(n);
    }
    // set keys in the frequency object to each key in the Set
    numSet.forEach((num) => {
        numFreqObj[num] = 0;
    })
    // go through each number in the array, update the frequency value for each in the frequency object
    for (let n of nums) {
        numFreqObj[n] += 1;
    }
    // the mode value is now present in the frequency object, go through each value to determine it
    let maxKey = nums[0];
    let maxVal = 1;
    for (let n in numFreqObj) {
        if (numFreqObj[n] > maxVal) {
            maxKey = parseInt(n);
            maxVal = numFreqObj[n];
        }
    }
    return maxKey;
}

module.exports = { mean, median, mode }