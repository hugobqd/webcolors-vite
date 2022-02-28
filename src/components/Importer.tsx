import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  Badge,
  Box,
  BoxProps,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { listAtom, shadesAtom } from "../store";
import * as importedLibs from "../libs";
import type { Lib, Shade } from "../types";
import { Logo } from ".";

interface LibsInObject {
  [key: string]: Lib;
}

const libs: LibsInObject = importedLibs;

export const Importer = (props: BoxProps) => {
  console.log("🔥 Importer");

  // TODO: check if list in storage match imported libs key
  const [list, setList] = useAtom(listAtom);
  const [_, setShades] = useAtom(shadesAtom);

  useEffect(() => {
    console.log("✅ list", list);

    const newShades = list.reduce(
      (acc: Shade[], val: string) => [...acc, ...libs[val].colors],
      []
    );
    setShades(newShades);
  }, [list]);

  return (
    <Stack bg="white" p={3} rounded="md" color="gray.800" {...props}>
      <FormControl>
        <FormLabel>
          Libraries{" "}
          <Badge
            rounded="full"
            colorScheme={list.length ? "blackAlpha" : "red"}
            position="relative"
            variant={"solid"}
            top="-.1em"
          >
            {list.length}
          </Badge>{" "}
          :
        </FormLabel>
        <CheckboxGroup
          colorScheme="gray"
          value={list}
          onChange={(v: string[]) => setList(v)}
        >
          <Stack>
            {Object.keys(libs).map((key, index) => {
              const item = libs[key];
              return (
                <Checkbox value={key} key={key}>
                  <HStack pl={2}>
                    <Logo lib={item.slug} color="gray.400" boxSize={5} />
                    <Box>{item.name}</Box>
                  </HStack>
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>{" "}
      </FormControl>
    </Stack>
  );
};
