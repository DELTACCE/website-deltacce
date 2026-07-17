export const committeeData = {
  faculty: {
    id: "faculty-lead",
    name: "Ms. Rinsu Aravind",
    role: "Faculty Lead",
    department: "Data Science & Computer Engineering",
    driveId: "", // Google Drive File ID can be added here
    bio: "Guiding DELTA's operations and bridging student innovations with department milestones.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:rinsu.aravind@cce.edu.in"
    }
  },
  core: [
    {
      id: "chairperson",
      name: "Tharun Krishna C U",
      role: "Chairperson",
      batch: "S5 CSDS",
      driveId: "",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "vice-chairperson",
      name: "Neharin Navas Elayadath",
      role: "Vice Chairperson",
      batch: "S5 CSDS",
      driveId: "",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "secretary",
      name: "Nesla",
      role: "Secretary",
      batch: "S3 CSDS",
      driveId: "",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "treasurer",
      name: "George",
      role: "Treasurer",
      batch: "S3 CSDS",
      driveId: "",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    }
  ],
  technical: [
    { id: "t1", name: "Hari Krishna", role: "Technical Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t2", name: "Minhaj Noushad", role: "Technical Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t3", name: "Alvi A V", role: "Technical Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t4", name: "Jhon Antony", role: "Technical Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t5", name: "Abel Babu", role: "Technical Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t6", name: "Abel Bijoy", role: "Technical Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t7", name: "Sreehari", role: "Technical Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "t8", name: "Sinan", role: "Technical Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } }
  ],
  media: [
    { id: "m1", name: "Ruthurag Mohan", role: "Media Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "m2", name: "Harsha K P", role: "Media Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "m3", name: "Jessel", role: "Media Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "m4", name: "Anugrah", role: "Media Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } }
  ],
  content: [
    { id: "c1", name: "Andria Ann Biju", role: "Content Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "c2", name: "Delna Mary Anto", role: "Content Lead", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "c3", name: "Angel Maria", role: "Content Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "c4", name: "Nasarin", role: "Content Lead", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } }
  ],
  events: [
    { id: "e1", name: "Anoop Danimon", role: "Event Coordinator", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e2", name: "Aleena Sidhikh", role: "Event Coordinator", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e3", name: "H Athila", role: "Event Coordinator", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e4", name: "Sandesh E J", role: "Event Coordinator", batch: "S5 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e5", name: "Alan Jaison", role: "Event Coordinator", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e6", name: "Sijil", role: "Event Coordinator", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e7", name: "Nizma", role: "Event Coordinator", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } },
    { id: "e8", name: "Henet", role: "Event Coordinator", batch: "S3 CSDS", driveId: "", socials: { linkedin: "https://linkedin.com" } }
  ]
};

// Direct-embeddable Google Drive URL compiler
export function getDriveImageUrl(fileId) {
  // If the fileId is missing or empty, return the Dicebear initials avatar with DELTA color parameters
  if (!fileId || fileId.trim() === "") {
    return "";
  }
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
