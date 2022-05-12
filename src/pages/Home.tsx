import { useAtom } from "jotai";
import { Flex, Stack, Spacer } from "@chakra-ui/react";
import { searchAtom } from "../store";
import { getBrightness, getRgbString } from "../utils";
import { Search, Settings, Results, Navigation } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor] = useAtom(searchAtom);
  const textColor = getBrightness(mainColor.candidate) > 128 ? "#000" : "#FFF";

  return (
    <Stack
      direction="column"
      height="100vh"
      bg={getRgbString(mainColor.candidate)}
      color={textColor}
      fontFamily="mono"
      overflow="hidden"
    >
      <Navigation />
      <Spacer />
      <Search />
      <Spacer />
      <Flex justifyContent={"flex-end"} p={6}>
        <Settings />
      </Flex>
      <Results />
    </Stack>
  );
};
