export type ProductCategory = {
  value: string;
  label: string;
  subcategories?: ProductSubcategory[];
};
export type ProductSubcategory = {
  value: string;
  label: string;
};
export const productCategories: ProductCategory[] = [
  {
    value: "illustrations",
    label: "Illustrations",
    subcategories: [
      { value: "vector", label: "Vector" },
      { value: "flat-design", label: "Flat Design" },
      { value: "isometric", label: "Isometric" },
      { value: "line-art", label: "Line Art" },
      { value: "hand-drawn", label: "Hand Drawn" },
      { value: "3d", label: "3D" },
      { value: "digital-painting", label: "Digital Painting" },
      { value: "sketches", label: "Sketches" },
      { value: "cartoon", label: "Cartoon" }, // New subcategory
    ],
  },
  {
    value: "photos",
    label: "Photos",
    subcategories: [
      { value: "nature", label: "Nature" },
      { value: "people", label: "People" },
      { value: "business", label: "Business" },
      { value: "technology", label: "Technology" },
      { value: "food", label: "Food" },
      { value: "architecture", label: "Architecture" },
      { value: "travel", label: "Travel" },
      { value: "night-photography", label: "Night Photography" },
      { value: "sports", label: "Sports" }, // New subcategory
      { value: "lifestyle", label: "Lifestyle" }, // New subcategory
      { value: "fitness", label: "Fitness" }, // New subcategory
      { value: "business-events", label: "Business Events" }, // New subcategory
    ],
  },
  {
    value: "icons",
    label: "Icons",
    subcategories: [
      { value: "flat", label: "Flat" },
      { value: "3d", label: "3D" },
      { value: "outline", label: "Outline" },
      { value: "filled", label: "Filled" },
      { value: "line", label: "Line" },
      { value: "neumorphism", label: "Neumorphism" },
      { value: "material", label: "Material" },
      { value: "social-media", label: "Social Media" }, // New subcategory
      { value: "business", label: "Business" }, // New subcategory
    ],
  },
  {
    value: "templates",
    label: "Templates",
    subcategories: [
      { value: "website", label: "Website" },
      { value: "mobile-app", label: "Mobile App" },
      { value: "business-cards", label: "Business Cards" },
      { value: "brochures", label: "Brochures" },
      { value: "social-media", label: "Social Media" },
      { value: "presentations", label: "Presentations" },
      { value: "newsletters", label: "Newsletters" },
      { value: "resume", label: "Resumes" },
      { value: "email-templates", label: "Email Templates" }, // New subcategory
      { value: "event-flyers", label: "Event Flyers" }, // New subcategory
    ],
  },
  {
    value: "fonts",
    label: "Fonts",
    subcategories: [
      { value: "serif", label: "Serif" },
      { value: "sans-serif", label: "Sans Serif" },
      { value: "script", label: "Script" },
      { value: "monospace", label: "Monospace" },
      { value: "display", label: "Display" },
      { value: "handwritten", label: "Handwritten" },
      { value: "modern", label: "Modern" },
      { value: "vintage", label: "Vintage" }, // New subcategory
      { value: "fancy", label: "Fancy" }, // New subcategory
    ],
  },
  {
    value: "3d-models",
    label: "3D Models",
    subcategories: [
      { value: "architecture", label: "Architecture" },
      { value: "objects", label: "Objects" },
      { value: "characters", label: "Characters" },
      { value: "vehicles", label: "Vehicles" },
      { value: "interiors", label: "Interiors" },
      { value: "furniture", label: "Furniture" },
      { value: "weapons", label: "Weapons" },
      { value: "electronics", label: "Electronics" }, // New subcategory
      { value: "characters-cartoon", label: "Cartoon Characters" }, // New subcategory
    ],
  },
  {
    value: "textures",
    label: "Textures",
    subcategories: [
      { value: "wood", label: "Wood" },
      { value: "metal", label: "Metal" },
      { value: "fabric", label: "Fabric" },
      { value: "stone", label: "Stone" },
      { value: "concrete", label: "Concrete" },
      { value: "paper", label: "Paper" },
      { value: "water", label: "Water" },
      { value: "fabric", label: "Fabric" },
      { value: "leather", label: "Leather" }, // New subcategory
      { value: "rust", label: "Rust" }, // New subcategory
    ],
  },
  {
    value: "patterns",
    label: "Patterns",
    subcategories: [
      { value: "geometric", label: "Geometric" },
      { value: "floral", label: "Floral" },
      { value: "abstract", label: "Abstract" },
      { value: "polka-dot", label: "Polka Dot" },
      { value: "stripes", label: "Stripes" },
      { value: "vintage", label: "Vintage" },
      { value: "retro", label: "Retro" },
      { value: "camouflage", label: "Camouflage" }, // New subcategory
      { value: "marble", label: "Marble" }, // New subcategory
    ],
  },
  {
    value: "animations",
    label: "Animations",
    subcategories: [
      { value: "gif", label: "GIF" },
      { value: "svg", label: "SVG" },
      { value: "html5", label: "HTML5" },
      { value: "lottie", label: "Lottie" },
      { value: "2d-animation", label: "2D Animation" },
      { value: "3d-animation", label: "3D Animation" },
      { value: "motion-graphics", label: "Motion Graphics" },
      { value: "character-design", label: "Character Design" },
      { value: "animated-backgrounds", label: "Animated Backgrounds" },
      { value: "visual-effects", label: "Visual Effects" },
      { value: "text-animation", label: "Text Animation" },
      { value: "cinematic", label: "Cinematic" },
    ],
  },
  {
    value: "mockups",
    label: "Mockups",
    subcategories: [
      { value: "devices", label: "Devices" },
      { value: "print", label: "Print" },
      { value: "packaging", label: "Packaging" },
      { value: "branding", label: "Branding" },
      { value: "outdoor", label: "Outdoor" },
      { value: "apparel", label: "Apparel" },
      { value: "stationery", label: "Stationery" },
      { value: "wall-art", label: "Wall Art" }, // New subcategory
      { value: "book-covers", label: "Book Covers" }, // New subcategory
    ],
  },
  {
    value: "sports",
    label: "Sports",
    subcategories: [
      { value: "soccer", label: "Soccer" },
      { value: "basketball", label: "Basketball" },
      { value: "baseball", label: "Baseball" },
      { value: "tennis", label: "Tennis" },
      { value: "golf", label: "Golf" },
      { value: "boxing", label: "Boxing" },
      { value: "cricket", label: "Cricket" },
      { value: "athletics", label: "Athletics" },
      { value: "motorsport", label: "Motorsport" }, // New subcategory
      { value: "rugby", label: "Rugby" }, // New subcategory
    ],
  },
  {
    value: "wallpapers",
    label: "Wallpapers",
    subcategories: [
      { value: "nature", label: "Nature" },
      { value: "abstract", label: "Abstract" },
      { value: "minimal", label: "Minimal" },
      { value: "space", label: "Space" },
      { value: "animals", label: "Animals" },
      { value: "dark-mode", label: "Dark Mode" },
      { value: "3d-wallpapers", label: "3D Wallpapers" },
      { value: "gradient", label: "Gradient" },
      { value: "aesthetic", label: "Aesthetic" },
      { value: "sports", label: "Sports" },
      { value: "seasonal", label: "Seasonal" }, // For wallpapers based on seasons (spring, summer, etc.)
      { value: "gaming", label: "Gaming" }, // Popular with gamers.
      { value: "movies", label: "Movies & TV Shows" }, // For fans of cinema and shows.
    ],
  },
  {
    value: "people",
    label: "People",
    subcategories: [
      { value: "business", label: "Business" },
      { value: "family", label: "Family" },
      { value: "friends", label: "Friends" },
      { value: "portrait", label: "Portrait" },
      { value: "lifestyle", label: "Lifestyle" },
      { value: "active", label: "Active" },
      { value: "elderly", label: "Elderly" },
      { value: "professionals", label: "Professionals" },
      { value: "sportspeople", label: "Sportspeople" }, // New subcategory
      { value: "celebrities", label: "Celebrities" }, // New subcategory
    ],
  },
];
