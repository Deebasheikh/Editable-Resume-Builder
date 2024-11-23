interface ResumeData {
    name: string;
    email: string;
    phone: string;
    location: string;
    education: {
      institution: string;
      degree: string;
      duration: string;
    };
    workExperience: {
      jobTitle: string;
      company: string;
      duration: string;
    };
    skills: string[];
    profilePicture: string;
  }
  
  // Ensure these variables are only declared once in the global scope
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const generateResumeButton = document.getElementById("generate-resume") as HTMLButtonElement;
  const resumeContainer = document.getElementById("resume-container") as HTMLElement;
  const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
  const profilePreview = document.getElementById("profile-preview") as HTMLImageElement;
  
  // Profile picture preview
  profilePictureInput.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePreview.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Generate resume button click
  generateResumeButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    const formData = new FormData(form);
    const resumeData: ResumeData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      education: {
        institution: formData.get("education-institution") as string,
        degree: formData.get("education-degree") as string,
        duration: formData.get("education-duration") as string,
      },
      workExperience: {
        jobTitle: formData.get("work-job-title") as string,
        company: formData.get("work-company") as string,
        duration: formData.get("work-duration") as string,
      },
      skills: (formData.get("skills") as string).split(",").map((skill) => skill.trim()),
      profilePicture: profilePreview.src || "",
    };
  
    generateEditableResume(resumeData);
  });
  
  // Function to generate the resume and make it editable
  function generateEditableResume(resumeData: ResumeData): void {
    if (!resumeContainer) {
      console.error("Resume container not found.");
      return;
    }
  
    resumeContainer.innerHTML = `
      <header>
        <img src="${resumeData.profilePicture}" alt="Profile" style="max-width: 150px;">
        <h1 contenteditable="true">${resumeData.name}</h1>
      </header>
      <section>
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> <span contenteditable="true">${resumeData.email}</span></p>
        <p><strong>Phone:</strong> <span contenteditable="true">${resumeData.phone}</span></p>
        <p><strong>Location:</strong> <span contenteditable="true">${resumeData.location}</span></p>
      </section>
      <section>
        <h2>Education</h2>
        <p><strong>Institution:</strong> <span contenteditable="true">${resumeData.education.institution}</span></p>
        <p><strong>Degree:</strong> <span contenteditable="true">${resumeData.education.degree}</span></p>
        <p><strong>Duration:</strong> <span contenteditable="true">${resumeData.education.duration}</span></p>
      </section>
      <section>
        <h2>Work Experience</h2>
        <p><strong>Job Title:</strong> <span contenteditable="true">${resumeData.workExperience.jobTitle}</span></p>
        <p><strong>Company:</strong> <span contenteditable="true">${resumeData.workExperience.company}</span></p>
        <p><strong>Duration:</strong> <span contenteditable="true">${resumeData.workExperience.duration}</span></p>
      </section>
      <section>
        <h2>Skills</h2>
        <ul id="skills-list">
          ${resumeData.skills.map((skill) => `<li contenteditable="true">${skill}</li>`).join("")}
        </ul>
      </section>
    `;
  }
  