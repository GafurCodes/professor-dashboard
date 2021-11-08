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
import { useEffect, useRef, useState } from "react";
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
import axios from "axios";

export default function Scenes() {
  interface scene {
    id: string;
    sceneName: string;
    description: string;
    fireExtinguisher: boolean;
    interactivePeriodicTable: boolean;
    broom: boolean;
    eyeWashingStation: boolean;
    scales: boolean;
    fumeHood: boolean;
    flask: boolean;
    chemistrySet: boolean;
  }

  const { data: session, status } = useSession();

  const [scenes, setScenes] = useState<scene[]>([]);

  const sceneName = useRef<HTMLInputElement>(null);
  const sceneDesc = useRef<HTMLTextAreaElement>(null);
  const fireExtinguisher = useRef<HTMLInputElement>(null);
  const interactivePeriodicTable = useRef<HTMLInputElement>(null);
  const broom = useRef<HTMLInputElement>(null);
  const eyeWashingStation = useRef<HTMLInputElement>(null);
  const scales = useRef<HTMLInputElement>(null);
  const fumeHood = useRef<HTMLInputElement>(null);
  const flask = useRef<HTMLInputElement>(null);
  const chemistrySet = useRef<HTMLInputElement>(null);

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

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

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
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={fireExtinguisher}>
                Fire Extinguisher
              </Checkbox>
              <Checkbox
                mr="1rem"
                mt="1rem"
                size="lg"
                ref={interactivePeriodicTable}
              >
                Interactive Periodic Table
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={broom}>
                Broom
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={eyeWashingStation}>
                Eye Washing Station
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={scales}>
                Scales
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={fumeHood}>
                Fume Hood
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={flask}>
                Flask
              </Checkbox>
              <Checkbox mr="1rem" mt="1rem" size="lg" ref={chemistrySet}>
                Chemistry Set
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
                onClick={async () => {
                  await axios.post("/api/addScene", {
                    email: session?.user?.email,
                    sceneName: `${sceneName.current?.value}`,
                    description: `${sceneDesc.current?.value}`,
                    fireExtinguisher: fireExtinguisher.current!.checked,
                    interactivePeriodicTable:
                      interactivePeriodicTable.current!.checked,
                    broom: broom.current!.checked,
                    eyeWashingStation: eyeWashingStation.current!.checked,
                    scales: scales.current!.checked,
                    fumeHood: fumeHood.current!.checked,
                    flask: flask.current!.checked,
                    chemistrySet: chemistrySet.current!.checked,
                  });
                  onCloseSceneInfo();
                  setScenes((oldArr) => {
                    return [
                      {
                        id: `${sceneName.current?.value} ${sceneDesc.current?.value}`,
                        sceneName: `${sceneName.current?.value}`,
                        description: `${sceneDesc.current?.value}`,
                        fireExtinguisher: fireExtinguisher.current!.checked,
                        interactivePeriodicTable:
                          interactivePeriodicTable.current!.checked,
                        broom: broom.current!.checked,
                        eyeWashingStation: eyeWashingStation.current!.checked,
                        scales: scales.current!.checked,
                        fumeHood: fumeHood.current!.checked,
                        flask: flask.current!.checked,
                        chemistrySet: chemistrySet.current!.checked,
                      },
                      ...oldArr,
                    ];
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
            description,
            fireExtinguisher,
            interactivePeriodicTable,
            broom,
            eyeWashingStation,
            scales,
            fumeHood,
            flask,
            chemistrySet,
          }) => (
            <VStack
              key={uuidv4()}
              alignItems="flex-start"
              flexWrap="wrap"
              id={`${sceneName} ${description}`}
              mt="1rem"
              mb="1rem"
              boxShadow="xs"
              padding="2rem"
              borderRadius="1rem"
              minW="78vw"
            >
              <Heading>{sceneName}</Heading>
              <Text mt="1rem" mb="1rem">
                {description}
              </Text>

              <Flex wrap="wrap" justifyContent="flex-start">
                <Checkbox
                  isReadOnly
                  isChecked={fireExtinguisher}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Fire Extinguisher
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={interactivePeriodicTable}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Interactive Periodic Table
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={broom}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Broom
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={eyeWashingStation}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Eye Washing Station
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={scales}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Scales
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={fumeHood}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Fume Hood
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={flask}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Flask
                </Checkbox>

                <Checkbox
                  isReadOnly
                  isChecked={chemistrySet}
                  mr="1rem"
                  mt="1rem"
                  mb="1rem"
                >
                  Chemistry Set
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
