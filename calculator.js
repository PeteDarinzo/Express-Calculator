const express = require('express');
const ExpressError = require('./expressError');
const {mean, median, mode} = require('./functions');
const app = express()


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

