import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex, Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, VStack,
  Divider,
  Link,
  Icon
} from "@chakra-ui/react";
import { CloseIcon, ArrowBackIcon } from "@chakra-ui/icons";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" px={4} py={16} textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Your Cart is Empty
        </Heading>
        <Text color="gray.600" mb={8}>
          Looks like you haven't added any items to your cart yet.
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
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" px={4} py={8}>
      <Heading as="h1" size="xl" mb={8}>
        Your Shopping Cart
      </Heading>

      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        {/* Cart Items */}
        <Box w={{ base: "full", lg: "2/3" }} flex="2">
          <Box bg="white" borderRadius="lg" boxShadow="md" overflow="hidden">
            <Table variant="simple" width="full">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Product</Th>
                  <Th textAlign="center">Quantity</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <Flex align="center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="16"
                          h="16"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <Box ml={4}>
                          <Link
                            as={RouterLink}
                            to={`/product/${item.id}`}
                            color="gray.900"
                            fontWeight="medium"
                            _hover={{ color: "blue.600" }}
                          >
                            {item.name}
                          </Link>
                          <Text color="gray.500" fontSize="sm" mt={1}>
                            {item.sizes[0]}, {item.colors[0]}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td textAlign="center">
                      <Flex justify="center">
                        <NumberInput
                          size="sm"
                          maxW="80px"
                          min={1}
                          value={item.quantity}
                          onChange={(_, val) => updateQuantity(item.id, val)}
                        >
                          <NumberInputField textAlign="center" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </Td>
                    <Td isNumeric>
                      {item.discountPrice ? (
                        <Flex direction="column" align="flex-end">
                          <Text color="gray.900">
                            ${item.discountPrice.toFixed(2)}
                          </Text>
                          <Text
                            color="gray.500"
                            fontSize="sm"
                            textDecoration="line-through"
                          >
                            ${item.price.toFixed(2)}
                          </Text>
                        </Flex>
                      ) : (
                        <Text color="gray.900">${item.price.toFixed(2)}</Text>
                      )}
                    </Td>
                    <Td isNumeric>
                      <Text color="gray.900" fontWeight="medium">
                        $
                        {(
                          (item.discountPrice || item.price) * item.quantity
                        ).toFixed(2)}
                      </Text>
                    </Td>
                    <Td isNumeric>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "red.500" }}
                        p={1}
                        minW="auto"
                        height="auto"
                      >
                        <Icon as={CloseIcon} w={3} h={3} />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Flex justify="space-between" mt={6}>
            <Button
              as={RouterLink}
              to="/"
              variant="link"
              color="blue.600"
              _hover={{ color: "blue.800" }}
              leftIcon={<ArrowBackIcon />}
            >
              Continue Shopping
            </Button>
            <Button
              onClick={clearCart}
              variant="link"
              color="red.600"
              _hover={{ color: "red.800" }}
            >
              Clear Cart
            </Button>
          </Flex>
        </Box>

        {/* Order Summary */}
        <Box w={{ base: "full", lg: "1/3" }} flex="1">
          <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
            <Heading as="h2" size="md" mb={4}>
              Order Summary
            </Heading>

            <VStack spacing={3} mb={6} align="stretch">
              <Flex justify="space-between">
                <Text color="gray.600">Subtotal</Text>
                <Text color="gray.900" fontWeight="medium">
                  ${getCartTotal().toFixed(2)}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.600">Shipping</Text>
                <Text color="gray.900" fontWeight="medium">
                  $0.00
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text color="gray.600">Tax</Text>
                <Text color="gray.900" fontWeight="medium">
                  ${(getCartTotal() * 0.1).toFixed(2)}
                </Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" pt={3}>
                <Text fontSize="lg" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  ${(getCartTotal() * 1.1).toFixed(2)}
                </Text>
              </Flex>
            </VStack>

            <Button
              w="full"
              bg="gray.900"
              color="white"
              py={3}
              px={4}
              borderRadius="md"
              fontWeight="semibold"
              _hover={{ bg: "gray.800" }}
            >
              Proceed to Checkout
            </Button>

            <Box mt={6}>
              <Flex align="center" justify="center" gap={4} mb={4}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/196/196578.png"
                  alt="Visa"
                  h={6}
                />
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/196/196561.png"
                  alt="Mastercard"
                  h={6}
                />
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/196/196539.png"
                  alt="Amex"
                  h={6}
                />
                <Image
                  src="https://cdn-icons-png.flaticon.com/128/196/196565.png"
                  alt="PayPal"
                  h={6}
                />
              </Flex>
              <Text color="gray.500" fontSize="xs" textAlign="center">
                Secure checkout provided by trusted payment processors.
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default CartPage;
