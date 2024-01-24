import { Box, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      textAlign={"center"}
      marginTop={"200px"}
    >
      <Stack direction={"column"} spacing={50}>
        <Text fontSize={"xx-large"}>404 - Page Not Found</Text>
        <Link href="/">
          <Text fontSize={"x-large"} cursor={"pointer"}>
            Back to Home
          </Text>
        </Link>
      </Stack>
    </Box>
  );
}
