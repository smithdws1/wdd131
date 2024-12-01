// //  arrays.js
// const steps = ["one", "two", "three"];

// function listTemplate(step) {
//     return `<li>${step}</li>`;
// }

// const stepsHtml = steps.map(listTemplate).join(""); // use map to convert the list from strings to HTML

// document.querySelector("#myList").innerHTML = stepsHtml; // set the innerHTML

// Activity 2
// const grades = ['A', 'B', 'A'];

// function convertGradeToGpa(grade) {
//     if (grade === 'A') return 4;
//     if (grade === 'B') return 3;
//     if (grade === 'C') return 2;
//     if (grade === 'D') return 1;
//     return 0; // for an F
// }

// const gpaPoints = grade.map(convertGradeToGpa);

// console.log(gpaPoints;)

// Activity 3
// const grades = ["A", "B", "A"];
// function convertGradeToPoints(grade) {
//   const gradeToPoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
//   return gradeToPoints[grade] || 0;
// }
// const gpaPoints = grades.map(convertGradeToPoints);
// const pointsTotal = gpaPoints.reduce((total, item) => total + item);
// const gpa = pointsTotal / gpaPoints.length;
// console.log(gpaPoints);
// console.log(gpa);

// Activity 4
// const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

// const smallFruits = fruits.filter(fruit => fruit.length < 6);

// console.log(smallFruits);

// Activity 5
const numbers = [12, 34, 21., 54];

const luckyNumber = 21;

const index = numbers.indexOf(luckyNumber);

if (index !== -1) {
  console.log(`Lucky number ${luckyNumber} is at index ${index}.`);
} else {
  console.log(`Lucky number ${luckyNumber} is not in the array.`);
}
