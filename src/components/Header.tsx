import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Flex, IconButton,
  Stack,
  Collapse, Link,
  Container,
  useDisclosure,
  HStack, Badge
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="header"
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Container maxW="container.xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Link
            as={RouterLink}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="gray.800"
            _hover={{ textDecoration: "none" }}
          >
            StyleHub
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <Link
              as={RouterLink}
              to="/"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              Home
            </Link>
            <Link
              as={RouterLink}
              to="/category/men"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              Men
            </Link>
            <Link
              as={RouterLink}
              to="/category/women"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              Women
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              About
            </Link>
            <Link
              as={RouterLink}
              to="/contact"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            >
              Contact
            </Link>
          </HStack>

          {/* Cart and Mobile Menu Toggle */}
          <HStack spacing={4}>
            <Box position="relative">
              <Link as={RouterLink} to="/cart">
                <Box
                  as="svg"
                  h={6}
                  w={6}
                  color="gray.600"
                  _hover={{ color: "gray.900" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </Box>
                {getTotalItems() > 0 && (
                  <Badge
                    position="absolute"
                    top="-2"
                    right="-2"
                    bg="red.500"
                    color="white"
                    rounded="full"
                    w="5"
                    h="5"
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Link>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant="ghost"
              aria-label="Toggle Navigation"
              color="gray.600"
              _hover={{ color: "gray.900" }}
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Stack mt={4} pb={2} display={{ md: "none" }} spacing={3}>
            <Link
              as={RouterLink}
              to="/"
              py={2}
              color="gray.600"
              _hover={{ color: "gray.900" }}
              onClick={onToggle}
            >
              Home
            </Link>
            <Link
              as={RouterLink}
              to="/category/men"
              py={2}
              color="gray.600"
              _hover={{ color: "gray.900" }}
              onClick={onToggle}
            >
              Men
            </Link>
            <Link
              as={RouterLink}
              to="/category/women"
              py={2}
              color="gray.600"
              _hover={{ color: "gray.900" }}
              onClick={onToggle}
            >
              Women
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              py={2}
              color="gray.600"
              _hover={{ color: "gray.900" }}
              onClick={onToggle}
            >
              About
            </Link>
            <Link
              as={RouterLink}
              to="/contact"
              py={2}
              color="gray.600"
              _hover={{ color: "gray.900" }}
              onClick={onToggle}
            >
              Contact
            </Link>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header;
