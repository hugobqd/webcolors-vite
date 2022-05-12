import { useAtom } from "jotai";
import { Flex, Center } from "@chakra-ui/react";
import { searchAtom } from "../store";
import { getBrightness, getRgbString } from "../utils";
import { Search, Results, Navigation } from "../components";

export const Home = () => {
  console.log("🔥 Home");

  const [mainColor] = useAtom(searchAtom);
  const textColor = getBrightness(mainColor.candidate) > 128 ? "#000" : "#FFF";

  return (
    <Flex
      direction="column"
      height="100vh"
      bg={getRgbString(mainColor.candidate)}
      color={textColor}
      fontFamily="mono"
      overflow="hidden"
    >
      <Navigation />
      <Center flex={1}>
        <Search />
      </Center>
      <Results />
    </Flex>
  );
};
