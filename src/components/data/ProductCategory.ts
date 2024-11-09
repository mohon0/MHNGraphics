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
    ],
  },
];
