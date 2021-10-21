import { Button } from "@chakra-ui/button";
import {
  Box,
  Code,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import AccessDenied from "../../components/accessDenied";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/react";

export default function Scenes() {
  interface scene {
    id: string;
    sceneName: string;
    sceneDesc: string | undefined;
    includeTrashcan: boolean;
    hydrogenPeroxide: boolean;
    alcohol: boolean;
  }

  const { data: session, status } = useSession();

  const [scenes, setScenes] = useState<scene[]>([]);

  const sceneName = useRef<HTMLInputElement>(null);
  const sceneDesc = useRef<HTMLTextAreaElement>(null);
  const incluldeTrashcan = useRef<HTMLInputElement>(null);
  const hydrogenPeroxide = useRef<HTMLInputElement>(null);
  const alcohol = useRef<HTMLInputElement>(null);

  const [currentSceneOpen, setCurrentSceneOpen] = useState<scene>();

  const {
    isOpen: isOpenSceneInfo,
    onOpen: onOpenSceneInfo,
    onClose: onCloseSceneInfo,
  } = useDisclosure();

  const {
    isOpen: isOpenSceneJson,
    onOpen: onOpenSceneJson,
    onClose: onCloseSceneJson,
  } = useDisclosure();

  return (
    <Box>
      <Heading textAlign="center">Scenes</Heading>
      <Button onClick={onOpenSceneInfo} colorScheme="green">
        Add Scene
      </Button>

      <Modal isOpen={isOpenSceneInfo} onClose={onCloseSceneInfo} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a scene</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} mt="1rem" mb="1rem">
              <FormControl isRequired>
                <FormLabel>Scene Name</FormLabel>
                <Input type="text" ref={sceneName} placeholder="H-bond" />
              </FormControl>
              <FormControl>
                <FormLabel>Scene Description</FormLabel>
                <Textarea
                  type="text"
                  ref={sceneDesc}
                  placeholder="This scene will be used to demonstrate hydrogen bonding..."
                />
              </FormControl>
            </VStack>

            <Flex wrap="wrap">
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={incluldeTrashcan}>
                Include Trashcan
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={hydrogenPeroxide}>
                Hydrogen Peroxide
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={alcohol}>
                Alcohol
              </Checkbox>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={5}>
              <Button
                colorScheme="red"
                variant="ghost"
                mr={3}
                onClick={onCloseSceneInfo}
              >
                Close
              </Button>
              <Button
                colorScheme="green"
                onClick={() => {
                  onCloseSceneInfo();
                  setScenes((oldArr) => {
                    if (
                      !sceneName.current?.value ||
                      !incluldeTrashcan.current ||
                      !hydrogenPeroxide.current ||
                      !alcohol.current
                    ) {
                      return [...oldArr];
                    } else {
                      return [
                        {
                          id: `${sceneName.current?.value} ${sceneDesc.current?.value}`,
                          sceneName: sceneName.current?.value,
                          sceneDesc: sceneDesc.current?.value,
                          includeTrashcan: incluldeTrashcan.current?.checked,
                          hydrogenPeroxide: hydrogenPeroxide.current?.checked,
                          alcohol: alcohol.current?.checked,
                        },
                        ...oldArr,
                      ];
                    }
                  });
                }}
              >
                Add Scene
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenSceneJson} onClose={onCloseSceneJson}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scene JSON</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Code>{JSON.stringify(currentSceneOpen, null, "  ")}</Code>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={5}>
              <Button
                variant="ghost"
                colorScheme="red"
                mr={3}
                onClick={onCloseSceneJson}
              >
                Close
              </Button>
              <Button
                colorScheme="blue"
                onClick={() =>
                  navigator.clipboard.writeText(
                    JSON.stringify(currentSceneOpen)
                  )
                }
              >
                Copy JSON
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex wrap="wrap" flexDirection="row" mt="1rem" width="80vw">
        {scenes.map(
          ({
            sceneName,
            sceneDesc,
            includeTrashcan,
            hydrogenPeroxide,
            alcohol,
          }) => (
            <VStack
              key={`${uuidv4()}`}
              alignItems="flex-start"
              flexWrap="wrap"
              id={`${sceneName} ${sceneDesc}`}
              mt="1rem"
              mb="1rem"
              boxShadow="xs"
              padding="2rem"
              borderRadius="1rem"
              minW="78vw"
            >
              <Heading>{sceneName}</Heading>
              <Text mt="1rem" mb="1rem">
                {sceneDesc}
              </Text>

              <Flex wrap="wrap" justifyContent="flex-start">
                <Checkbox
                  isReadOnly
                  isChecked={includeTrashcan}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Trascan Included
                </Checkbox>
                <Checkbox
                  isReadOnly
                  isChecked={hydrogenPeroxide}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Start With Hydrogen Peroxide
                </Checkbox>
                <Checkbox
                  isReadOnly
                  isChecked={alcohol}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Disable Alcohol
                </Checkbox>
              </Flex>
              <HStack spacing={5}>
                <Button
                  onClick={(e) => {
                    const target = e.currentTarget;
                    const parentId = target.parentElement;
                    const grandParentId = parentId?.parentElement?.id;

                    setCurrentSceneOpen(() =>
                      scenes.find((scene) => scene.id === grandParentId)
                    );
                    onOpenSceneJson();
                  }}
                  colorScheme="blue"
                >
                  View Json
                </Button>
                <Button
                  onClick={(e) => {
                    const target = e.currentTarget;
                    const parentId = target.parentElement;
                    const grandParentId = parentId?.parentElement?.id;

                    setScenes((oldScenes) =>
                      oldScenes.filter((scene) => scene.id != grandParentId)
                    );
                  }}
                  colorScheme="red"
                >
                  Delete Scene
                </Button>
              </HStack>
            </VStack>
          )
        )}
      </Flex>
    </Box>
  );
}
