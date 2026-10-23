// Single source of truth for open roles — used by /careers, the job page, Google JobPosting schema and the sitemap.
// To add a role: copy the object below, give it a new slug, then create app/careers/<slug>/page.tsx (copy the existing one).

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
  employmentLabel: string;
  workMode: string; // e.g. "Hybrid" or "On-site"
  salary: { min: number; max: number } | null; // per year, EUR. null = hidden + left out of Google schema
  datePosted: string; // YYYY-MM-DD
  validThrough: string; // closing date, YYYY-MM-DD
  summary: string; // one line for the role card
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  stack: string[];
};

export const JOBS: Job[] = [
  {
    slug: "cloud-platform-engineer",
    title: "Cloud Platform Engineer",
    team: "Cloud Practice",
    location: "Dublin, Ireland",
    employmentType: "FULL_TIME",
    employmentLabel: "Full-time",
    workMode: "Hybrid", // TODO: confirm with Anil — "Hybrid" or "On-site"
    salary: null, // TODO: set e.g. { min: 55000, max: 70000 } once Anil confirms
    datePosted: "2026-10-22",
    validThrough: "2026-12-31", // TODO: confirm closing date
    summary:
      "Design, deploy and run secure, scalable AWS infrastructure for our platforms and Cloud Practice clients.",
    about:
      "The Cloud Platform Engineer will be responsible for designing, developing, deploying and maintaining secure, scalable AWS cloud infrastructure and digital platforms for Dublin Property and Fintech Limited. The role will support the company's internal digital transformation initiatives and deliver cloud engineering and consulting solutions for clients of Dublin PropTech's Cloud Practice.",
    responsibilities: [
      "Design and build AWS infrastructure as code (Terraform / CDK)",
      "Set up and run CI/CD pipelines for our web and mobile platforms",
      "Own security: IAM, networking, encryption and access controls",
      "Monitor, troubleshoot and optimise performance and cost",
      "Scope and deliver cloud consulting projects for Cloud Practice clients",
    ],
    requirements: [
      "Hands-on AWS experience (EC2, VPC, IAM, S3, RDS, Lambda)", // TODO: add "X+ years" if Anil wants a minimum
      "Linux, networking and VPC design",
      "Infrastructure as code (Terraform or CDK)",
      "Docker and CI/CD",
      "Clear communication with clients and non-technical teams",
    ],
    niceToHave: [
      "AWS certifications",
      "Kubernetes / EKS",
      "PropTech or fintech exposure",
      "Consulting experience",
    ],
    stack: ["AWS", "Terraform", "Docker", "GitHub Actions", "Linux", "Next.js", "CloudWatch"],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);

export const formatSalary = (s: Job["salary"]) =>
  s ? `€${s.min.toLocaleString("en-IE")} – €${s.max.toLocaleString("en-IE")} per year` : null;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" });