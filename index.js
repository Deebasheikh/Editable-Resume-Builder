// interface ResumeData {
//     name: string;
//     email: string;
//     phone: string;
//     location: string;
//     education: {
//       institution: string;
//       degree: string;
//       duration: string;
//     };
//     workExperience: {
//       jobTitle: string;
//       company: string;
//       duration: string;
//     };
//     skills: string[];
//     profilePicture: string;
//   }
var form = document.getElementById("resume-form");
var generateResumeButton = document.getElementById("generate-resume");
var resumeContainer = document.getElementById("resume-container");
var profilePictureInput = document.getElementById("profile-picture");
var profilePreview = document.getElementById("profile-preview");
// Profile picture preview
profilePictureInput.addEventListener("change", function (e) {
    var _a;
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            profilePreview.src = reader_1.result;
        };
        reader_1.readAsDataURL(file);
    }
});
// Generate resume button click
generateResumeButton.addEventListener("click", function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var resumeData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        education: {
            institution: formData.get("education-institution"),
            degree: formData.get("education-degree"),
            duration: formData.get("education-duration"),
        },
        workExperience: {
            jobTitle: formData.get("work-job-title"),
            company: formData.get("work-company"),
            duration: formData.get("work-duration"),
        },
        skills: formData.get("skills").split(",").map(function (skill) { return skill.trim(); }),
        profilePicture: profilePreview.src || "",
    };
    generateEditableResume(resumeData);
});
// Function to generate the resume and make it editable
function generateEditableResume(resumeData) {
    if (!resumeContainer) {
        console.error("Resume container not found.");
        return;
    }
    resumeContainer.innerHTML = "\n      <header>\n        <img src=\"".concat(resumeData.profilePicture, "\" alt=\"Profile\" style=\"max-width: 150px;\">\n        <h1 contenteditable=\"true\" data-field=\"name\">").concat(resumeData.name, "</h1>\n      </header>\n      <section>\n        <h2>Contact Information</h2>\n        <p><strong>Email:</strong> <span contenteditable=\"true\" data-field=\"email\">").concat(resumeData.email, "</span></p>\n        <p><strong>Phone:</strong> <span contenteditable=\"true\" data-field=\"phone\">").concat(resumeData.phone, "</span></p>\n        <p><strong>Location:</strong> <span contenteditable=\"true\" data-field=\"location\">").concat(resumeData.location, "</span></p>\n      </section>\n      <section>\n        <h2>Education</h2>\n        <p><strong>Institution:</strong> <span contenteditable=\"true\" data-field=\"education.institution\">").concat(resumeData.education.institution, "</span></p>\n        <p><strong>Degree:</strong> <span contenteditable=\"true\" data-field=\"education.degree\">").concat(resumeData.education.degree, "</span></p>\n        <p><strong>Duration:</strong> <span contenteditable=\"true\" data-field=\"education.duration\">").concat(resumeData.education.duration, "</span></p>\n      </section>\n      <section>\n        <h2>Work Experience</h2>\n        <p><strong>Job Title:</strong> <span contenteditable=\"true\" data-field=\"workExperience.jobTitle\">").concat(resumeData.workExperience.jobTitle, "</span></p>\n        <p><strong>Company:</strong> <span contenteditable=\"true\" data-field=\"workExperience.company\">").concat(resumeData.workExperience.company, "</span></p>\n        <p><strong>Duration:</strong> <span contenteditable=\"true\" data-field=\"workExperience.duration\">").concat(resumeData.workExperience.duration, "</span></p>\n      </section>\n      <section>\n        <h2>Skills</h2>\n        <ul id=\"skills-list\">\n          ").concat(resumeData.skills.map(function (skill) { return "<li contenteditable=\"true\" data-field=\"skills\">".concat(skill, "</li>"); }).join(""), "\n        </ul>\n      </section>\n    ");
    // Add live event listeners to save edits
    enableLiveEdits(resumeData);
}
// Enable live edit functionality
function enableLiveEdits(resumeData) {
    var editableElements = resumeContainer.querySelectorAll("[contenteditable='true']");
    editableElements.forEach(function (element) {
        element.addEventListener("input", function (event) {
            var target = event.target;
            var fieldKey = target.dataset.field || "";
            var newValue = target.textContent || "";
            // Update the corresponding data object
            updateResumeData(resumeData, fieldKey, newValue);
        });
    });
}
// Update resume data object dynamically
function updateResumeData(resumeData, fieldKey, newValue) {
    var keys = fieldKey.split(".");
    var current = resumeData;
    for (var i = 0; i < keys.length - 1; i++) {
        var key = keys[i];
        if (current[key]) {
            current = current[key];
        }
    }
    var finalKey = keys[keys.length - 1];
    if (current && finalKey in current) {
        current[finalKey] = newValue;
    }
    else {
        console.error("Invalid fieldKey: ".concat(fieldKey));
    }
}
