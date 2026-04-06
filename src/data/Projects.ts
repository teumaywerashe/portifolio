export interface Project {
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  technologies: string[];
  type: string;
  specialIcon: string;
}

export const projectsData: Project[] = [
  {
    title: "campus tour assistant",
    description:
      "A web based platform where students and guests of a campus can get information about each and every facility in the campus and can navigate to the facility using the map",
    image: "images/campus-tour-assistant.png",
    demoLink: "https://campus-tour-assistant.onrender.com/",
    githubLink: "https://github.com/teumaywerashe/campus_tour_assistant.git",
    technologies: ["TailwindCss", "React", "MongoDB", "Node.js"],
    type: "Real-time Chat",
    specialIcon: "FiGithub",
  },
  {
    title: "Resource Hub",
    description:
      "A web based platform where students can find the details of all the ethiopian universities and the courses and departments they deliver",
    image: "images/resourceHub.png",
    demoLink: "https://resourcehub-1.onrender.com/",
    technologies: ["React", "Node.js", "MongoDB Atlass", "RestAPI"],
    type: "personal project",
    specialIcon: "FiGithub",
    githubLink: "https://github.com/teumaywerashe/resourceHub.git",
  },
  {
    title: "campus facility management",
    description:
      "A web based platform where students and stuff of a campus can report issue that they see in the campus",
    image: "images/campusFacilityManagement.png",
    demoLink: "https://campusfacilitymanagement-1.onrender.com",
    technologies: ["TailwindCss", "React", "MongoDB", "Node.js"],
    type: "Real-time Chat",
    specialIcon: "FiGithub",
    githubLink: "https://github.com/teumaywerashe/campusFacilityManagement.git",
  },
  {
    title: "Food delivery",
    description:
      "A web based food delivery app where users can order a food and make their payment through chapa",
    image: "images/FoodDelivery.png",
    demoLink: "https://fullstack-food-delivery-1.onrender.com/",
    technologies: ["MERN Stack", "MongoDB", "Tailwind"],
    type: "Commerce",
    specialIcon: "FiGithub",
    githubLink: "https://github.com/teumaywerashe/fullStack-food-delivery.git",
  },
  {
    title: "e-commerce website",
    description:
      "A web based platform where users can buy and sell products online and make their payment through chapa",
    image: "images/e-commerce.png",
    demoLink: "https://e-commerce-1-rm56.onrender.com",
    technologies: ["TailwindCss", "React", "MongoDB", "Node.js"],
    type: "Real-time Chat",
    specialIcon: "FiGithub",
    githubLink: "https://github.com/teumaywerashe/e-commerce.git",
  },
  {
    title: "cafe Menu",
    description:
      "a cafe menu system where a user scan the QR code of the cafe and see the menu of the cafe.",
    image: "images/cafeMenu.png",
    demoLink: "https://cafemenu123.onrender.com/",
    technologies: ["React", "mongoDB", "RestAPIs", "TailwindCSS"],
    type: "Software",
    specialIcon: "FiGithub",
    githubLink: "https://github.com/teumaywerashe/cafeMenu.git",
  },
];
