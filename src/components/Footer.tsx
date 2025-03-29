import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  Input,
  Button, Icon,
  VStack,
  HStack
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.900" color="white">
      <Container maxW="container.xl" px={4} py={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {/* Company Information */}
          <Box>
            <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4}>
              StyleHub
            </Heading>
            <Text color="gray.400" mb={4}>
              Your one-stop destination for trendy and affordable fashion for
              men and women.
            </Text>
            <HStack spacing={4}>
              <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaFacebook} w={5} h={5} />
              </Link>
              <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaInstagram} w={5} h={5} />
              </Link>
              <Link href="#" color="gray.400" _hover={{ color: "white" }}>
                <Icon as={FaTwitter} w={5} h={5} />
              </Link>
            </HStack>
          </Box>

          {/* Shop Categories */}
          <Box>
            <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4}>
              Shop
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Link
                as={RouterLink}
                to="/category/men"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Men's Clothing
              </Link>
              <Link
                as={RouterLink}
                to="/category/women"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Women's Clothing
              </Link>
              <Link
                as={RouterLink}
                to="/new-arrivals"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                New Arrivals
              </Link>
              <Link
                as={RouterLink}
                to="/sale"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Sale
              </Link>
            </VStack>
          </Box>

          {/* Information */}
          <Box>
            <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4}>
              Information
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Link
                as={RouterLink}
                to="/about"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                About Us
              </Link>
              <Link
                as={RouterLink}
                to="/contact"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Contact Us
              </Link>
              <Link
                as={RouterLink}
                to="/faq"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                FAQ
              </Link>
              <Link
                as={RouterLink}
                to="/shipping"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Shipping & Returns
              </Link>
              <Link
                as={RouterLink}
                to="/privacy-policy"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                Privacy Policy
              </Link>
            </VStack>
          </Box>

          {/* Newsletter */}
          <Box>
            <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4}>
              Newsletter
            </Heading>
            <Text color="gray.400" mb={4}>
              Subscribe to our newsletter for the latest updates and offers.
            </Text>
            <Stack as="form" spacing={2}>
              <Input
                type="email"
                placeholder="Your email address"
                px={4}
                py={2}
                bg="gray.800"
                border="1px solid"
                borderColor="gray.700"
                rounded="md"
                _focus={{ outline: "none", borderColor: "white" }}
              />
              <Button
                type="submit"
                bg="white"
                color="gray.900"
                px={4}
                py={2}
                rounded="md"
                fontWeight="medium"
                _hover={{ bg: "gray.200" }}
                transition="colors 0.3s"
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </SimpleGrid>

        <Box
          mt={10}
          pt={6}
          borderTop="1px solid"
          borderColor="gray.800"
          textAlign="center"
          color="gray.400"
        >
          <Text>
            &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
