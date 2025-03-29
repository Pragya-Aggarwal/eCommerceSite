import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Flex,
  Text,
  Image,
  Link,
  Badge,
  IconButton, HStack,
  VStack,
  Icon
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Box
      position="relative"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      transition="box-shadow 0.3s"
      _hover={{ boxShadow: "lg" }}
      role="group"
    >
      {/* Product Image */}
      <Link as={RouterLink} to={`/product/${product.id}`}>
        <Box position="relative" paddingBottom="125%" overflow="hidden">
          <Image
            src={product.image}
            alt={product.name}
            position="absolute"
            inset="0"
            w="full"
            h="full"
            objectFit="cover"
            transition="transform 0.3s"
            _groupHover={{ transform: "scale(1.05)" }}
          />

          {/* Badges */}
          <VStack
            position="absolute"
            top="2"
            left="2"
            spacing="1"
            align="flex-start"
          >
            {product.isNew && (
              <Badge
                bg="blue.500"
                color="white"
                fontSize="xs"
                fontWeight="bold"
                px="2"
                py="1"
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
                px="2"
                py="1"
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
                px="2"
                py="1"
                borderRadius="md"
              >
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}
                % OFF
              </Badge>
            )}
          </VStack>
        </Box>
      </Link>

      {/* Product Info */}
      <Box p="4">
        <Link as={RouterLink} to={`/product/${product.id}`}>
          <Text color="gray.900" fontWeight="semibold" mb="1" isTruncated>
            {product.name}
          </Text>
        </Link>

        <Flex align="center" mb="2">
          <HStack>
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                as={StarIcon}
                w="4"
                h="4"
                color={
                  index < Math.floor(product.rating) ? "yellow.400" : "gray.300"
                }
              />
            ))}
          </HStack>
          <Text color="gray.500" fontSize="xs" ml="1">
            ({product.reviews})
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Flex align="center">
            {product.discountPrice ? (
              <>
                <Text color="gray.800" fontWeight="bold">
                  ${product.discountPrice.toFixed(2)}
                </Text>
                <Text
                  color="gray.500"
                  fontSize="sm"
                  textDecoration="line-through"
                  ml="2"
                >
                  ${product.price.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text color="gray.800" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Text>
            )}
          </Flex>

          <IconButton
            onClick={() => addToCart(product)}
            bg="gray.900"
            color="white"
            p="2"
            borderRadius="full"
            _hover={{ bg: "gray.700" }}
            aria-label="Add to cart"
            icon={
              <Box
                as="svg"
                w="5"
                h="5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </Box>
            }
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
