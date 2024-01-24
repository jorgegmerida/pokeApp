import { Box, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      textAlign={"center"}
      marginTop={"200px"}
    >
      <Stack direction={"column"} spacing={50}>
        <Text fontSize={"xx-large"}>404 - Page Not Found</Text>
        <Text
          fontSize={"x-large"}
          onClick={() => router.push("/")}
          cursor={"pointer"}
        >
          Back to Home
        </Text>
      </Stack>
    </Box>
  );
}
