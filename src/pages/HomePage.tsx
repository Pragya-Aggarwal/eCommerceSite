import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  Box,
  Button,
  Container,
  Flex, Heading,
  Image,
  Input,
  Link, Text,
  SimpleGrid
} from "@chakra-ui/react";
import { fashionIcon, menFashion, womenFashion } from "../assets";

const HomePage: React.FC = () => {
  const featuredProducts = products
    .filter((product) => product.isBestSeller)
    .slice(0, 4);
  const menProducts = products
    .filter((product) => product.category === "men")
    .slice(0, 4);
  const womenProducts = products
    .filter((product) => product.category === "women")
    .slice(0, 4);

  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box position="relative" bg="gray.900" color="white">
        <Box position="absolute" inset="0" overflow="hidden">
          <Image
            src={fashionIcon}
            alt="Fashion hero"
            objectFit="cover"
            w="full"
            // h="full"
            opacity="0.5"
          />
        </Box>
        <Container
          maxW="container.xl"
          px={4}
          py={24}
          position="relative"
          zIndex="1"
        >
          <Box maxW="lg">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              mb={4}
            >
              Discover Your Style
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} mb={8}>
              Explore our latest collections of men's and women's fashion.
            </Text>
            <Flex flexWrap="wrap" gap={4}>
              <Button
                as={RouterLink}
                to="/category/men"
                bg="white"
                color="gray.900"
                px={6}
                py={3}
                rounded="md"
                fontWeight="semibold"
                _hover={{ bg: "gray.100" }}
                transition="all 0.3s"
              >
                Shop Men
              </Button>
              <Button
                as={RouterLink}
                to="/category/women"
                variant="outline"
                borderWidth={2}
                borderColor="white"
                color="white"
                px={6}
                py={3}
                rounded="md"
                fontWeight="semibold"
                _hover={{ bg: "white", color: "gray.900" }}
                transition="all 0.3s"
              >
                Shop Women
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxW="container.xl" px={4} py={16}>
        <Box textAlign="center" mb={12}>
          <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={2}>
            Featured Products
          </Heading>
          <Text color="gray.600">
            Our most popular items, loved by customers
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
        <Box textAlign="center" mt={8}>
          <Button
            as={RouterLink}
            to="/products"
            variant="outline"
            borderWidth={2}
            borderColor="gray.900"
            color="gray.900"
            px={6}
            py={3}
            rounded="md"
            fontWeight="semibold"
            _hover={{ bg: "gray.900", color: "white" }}
            transition="all 0.3s"
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box bg="gray.100" py={16}>
        <Container maxW="container.xl" px={4}>
          <Box textAlign="center" mb={12}>
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={2}>
              Shop by Category
            </Heading>
            <Text color="gray.600">Find exactly what you're looking for</Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Men's Category */}
            <Box position="relative" rounded="lg" overflow="hidden">
              <Box position="relative" paddingBottom="56.25%">
                <Image
                  src={menFashion}
                  alt="Men's Fashion"
                  objectFit="cover"
                  position="absolute"
                  // w="full"
                  // h="full"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
              </Box>
              <Flex
                position="absolute"
                inset="0"
                bg="blackAlpha.600"
                align="center"
                justify="center"
              >
                <Box textAlign="center">
                  <Heading
                    as="h3"
                    color="white"
                    fontSize="2xl"
                    fontWeight="bold"
                    mb={2}
                  >
                    Men's Collection
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/category/men"
                    bg="white"
                    color="gray.900"
                    px={4}
                    py={2}
                    rounded="md"
                    fontWeight="medium"
                    _hover={{ bg: "gray.100" }}
                    transition="all 0.3s"
                  >
                    Shop Now
                  </Button>
                </Box>
              </Flex>
            </Box>

            {/* Women's Category */}
            <Box position="relative" rounded="lg" overflow="hidden">
              <Box position="relative" paddingBottom="56.25%">
                <Image
                  src={womenFashion}
                  alt="Women's Fashion"
                  objectFit="cover"
                  position="absolute"
                  w="full"
                  // h="full"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
              </Box>
              <Flex
                position="absolute"
                inset="0"
                bg="blackAlpha.600"
                align="center"
                justify="center"
              >
                <Box textAlign="center">
                  <Heading
                    as="h3"
                    color="white"
                    fontSize="2xl"
                    fontWeight="bold"
                    mb={2}
                  >
                    Women's Collection
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/category/women"
                    bg="white"
                    color="gray.900"
                    px={4}
                    py={2}
                    rounded="md"
                    fontWeight="medium"
                    _hover={{ bg: "gray.100" }}
                    transition="all 0.3s"
                  >
                    Shop Now
                  </Button>
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Men's Collection Section */}
      <Container maxW="container.xl" px={4} py={16}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h2" fontSize="2xl" fontWeight="bold">
            Men's Collection
          </Heading>
          <Link
            as={RouterLink}
            to="/category/men"
            color="gray.600"
            _hover={{ color: "gray.900" }}
          >
            View All →
          </Link>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Women's Collection Section */}
      <Container maxW="container.xl" px={4} py={16}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h2" fontSize="2xl" fontWeight="bold">
            Women's Collection
          </Heading>
          <Link
            as={RouterLink}
            to="/category/women"
            color="gray.600"
            _hover={{ color: "gray.900" }}
          >
            View All →
          </Link>
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>

      {/* Newsletter Section */}
      <Box bg="gray.900" color="white" py={16}>
        <Container maxW="container.xl" px={4} textAlign="center">
          <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
            Join Our Newsletter
          </Heading>
          <Text color="gray.300" mb={8} maxW="xl" mx="auto">
            Subscribe to our newsletter and be the first to know about new
            collections, special offers, and exclusive events.
          </Text>
          <Flex
            as="form"
            maxW="md"
            mx="auto"
            flexDir={{ base: "column", sm: "row" }}
            gap={2}
          >
            <Input
              type="email"
              placeholder="Your email address"
              flex="1"
              px={4}
              py={3}
              rounded="md"
              focusBorderColor="white"
              color="gray.900"
              bg="white"
            />
            <Button
              type="submit"
              bg="white"
              color="gray.900"
              px={6}
              py={3}
              rounded="md"
              fontWeight="semibold"
              _hover={{ bg: "gray.100" }}
              transition="all 0.3s"
            >
              Subscribe
            </Button>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
