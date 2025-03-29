import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Product } from "../types";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Select,
  SimpleGrid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  // Get unique categories
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter and sort products
  React.useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.discountPrice || product.price;
        return selectedPriceRanges.some((range) => {
          switch (range) {
            case "under-50":
              return price < 50;
            case "50-100":
              return price >= 50 && price <= 100;
            case "over-100":
              return price > 100;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
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
  }, [searchQuery, sortOption, selectedCategories, selectedPriceRanges]);

  return (
    <Container maxW="container.xl" px={4} py={8}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6}>
        All Products
      </Heading>

      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        {/* Sidebar Filters */}
        <Box w={{ base: "full", lg: "25%" }}>
          <VStack spacing={6} align="stretch">
            {/* Search */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>

            {/* Categories */}
            <FormControl>
              <FormLabel fontWeight="bold">Categories</FormLabel>
              <CheckboxGroup
                value={selectedCategories}
                onChange={setSelectedCategories}
              >
                <VStack align="start" spacing={2}>
                  {categories.map((category) => (
                    <Checkbox key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </FormControl>

            <Divider />

            {/* Price Range */}
            <FormControl>
              <FormLabel fontWeight="bold">Price Range</FormLabel>
              <CheckboxGroup
                value={selectedPriceRanges}
                onChange={setSelectedPriceRanges}
              >
                <VStack align="start" spacing={2}>
                  <Checkbox value="under-50">Under $50</Checkbox>
                  <Checkbox value="50-100">$50 - $100</Checkbox>
                  <Checkbox value="over-100">Over $100</Checkbox>
                </VStack>
              </CheckboxGroup>
            </FormControl>
          </VStack>
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

export default ProductsPage;
