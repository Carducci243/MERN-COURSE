import {
  Container,
  SimpleGrid,
  Text,
  textDecoration,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
 const{fetchProducts,products}=useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);
  console.log(products)
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
        </SimpleGrid>
        <Text>
          No product Found{" "}
          <Link to={"/create"}>
            <Text as={"span"} _hover={{ textDecoration: "underline" }}>
              Create Product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
