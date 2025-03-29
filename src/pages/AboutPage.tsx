import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack, Icon
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { janeSmith, john, LisaJohnson, MichaelBrown, teamWork } from "../assets";

const AboutPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={10}>
      {/* Hero Section */}
      <Box mb={16} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          About Our Store
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
          We're dedicated to providing you with the best shopping experience and
          quality products at affordable prices.
        </Text>
      </Box>

      {/* Our Story Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} mb={20}>
        <Box>
          <Heading as="h2" size="xl" mb={6}>
            Our Story
          </Heading>
          <Text color="gray.600" fontSize="lg" mb={4}>
            Founded in 2020, our company began with a simple vision: to create a
            one-stop destination for fashion enthusiasts who value both style
            and quality. We started as a small family business and have since
            grown into a trusted online retailer serving customers nationwide.
          </Text>
          <Text color="gray.600" fontSize="lg">
            Our founders, having spent years in the retail industry, noticed a
            gap in the market for affordable yet high-quality clothing. This
            realization sparked the journey that led to the creation of our
            store. Today, we continue to honor our founding principles by
            carefully selecting each item in our collection and ensuring that
            every customer interaction exceeds expectations.
          </Text>
        </Box>
        <Box>
          <Image
            src={teamWork}
            alt="Team working together"
            w="full"
            h="full"
            objectFit="cover"
            borderRadius="md"
            boxShadow="lg"
          />
        </Box>
      </SimpleGrid>

      {/* Our Values Section */}
      <Box mb={20}>
        <Heading as="h2" size="xl" mb={10} textAlign="center">
          Our Values
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <VStack align="flex-start" spacing={4}>
            <Icon as={CheckIcon} w={10} h={10} color="green.500" />
            <Heading as="h3" size="md">
              Quality
            </Heading>
            <Text color="gray.600">
              We never compromise on quality. Each item in our store is
              carefully selected and inspected to ensure it meets our high
              standards.
            </Text>
          </VStack>
          <VStack align="flex-start" spacing={4}>
            <Icon as={CheckIcon} w={10} h={10} color="green.500" />
            <Heading as="h3" size="md">
              Affordability
            </Heading>
            <Text color="gray.600">
              We believe that great style shouldn't break the bank. Our products
              are priced fairly to ensure accessibility without sacrificing
              quality.
            </Text>
          </VStack>
          <VStack align="flex-start" spacing={4}>
            <Icon as={CheckIcon} w={10} h={10} color="green.500" />
            <Heading as="h3" size="md">
              Sustainability
            </Heading>
            <Text color="gray.600">
              We're committed to reducing our environmental impact. From
              eco-friendly packaging to partnering with responsible suppliers,
              sustainability guides our decisions.
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>

      {/* Team Section */}
      <Box mb={20}>
        <Heading as="h2" size="xl" mb={10} textAlign="center">
          Our Team
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {[
            {
              name: "John Doe",
              position: "Founder & CEO",
              image: john,
            },
            {
              name: "Jane Smith",
              position: "Creative Director",
              image: janeSmith,
            },
            {
              name: "Michael Brown",
              position: "Head of Operations",
              image: MichaelBrown,
            },
            {
              name: "Lisa Johnson",
              position: "Customer Service Lead",
              image:LisaJohnson,
            },
          ].map((member, index) => (
            <VStack
              key={index}
              align="center"
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Image
                src={member.image}
                alt={member.name}
                borderRadius="full"
                boxSize="150px"
                // objectFit="cover"
                mb={4}
              />
              <Heading as="h3" size="md">
                {member.name}
              </Heading>
              <Text color="gray.500">{member.position}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* Our Mission */}
      <Box bg="gray.50" p={10} borderRadius="lg" mb={10}>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Our Mission
        </Heading>
        <Text
          fontSize="lg"
          color="gray.600"
          textAlign="center"
          maxW="3xl"
          mx="auto"
        >
          To provide our customers with high-quality, affordable fashion that
          not only looks good but feels good too. We strive to create a shopping
          experience that is enjoyable, seamless, and exceeds expectations at
          every touchpoint.
        </Text>
      </Box>
    </Container>
  );
};

export default AboutPage;
