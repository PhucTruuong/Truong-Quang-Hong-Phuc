/* 
    Problem 1: Write a function that takes a number as an input and 
    returns the sum of all numbers from 1 to the input number.
    There are three ways to solve this problem:
    1. Using loops
    2. Using a mathematical formula
    3. Using recursion
*/

const readline = require('node:readline');

/* 
    Solution 1: Using loops
    Time complexity: O(n)
    Space complexity: O(1)
*/
function sum1(input: number): number {
    if (input < 1) {
        return 0;
    };

    let sum = 0;
    for (let i = 1; i <= input; i++) {
        sum += i;
    };

    return sum;
};

/* 
    Solution 2: Using a mathematical formula
    Time complexity: O(1)
    Space complexity: O(1)
*/
function sum2(input: number): number {
    if (input < 1) {
        return 0;
    };

    return (input * (input + 1)) / 2;
};

/* 
    Solution 3: Using recursion
    Time complexity: O(n)
    Space complexity: O(n)
*/
function sum3(input: number): number {
    if (input < 1) {
        return 0;
    };

    return input + sum3(input - 1);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(`Enter a number: `, (targetInput: string) => {
    console.log(`You entered: ${Number(targetInput)}`);

    // check if the input is a number
    if (isNaN(Number(targetInput))) {
        console.log(`Please enter a valid number!`);
        rl.close();
        return;
    };

    // check if the input is an integer
    if (!Number.isInteger(Number(targetInput))) {
        console.log(`Please enter a valid integer number!`);
        rl.close();
        return;
    };

    console.log("Sum function 1 result: ", sum1(Number(targetInput)));
    console.log("Sum function 2 result: ", sum2(Number(targetInput)));
    console.log("Sum function 3 result: ", sum3(Number(targetInput)));
    rl.close();
});