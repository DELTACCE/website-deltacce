export const committeeData = {
  faculty: {
    id: "faculty-coord",
    name: "Dr. Lijo Vincent",
    role: "Faculty Coordinator",
    department: "Data Science & Computer Engineering",
    driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder1", // Mock Google Drive File ID
    bio: "Guiding the next generation of data specialists and computational researchers.",
    socials: {
      linkedin: "https://linkedin.com",
      email: "mailto:lijo.vincent@cce.edu.in"
    }
  },
  students: [
    {
      id: "co-coo",
      name: "Siddharth Menon",
      role: "Co-Chief Operating Officer",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder2",
      featured: true,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "secretary",
      name: "Anjali Krishna",
      role: "Secretary",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder3",
      featured: true,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "treasurer",
      name: "Faris Rahman",
      role: "Treasurer",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder4",
      featured: false,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "tech-lead",
      name: "Devadathan K.",
      role: "Technical Lead",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder5",
      featured: true,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "design-lead",
      name: "Aparna Nair",
      role: "Design Lead",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder6",
      featured: false,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "media-lead",
      name: "Rohan Mathew",
      role: "Media Lead",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder7",
      featured: true,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    },
    {
      id: "event-coord",
      name: "Meenakshi S.",
      role: "Event Coordinator",
      driveId: "1ZtQ2lJ5wVzS9B34Xn67Y89abcd_placeholder8",
      featured: false,
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com"
      }
    }
  ]
};

// Utility function to compile direct-embeddable Google Drive URL
export function getDriveImageUrl(fileId) {
  // If the fileId is a placeholder or not set, return a high-quality UI placeholder avatar
  if (!fileId || fileId.includes("placeholder")) {
    return `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300`;
  }
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
