import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Container maxW="container.xl" py={10}>
      {/* Hero Section */}
      <Box mb={16} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          Contact Us
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
          Have questions or feedback? We'd love to hear from you. Reach out to
          our team through any of the channels below.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} mb={20}>
        {/* Contact Form */}
        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={6}>
            Send Us a Message
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                isLoading={isSubmitting}
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Contact Information */}
        <Box>
          <Heading as="h2" size="lg" mb={6}>
            Our Contact Information
          </Heading>
          <VStack spacing={8} align="flex-start">
            <HStack spacing={4}>
              <Flex
                w={12}
                h={12}
                bg="blue.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Icon as={EmailIcon} w={6} h={6} color="blue.500" />
              </Flex>
              <Box>
                <Heading as="h3" size="md" mb={1}>
                  Email Us
                </Heading>
                <Text color="gray.600">support@fashionstore.com</Text>
                <Text color="gray.600">sales@fashionstore.com</Text>
              </Box>
            </HStack>

            <HStack spacing={4}>
              <Flex
                w={12}
                h={12}
                bg="green.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Icon as={PhoneIcon} w={6} h={6} color="green.500" />
              </Flex>
              <Box>
                <Heading as="h3" size="md" mb={1}>
                  Call Us
                </Heading>
                <Text color="gray.600">+1 (555) 123-4567</Text>
                <Text color="gray.600">Mon-Fri: 9AM - 5PM ET</Text>
              </Box>
            </HStack>

            <HStack spacing={4}>
              <Flex
                w={12}
                h={12}
                bg="purple.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Icon as={FaMapMarkerAlt} w={6} h={6} color="purple.500" />
              </Flex>
              <Box>
                <Heading as="h3" size="md" mb={1}>
                  Visit Us
                </Heading>
                <Text color="gray.600">123 Fashion Avenue</Text>
                <Text color="gray.600">New York, NY 10001</Text>
              </Box>
            </HStack>

            <HStack spacing={4}>
              <Flex
                w={12}
                h={12}
                bg="yellow.100"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Icon as={InfoIcon} w={6} h={6} color="yellow.500" />
              </Flex>
              <Box>
                <Heading as="h3" size="md" mb={1}>
                  Customer Support Hours
                </Heading>
                <Text color="gray.600">Monday - Friday: 9AM - 8PM ET</Text>
                <Text color="gray.600">Saturday: 10AM - 6PM ET</Text>
                <Text color="gray.600">Sunday: Closed</Text>
              </Box>
            </HStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* FAQ Section */}
      <Box bg="gray.50" p={10} borderRadius="lg">
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Frequently Asked Questions
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {[
            {
              question: "What is your return policy?",
              answer:
                "We offer a 30-day return policy for all unused and unworn items in their original packaging. Please visit our Returns page for more information.",
            },
            {
              question: "How can I track my order?",
              answer:
                "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account dashboard.",
            },
            {
              question: "Do you ship internationally?",
              answer:
                "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
            },
            {
              question: "How long does shipping take?",
              answer:
                "Standard domestic shipping takes 3-5 business days. Express shipping options are available at checkout.",
            },
          ].map((faq, index) => (
            <Box key={index} bg="white" p={6} borderRadius="md" boxShadow="sm">
              <Heading as="h3" size="md" mb={2}>
                {faq.question}
              </Heading>
              <Text color="gray.600">{faq.answer}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default ContactPage;
