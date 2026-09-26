/**
 * One entry per competition season, newest first.
 *
 * `highlights` is the short "what was special about that year" list the
 * history page tells its story with. `blogPosts` accepts either a local file
 * in `public/blog-PDFs/` or an external link.
 */

export type SeasonLink = { label: string; href: string };

export type Season = {
  year: string;
  /** The FIRST game name, or the project name for an off-season build. */
  game: string;
  /** What the team called the robot. */
  robot?: string;
  status: "upcoming" | "current" | "past";
  summary: string;
  /** Two to four short lines: achievements, changes, what the team is proud of. */
  highlights?: string[];
  awards?: string[];
  image?: { src: string; alt: string };
  techBinder?: string;
  blogPosts?: SeasonLink[];
};

export const seasons: Season[] = [
  {
    year: "2027",
    game: "BioCore",
    status: "current",
    // NEEDS REVIEW: update this summary once kickoff happens in January.
    summary:
      "Pre-season is underway. Students are training, prototyping and running design reviews ahead of the January kickoff, when FIRST reveals the new game and the six-week build clock starts.",
    highlights: [
      "Pre-season training for the newest group of students",
      "Design reviews run by students, with mentors as coaches",
      "Weekly build blogs published through the season",
    ],
    image: { src: "/robot-images/2027-preview.jpeg", alt: "2027 season preview" },
    blogPosts: [
      { label: "Pre-Season", href: "https://docs.google.com/document/d/1V-Im31zFGo_coVZop82ItUPRIz8JuNgjPoxAJzR_sv8/preview" },
      { label: "Week 1", href: "https://docs.google.com/document/d/1SvJyobxlLf8fYxCimZlJNOBXJwD3oTegwxf4R9baoMo/preview" },
      { label: "Week 2", href: "https://docs.google.com/document/d/1U9Y4P0SCUdubb-AE1MZKU8XMMxqKfBTgOY7NDBzsZnU/preview" },
      { label: "Week 3", href: "https://docs.google.com/document/d/1yF3X6UrQMm3FFEmn6YP3EattiMSmcEPaUboGkobUFTM/preview" },
    ],
  },
  {
    year: "2026",
    game: "REBUILT",
    robot: "Orion",
    status: "past",
    summary:
      "Orion picked balls off the floor and shot them accurately into a target. Antares competed at the Silicon Valley and East Bay district events and reached deep into the playoffs at both.",
    highlights: [
      "Won the Imagery Award and the Autonomous Award in district play",
      "An unreliable intake at the Northern California District Championship sent the team back to the drawing board",
      "The redesigned intake carried the team to semifinals at Sunset Showdown",
    ],
    awards: ["Imagery Award", "Autonomous Award"],
    image: { src: "/robot-images/2026-CAD.png", alt: "Orion, the 2026 REBUILT robot, in CAD" },
    techBinder: "/tech-binders/2026.pdf",
  },
  {
    year: "2025",
    game: "REEFSCAPE",
    robot: "Aquarius, Cygnus and Cassiopeia",
    status: "past",
    summary:
      "Three robot iterations in one season. The final machine collected PVC pipes from the floor, scored them quickly on poles, and could pick up and shoot large balls into the net.",
    highlights: [
      "Won the Team Spirit Award",
      "Iterated through three full robots rather than defending the first design",
      "Published a weekly build blog for the entire season",
    ],
    awards: ["Team Spirit Award"],
    image: { src: "/robot-images/2025-CAD.png", alt: "The 2025 REEFSCAPE robot in CAD" },
    blogPosts: [
      { label: "Week 1", href: "/blog-PDFs/2025Week1Blog.pdf" },
      { label: "Week 2", href: "/blog-PDFs/2025Week2Blog.pdf" },
      { label: "Week 3", href: "/blog-PDFs/2025Week3Blog.pdf" },
      { label: "Weeks 4 and 5", href: "/blog-PDFs/Antares2025Week4_5Blog.pdf" },
      { label: "Weeks 6 and 7", href: "/blog-PDFs/2025AntaresWeek6&7Blog.pdf" },
      { label: "Week 8", href: "/blog-PDFs/2025AntaresWeek8Blog.pdf" },
      { label: "Weeks 9 to 12", href: "/blog-PDFs/2025AntaresWeeks9to12Blog.pdf" },
      { label: "Capitol City Classic", href: "/blog-PDFs/2025CCCBlog.pdf" },
    ],
  },
  {
    year: "2024",
    game: "CRESCENDO",
    robot: "Scorpius",
    status: "past",
    summary:
      "Scorpius collected foam rings, shot them into a target and placed them in the amplifier. It competed at the San Francisco and Monterey Bay Regionals.",
    highlights: [
      "Reached the finals at Monterey Bay Regional",
      "Earned Excellence in Engineering at Monterey Bay and Innovation in Control at Sunset Showdown",
      "A student was named a Dean's List Finalist",
    ],
    awards: ["Regional Finalist", "Excellence in Engineering", "Innovation in Control", "Dean's List Finalist"],
    image: { src: "/robot-images/2024-CAD.png", alt: "Scorpius, the 2024 CRESCENDO robot, in CAD" },
    blogPosts: [
      { label: "Offseason", href: "/blog-PDFs/ANTARES_Offseason_blog.pdf" },
      { label: "Weeks 1 and 2", href: "/blog-PDFs/ANTARES_Week_1_2_blog.pdf" },
      { label: "Weeks 3 and 4", href: "/blog-PDFs/ANTARES-Week-3-4.pdf" },
    ],
  },
  {
    year: "2023",
    game: "CHARGED UP",
    status: "past",
    // NEEDS REVIEW: a student who was there should write two or three lines about
    // what was special about this season. See docs/content-todo.md.
    summary:
      "Antares competed in the 2023 CHARGED UP season and published build blogs through the spring.",
    image: { src: "/robot-images/2023-photo.jpg", alt: "The 2023 CHARGED UP robot" },
    blogPosts: [
      { label: "Weeks 1 to 3", href: "https://docs.google.com/document/d/1jPqF1wl1fpsS3Z3vZIF8mhnYsgGOZQYB9XV-C3ATmN4/preview" },
      { label: "Weeks 4 to 6", href: "https://docs.google.com/document/d/1oqWgfKmR4ZTY3XF_sQkCs3bJxaYQO6Udv1iyQMez27U/preview" },
    ],
  },
  {
    year: "2022",
    game: "RAPID REACT",
    status: "past",
    // NEEDS REVIEW: add the achievements and changes that mattered this year.
    summary:
      "Antares competed in the 2022 RAPID REACT season and documented it across five build blogs and a season recap.",
    image: { src: "/robot-images/2022-whiteboard.jpg", alt: "Whiteboard sketches from the 2022 season" },
    blogPosts: [
      { label: "Pre-Season and Week 1", href: "https://docs.google.com/document/d/15Fu87GMnb15SDpC-s1ouw3y6gRH5HqNqlxPW7NRTrUk/preview" },
      { label: "Weeks 2 and 3", href: "https://docs.google.com/document/d/1ToPgXZ-vTaOERvVS_70WnIOybmjOgv1y9kQHTzQfx5c/preview" },
      { label: "Weeks 4 and 5", href: "https://docs.google.com/document/d/1mUlwq41prp9BVE0Qq_ntnO7ekPK0DcGdBGhrC9wWyFg/preview" },
      { label: "Weeks 6 and 7", href: "https://docs.google.com/document/d/1BH1ZVnRoxGyraTjYGyqLCvqP5k_dmXSCeBrN8gfDnaY/preview" },
      { label: "Season Recap", href: "https://docs.google.com/document/d/1pdkHilT2aNJox8RFxs8ZII2xJq4QzanjyLT783SvpRA/preview" },
    ],
  },
  {
    year: "2021",
    game: "INFINITE RECHARGE at Home",
    status: "past",
    summary:
      "FIRST ran 2021 remotely, with teams judged on submitted material rather than head-to-head matches.",
    highlights: ["Won the Imagery Award in honor of Jack Kamen"],
    awards: ["Imagery Award"],
  },
  {
    year: "2019",
    game: "DESTINATION: DEEP SPACE",
    status: "past",
    summary: "The team's second competition season.",
    highlights: ["Won the Team Spirit Award"],
    awards: ["Team Spirit Award"],
  },
  {
    year: "2018",
    game: "POWER UP",
    status: "past",
    summary:
      "The rookie season. A brand-new team out of Khan Lab School finished as the highest-seeded rookie at its event.",
    highlights: ["Won Highest Rookie Seed", "Started the program that now runs from grade 6 through grade 12"],
    awards: ["Highest Rookie Seed"],
  },
];

export const currentSeason = seasons.find((season) => season.status === "current") ?? seasons[0];
export const pastSeasons = seasons.filter((season) => season.status === "past");
