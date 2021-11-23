const express = require('express');
const ExpressError = require('./expressError');

const app = express()


// test if a number is odd, used when finding 
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
    for(let n of nums) {
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


app.get('/mean/', (req, res, next) => {
    try {
        const nums = req.query.nums;
        let intArray = [];
        if (nums) {
            let numArray = String(nums).split(",");
            for (let n of numArray) {
                let num = parseInt(n);
                if (isNaN(num)) {
                    throw new ExpressError(`${n} is not a number.`, 400);
                }
                intArray.push(num);
            }
            const result = mean(intArray);
            return res.json({ response: { operation: "mean", value: result } });
        }
        throw new ExpressError('Nums are required', 400);
    } catch (e) {
        next(e);
    }
})


app.get('/median/', (req, res, next) => {
    try {
        const nums = req.query.nums;
        if (nums) {
            let numArray = String(nums).split(",");
            let intArray = [];
            for (let i = 0; i < numArray.length; i++) {
                let num = parseInt(numArray[i]);
                if (isNaN(num)) {
                    throw new ExpressError(`${numArray[i]} is not a number.`, 400);
                }
                intArray[i] = num;
            }

            let result = median(intArray);
            return res.json([{ response: { operation: "median", value: result } }])
        }
        throw new ExpressError('Nums are required', 400);
    } catch (e) {
        next(e);
    }
})


app.get('/mode/', (req, res, next) => {
    try {
        const nums = req.query.nums;
        if (nums) {
            let numArray = String(nums).split(",");
            let intArray = [];
            // convert all nums in query string to ints and add to new array, and Set which will be used to find frequencies
            for (let i = 0; i < numArray.length; i++) {
                let num = parseInt(numArray[i]);
                if (isNaN(num)) {
                    throw new ExpressError(`${numArray[i]} is not a number.`, 400);
                }
                intArray[i] = num;
            }
            let maxKey = mode(intArray);
            return res.json([{ response: { operation: "mode", value: maxKey } }])
        }
        throw new ExpressError('Nums are required', 400);
    } catch (e) {
        next(e);
    }
})


app.use((error, req, res, next) => {
    //the default status is 500 Internal Server Error
    let status = error.status || 500;
    let message = error.msg;

    //set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
})

module.exports = { mean, median, mode }