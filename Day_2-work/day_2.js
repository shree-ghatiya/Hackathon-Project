let marks = [45, 89, 67, 92, 78, 56];

let highest = marks[0];
for (let i = 1; i < marks.length; i++) {
    if (marks[i] > highest) {
        highest = marks[i];
    }
}

console.log("Highest Marks:", highest);
