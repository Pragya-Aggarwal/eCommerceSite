import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import {
  Box,
  Container,
  Grid,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Badge, Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  VStack,
  SimpleGrid,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

type ProductDetailParams = {
  id: string;
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<ProductDetailParams>();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
      setQuantity(1);
    }
  }, [product]);

  // Related products (same category)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <Container maxW="container.xl" py={16} textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Product Not Found
        </Heading>
        <Text mb={8}>
          The product you are looking for does not exist or has been removed.
        </Text>
        <Button
          as={RouterLink}
          to="/"
          bg="gray.900"
          color="white"
          px={6}
          py={3}
          borderRadius="md"
          fontWeight="semibold"
          _hover={{ bg: "gray.800" }}
        >
          Return to Home
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Container maxW="container.xl" px={4} py={8}>
      {/* Breadcrumb */}
      <Breadcrumb fontSize="sm" color="gray.500" mb={8} separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/" _hover={{ color: "gray.900" }}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={RouterLink}
            to={`/category/${product.category}`}
            _hover={{ color: "gray.900" }}
            textTransform="capitalize"
          >
            {product.category}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text color="gray.900">{product.name}</Text>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Product Overview */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={8}
        mb={16}
      >
        {/* Product Image */}
        <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="md">
          <Image
            src={product.image}
            alt={product.name}
            w="full"
            h="auto"
            objectFit="cover"
          />
        </Box>

        {/* Product Details */}
        <Box>
          {/* Badges */}
          <Flex mb={4} gap={2}>
            {product.isNew && (
              <Badge
                bg="blue.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={2}
                py={1}
                borderRadius="md"
              >
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge
                bg="yellow.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={2}
                py={1}
                borderRadius="md"
              >
                Best Seller
              </Badge>
            )}
            {product.discountPrice && (
              <Badge
                bg="red.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px={2}
                py={1}
                borderRadius="md"
              >
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}
                % OFF
              </Badge>
            )}
          </Flex>

          <Heading as="h1" size="xl" mb={2}>
            {product.name}
          </Heading>

          {/* Rating */}
          <Flex alignItems="center" mb={4}>
            <HStack>
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  as={StarIcon}
                  w={5}
                  h={5}
                  color={
                    index < Math.floor(product.rating)
                      ? "yellow.400"
                      : "gray.300"
                  }
                />
              ))}
            </HStack>
            <Text color="gray.600" ml={2}>
              {product.rating} ({product.reviews} reviews)
            </Text>
          </Flex>

          {/* Price */}
          <Box mb={6}>
            {product.discountPrice ? (
              <Flex alignItems="center">
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  ${product.discountPrice.toFixed(2)}
                </Text>
                <Text
                  color="gray.500"
                  fontSize="lg"
                  textDecoration="line-through"
                  ml={2}
                >
                  ${product.price.toFixed(2)}
                </Text>
              </Flex>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </Box>

          {/* Short Description */}
          <Text color="gray.600" mb={6}>
            {product.description}
          </Text>

          {/* Size Selection */}
          <Box mb={6}>
            <Text fontWeight="semibold" color="gray.900" mb={2}>
              Size
            </Text>
            <Flex flexWrap="wrap" gap={2}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  size="sm"
                  variant={selectedSize === size ? "solid" : "outline"}
                  colorScheme={selectedSize === size ? "gray" : "gray"}
                  borderColor={selectedSize === size ? "gray.900" : "gray.300"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Color Selection */}
          <Box mb={8}>
            <Text fontWeight="semibold" color="gray.900" mb={2}>
              Color
            </Text>
            <Flex flexWrap="wrap" gap={2}>
              {product.colors.map((color) => (
                <Button
                  key={color}
                  size="sm"
                  variant={selectedColor === color ? "solid" : "outline"}
                  colorScheme={selectedColor === color ? "gray" : "gray"}
                  borderColor={
                    selectedColor === color ? "gray.900" : "gray.300"
                  }
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Quantity and Add to Cart */}
          <Flex gap={4}>
            <NumberInput
              size="md"
              maxW={32}
              defaultValue={1}
              min={1}
              value={quantity}
              onChange={(_, val) => setQuantity(val)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              flex="1"
              onClick={handleAddToCart}
              bg="gray.900"
              color="white"
              py={2}
              px={6}
              borderRadius="md"
              fontWeight="semibold"
              _hover={{ bg: "gray.800" }}
            >
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </Grid>

      {/* Product Tabs */}
      <Box mb={16}>
        <Tabs
          variant="enclosed"
          colorScheme="gray"
          index={activeTab}
          onChange={setActiveTab}
        >
          <TabList borderBottom="1px" borderColor="gray.200">
            <Tab
              py={4}
              px={1}
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: "gray.900", borderColor: "gray.900" }}
            >
              Description
            </Tab>
            <Tab
              py={4}
              px={1}
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: "gray.900", borderColor: "gray.900" }}
            >
              Details
            </Tab>
            <Tab
              py={4}
              px={1}
              fontWeight="medium"
              fontSize="sm"
              _selected={{ color: "gray.900", borderColor: "gray.900" }}
            >
              Reviews ({product.reviews})
            </Tab>
          </TabList>
          <TabPanels p={4}>
            <TabPanel>
              <Text color="gray.600">
                {product.detailedDescription || product.description}
              </Text>
            </TabPanel>
            <TabPanel>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="semibold" mb={1}>
                    Material
                  </Text>
                  <Text color="gray.600">
                    {product.material || "Cotton, Polyester"}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={1}>
                    Dimensions
                  </Text>
                  <Text color="gray.600">
                    {product.dimensions || "Varies by size"}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="semibold" mb={1}>
                    Care Instructions
                  </Text>
                  <Text color="gray.600">
                    {product.careInstructions ||
                      "Machine wash cold, tumble dry low, do not bleach"}
                  </Text>
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Text color="gray.600">
                Customer reviews will be displayed here.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box mb={16}>
          <Heading as="h2" size="lg" mb={6}>
            Related Products
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage;
