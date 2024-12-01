const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
        { sectionNum: 2, roomNum: "STC 347", enrolled: 25, days: "TTh", instructor: "Sis A" }
    ],
    modifyEnrollment: function (sectionNum, change) {
        const sectionIndex = this.sections.findIndex((section) => section.sectionNum == sectionNum);
        if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled += change;
            renderSections(this.sections);
        }
    }
};

function setCourseDetails(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

function renderSections(sections) {
    const html = sections.map((section) => `
        <tr>
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
            <td>${section.instructor}</td>
        </tr>`).join("");
    document.querySelector("#sections").innerHTML = html;
}

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
    aCourse.modifyEnrollment(sectionNum, 1);
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
    aCourse.modifyEnrollment(sectionNum, -1);
});

setCourseDetails(aCourse);
renderSections(aCourse.sections);
