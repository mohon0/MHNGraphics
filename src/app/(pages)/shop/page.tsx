"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  Download,
  Filter,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = [
  "All",
  "Photos",
  "Vectors",
  "Illustrations",
  "Icons",
  "Templates",
  "3D Assets",
];

const products = [
  {
    id: 1,
    name: "Abstract Geometric Background",
    category: "Vectors",
    price: 9.99,
    downloads: 1234,
    image:
      "https://img.freepik.com/free-vector/abstract-geometric-background_1045-764.jpg?w=740&t=st=1703373391~exp=1703373991~hmac=7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
  },
  {
    id: 2,
    name: "Professional Icon Pack",
    category: "Icons",
    price: 14.99,
    downloads: 5678,
    image:
      "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?w=826&t=st=1703373425~exp=1703374025~hmac=8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f",
  },
  {
    id: 3,
    name: "Nature Photography Bundle",
    category: "Photos",
    price: 24.99,
    downloads: 3456,
    image:
      "https://img.freepik.com/free-photo/beautiful-shot-small-lake-surrounded-by-snow-covered-mountains_181624-46748.jpg?w=740&t=st=1703373455~exp=1703374055~hmac=9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f",
  },
  {
    id: 4,
    name: "3D Character Model",
    category: "3D Assets",
    price: 39.99,
    downloads: 789,
    image:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1703373484~exp=1703374084~hmac=0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a",
  },
  {
    id: 5,
    name: "Social Media Template Kit",
    category: "Templates",
    price: 19.99,
    downloads: 2345,
    image:
      "https://img.freepik.com/free-vector/social-media-post-collection_52683-43131.jpg?w=740&t=st=1703373515~exp=1703374115~hmac=1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b",
  },
  {
    id: 6,
    name: "Hand-drawn Illustration Set",
    category: "Illustrations",
    price: 29.99,
    downloads: 1567,
    image:
      "https://img.freepik.com/free-vector/hand-drawn-abstract-shapes_23-2149097292.jpg?w=740&t=st=1703373543~exp=1703374143~hmac=2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c",
  },
];

const featuredProducts = [
  {
    id: 7,
    name: "Premium Business Card Templates",
    category: "Templates",
    price: 34.99,
    downloads: 8901,
    image:
      "https://img.freepik.com/free-psd/business-card-mockup_1389-1200.jpg?w=826&t=st=1703375619~exp=1703376219~hmac=3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d",
  },
  {
    id: 8,
    name: "Artistic Watercolor Textures",
    category: "Illustrations",
    price: 19.99,
    downloads: 6789,
    image:
      "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=826&t=st=1703375657~exp=1703376257~hmac=4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e",
  },
  {
    id: 9,
    name: "Isometric Office Icons",
    category: "Icons",
    price: 24.99,
    downloads: 5432,
    image:
      "https://img.freepik.com/free-vector/isometric-office-collection_23-2148403773.jpg?w=826&t=st=1703375688~exp=1703376288~hmac=5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f",
  },
];

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Oylkka Graphics Shop
      </h1>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-2 top-2">
                  <Badge variant="secondary" className="bg-zinc-900 text-white">
                    Featured
                  </Badge>
                </div>
              </div>
              <CardContent className="flex-grow p-4">
                <CardTitle className="mb-2 line-clamp-2 text-lg">
                  {product.name}
                </CardTitle>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <p className="text-2xl font-bold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-zinc-50 p-4">
                <div className="flex items-center text-sm text-zinc-600">
                  <Download className="mr-1 h-4 w-4" />
                  {product.downloads.toLocaleString()}
                </div>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold">
              Summer Sale: 30% Off All Templates!
            </h2>
            <p className="mb-6 text-lg">
              Elevate your designs with our premium templates. Limited time
              offer.
            </p>
            <Button variant="secondary" size="lg">
              Shop Templates <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
            <Image
              src="https://img.freepik.com/free-vector/abstract-geometric-pattern-background_1319-242.jpg?w=740&t=st=1703375896~exp=1703376496~hmac=6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f"
              alt="Geometric Pattern"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-grow">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search assets..."
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-zinc-400" />
            </div>
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Price Range Slider */}
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Price Range</h2>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="mt-2 flex justify-between text-sm text-zinc-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex-grow p-4">
                <CardTitle className="mb-2 line-clamp-2 text-lg">
                  {product.name}
                </CardTitle>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <p className="text-2xl font-bold text-zinc-900">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-zinc-50 p-4">
                <div className="flex items-center text-sm text-zinc-600">
                  <Download className="mr-1 h-4 w-4" />
                  {product.downloads.toLocaleString()}
                </div>
                <Button
                  variant="outline"
                  className="transition-colors group-hover:bg-zinc-900 group-hover:text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold">What Our Customers Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Alex Johnson",
              role: "Graphic Designer",
              comment:
                "The quality of assets on Oylkka Graphics is outstanding. It has significantly improved my workflow.",
              rating: 5,
            },
            {
              name: "Sarah Lee",
              role: "Marketing Specialist",
              comment:
                "I love the variety of templates available. They're perfect for my social media campaigns.",
              rating: 4,
            },
            {
              name: "Michael Chen",
              role: "Web Developer",
              comment:
                "The 3D assets are top-notch. I've used them in several projects with great results.",
              rating: 5,
            },
          ].map((review, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
                    />
                  ))}
                </div>
                <CardTitle>{review.name}</CardTitle>
                <p className="text-sm text-zinc-500">{review.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="flex justify-center">
        <div className="join">
          <Button variant="outline" className="join-item">
            Previous
          </Button>
          <Button variant="outline" className="join-item">
            1
          </Button>
          <Button variant="outline" className="join-item">
            2
          </Button>
          <Button variant="outline" className="join-item">
            3
          </Button>
          <Button variant="outline" className="join-item">
            Next
          </Button>
        </div>
      </section>
    </div>
  );
}
