const { mean, median, mode } = require("./calculator");

describe("Test the mean, median, and mode functions.", () => {

    test("Test mean.", () => {
        const inputOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const inputTwo = [1500, 3000, 3500, 4000, 6500];
        const inputThree = [7, 7, 7, 7, 7, 7, 7, 7, 7];
        const outputOne = mean(inputOne); // test small numbers
        const outputTwo = mean(inputTwo); // test large numbers
        const outputThree = mean(inputThree); // test identical numbers

        expect(outputOne).toEqual(5.5);
        expect(outputTwo).toEqual(3700);
        expect(outputThree).toEqual(7);
    })

    test("Test median.", () => {
        const inputOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const inputTwo = [11, 15, 23, 45, 98];
        const inputThree = [99, 34, 65, 2, 0, 9, 13, 101]
        const inputFour = [25, 71, 39, 4, 84];
        const inputFive = [3, 4, 5, 3, 2, 3, 4, 6, 9, 10, 1, 10];
        const inputSix = [3, 4, 5, 3, 2, 3, 4, 6, 9, 10, 1, 10];

        const outputOne = median(inputOne); // test even count sequence
        const outputTwo = median(inputTwo); // test odd count sequence
        const outputThree = median(inputThree); // test random even count sequence
        const outputFour = median(inputFour); // test random odd count 
        const outputFive = median(inputFive); // test random odd count with repeats
        const outputSix = median(inputSix); // test random even count with repeats

        expect(outputOne).toEqual(5.5);
        expect(outputTwo).toEqual(23);
        expect(outputThree).toEqual(23.5);
        expect(outputFour).toEqual(39);
        expect(outputFive).toEqual(4);
        expect(outputSix).toEqual(4);
    })

    test("Test mode.", () => {
        const inputOne = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const inputTwo = [99, 0, 34, 65, 2, 0, 9, 13, 101];
        const inputThree = [3, 4, 5, 3, 2, 3, 4, 6, 9, 10, 1, 10];
        const inputFour = [10, 10, 9, 9, 9, 8, 7, 7, 6, 6, 6, 6, 5, 4, 3, 3, 2, 2, 1];
        const inputFive = [1, 2, 2, 2, 3, 4, 4, 5, 5, 5, 5, 5, 6, 7, 8, 9, 9, 10];

        const outputOne = mode(inputOne); // test sequence
        const outputTwo = mode(inputTwo); // test out of order sequence
        const outputThree = mode(inputThree); // test out of order with repeats
        const outputFour = mode(inputFour); // test descending with repeats odd count 
        const outputFive = mode(inputFive); // test ascending with repeats

        expect(outputOne).toEqual(1);
        expect(outputTwo).toEqual(0);
        expect(outputThree).toEqual(3);
        expect(outputFour).toEqual(6);
        expect(outputFive).toEqual(5);
    });
})

