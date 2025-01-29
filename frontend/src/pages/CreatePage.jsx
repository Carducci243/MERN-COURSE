import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast=useToast()
  const{createProduct}=useProductStore()
  const handleAddProduct=async()=>{
   const {success,message}= await createProduct(newProduct)
   console.log("Success",success);
   console.log("message",message);

   if(!success){toast({
    title:"Error",
    description:message,
    status:"Error",
    isClosable:true
})}else{({
    title:"Success",
    description:message,
    status:"Success",
    isClosable:true
})}
    setNewProduct({name:"",price:"",image:""})
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          create new Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product NAme"
              name="name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            ></Input>
            <Input
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            ></Input>
            <Input
              placeholder="Product Image"
              name="image"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value });
              }}
            ></Input>
            <Button colorScheme="blue" onClick={handleAddProduct} w={'full'}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
