/**
 * Site-wide facts, contacts and navigation copy.
 *
 * Everything a non-developer might want to edit lives in `content/`.
 * Change a value here and it updates everywhere it appears on the site.
 */

export const site = {
  teamNumber: 6962,
  teamName: "Antares",
  tagline: "Student-led engineering at Khan Lab School",
  founded: 2018,
  grades: "6-12",
  city: "Mountain View, California",

  /** Used for page titles, Open Graph tags and the sitemap. */
  url: "https://team6962.com",

  email: {
    general: "contact@team6962.com",
    donate: "donate@team6962.com",
    schoolGiving: "donate@khanlabschool.org",
  },

  address: {
    line1: "Khan Lab School",
    line2: "1200 Villa Street, Suite 100",
    line3: "Mountain View, CA 94041",
  },

  /** Khan Lab School is the 501(c)(3) that receives gifts on the team's behalf. */
  legal: {
    recipient: "Khan Lab School",
    status: "501(c)(3) nonprofit school",
    ein: "46-5742553",
    memo: "Antares, Team 6962",
  },

  links: {
    school: "https://khanlabschool.org/",
    schoolGiving: "https://khanlabschool.org/Giving",
    first: "https://www.firstinspires.org/robotics/frc",
    firstNorCal: "https://www.firstnorcal.org/",
    blueAlliance: "https://www.thebluealliance.com/team/6962",
  },
} as const;
