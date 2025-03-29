import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Product } from "../types";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  List,
  ListItem,
  Select,
  SimpleGrid, HStack
} from "@chakra-ui/react";

type CategoryParams = {
  category: string;
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<CategoryParams>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [activeSubcategory, setActiveSubcategory] = useState("all");

  // Get unique subcategories
  const subcategories = [
    ...new Set(
      products
        .filter((product) => product.category === category)
        .map((product) => product.subcategory)
    ),
  ];

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter((product) => product.category === category);

    if (activeSubcategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subcategory === activeSubcategory
      );
    }

    let sorted = [...filtered];

    switch (sortOption) {
      case "price-low-high":
        sorted.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-high-low":
        sorted.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "newest":
        sorted = sorted
          .filter((product) => product.isNew)
          .concat(sorted.filter((product) => !product.isNew));
        break;
      case "best-sellers":
        sorted = sorted
          .filter((product) => product.isBestSeller)
          .concat(sorted.filter((product) => !product.isBestSeller));
        break;
      default: // featured or invalid option
        sorted = sorted
          .filter((product) => product.isBestSeller || product.isNew)
          .concat(
            sorted.filter((product) => !product.isBestSeller && !product.isNew)
          );
    }

    setFilteredProducts(sorted);
  }, [category, sortOption, activeSubcategory]);

  const categoryTitle =
    category === "men" ? "Men's Collection" : "Women's Collection";

  return (
    <Container maxW="container.xl" px={4} py={8}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6}>
        {categoryTitle}
      </Heading>

      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        {/* Sidebar Filters */}
        <Box w={{ base: "full", lg: "25%" }}>
          <Box bg="white" p={4} borderRadius="lg" boxShadow="md" mb={6}>
            <Heading as="h2" fontSize="xl" fontWeight="bold" mb={4}>
              Categories
            </Heading>
            <List spacing={2}>
              <ListItem>
                <Button
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  fontWeight={activeSubcategory === "all" ? "bold" : "normal"}
                  color={activeSubcategory === "all" ? "blue.600" : "gray.700"}
                  onClick={() => setActiveSubcategory("all")}
                  px={0}
                >
                  All {categoryTitle}
                </Button>
              </ListItem>
              {subcategories.map((sub) => (
                <ListItem key={sub}>
                  <Button
                    variant="ghost"
                    w="full"
                    justifyContent="flex-start"
                    fontWeight={activeSubcategory === sub ? "bold" : "normal"}
                    color={activeSubcategory === sub ? "blue.600" : "gray.700"}
                    onClick={() => setActiveSubcategory(sub)}
                    textTransform="capitalize"
                    px={0}
                  >
                    {sub.replace("-", " ")}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Product Grid */}
        <Box w={{ base: "full", lg: "75%" }}>
          {/* Sort Options */}
          <Flex justify="space-between" align="center" mb={6}>
            <Text color="gray.600">
              Showing {filteredProducts.length} products
            </Text>
            <HStack>
              <Text as="label" htmlFor="sort" color="gray.600" mr={2}>
                Sort by:
              </Text>
              <Select
                id="sort"
                borderColor="gray.300"
                rounded="md"
                size="sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="best-sellers">Best Sellers</option>
              </Select>
            </HStack>
          </Flex>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <Box textAlign="center" py={12}>
              <Text color="gray.600">No products found.</Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default CategoryPage;
