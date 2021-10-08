import { Button } from "@chakra-ui/button";
import { Box, Code, Flex, Heading, VStack } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { useState } from "react";
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

export default function Scenes() {
  interface scene {
    id: string;
    sceneName: string;
    sceneDesc: string;
    includeTrashcan: boolean;
    hydrogenPeroxide: boolean;
    alcohol: boolean;
  }

  const { data } = useSession();

  const [sceneName, setSceneName] = useState("");
  const [sceneDesc, setSceneDesc] = useState("");
  const [includeTrashcan, setIncludeTrashcan] = useState(false);
  const [hydrogenPeroxide, setHydrogenPeroxide] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [currentSceneOpen, setCurrentSceneOpen] = useState<scene>();
  const [scenes, setScenes] = useState<scene[]>([]);

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

  if (!data?.token) {
    return <AccessDenied />;
  }
  return (
    <Box ml="15rem">
      <Heading textAlign="center">Scenes</Heading>
      <Button onClick={onOpenSceneInfo}>Add Scene</Button>

      <Modal isOpen={isOpenSceneInfo} onClose={onCloseSceneInfo}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Scene name</FormLabel>
              <Input
                variant="flushed"
                type="text"
                onChange={(e) => setSceneName(e.target.value)}
                value={sceneName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Scene description</FormLabel>
              <Input
                variant="flushed"
                type="text"
                onChange={(e) => setSceneDesc(e.target.value)}
                value={sceneDesc}
              />
            </FormControl>

            <Checkbox
              size="lg"
              isChecked={includeTrashcan}
              onChange={() => setIncludeTrashcan((oldVal) => !oldVal)}
            >
              Include Trashcan
            </Checkbox>
            <Checkbox
              size="lg"
              isChecked={hydrogenPeroxide}
              onChange={() => setHydrogenPeroxide((oldVal) => !oldVal)}
            >
              Hydrogen Peroxide
            </Checkbox>
            <Checkbox
              size="lg"
              isChecked={alcohol}
              onChange={() => setAlcohol((oldVal) => !oldVal)}
            >
              Alcohol
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseSceneInfo}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onCloseSceneInfo();
                setScenes((oldArr) => {
                  return [
                    {
                      id: `${sceneName} ${sceneDesc}`,
                      sceneDesc,
                      sceneName,
                      includeTrashcan,
                      hydrogenPeroxide,
                      alcohol,
                    },
                    ...oldArr,
                  ];
                });
                setSceneName("");
                setSceneDesc("");
                setIncludeTrashcan(false);
                setHydrogenPeroxide(false);
                setAlcohol(false);
              }}
            >
              Add Scene
            </Button>
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
            <Button colorScheme="blue" mr={3} onClick={onCloseSceneJson}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(currentSceneOpen))
              }
            >
              Copy JSON
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexDirection="column">
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
              id={`${sceneName} ${sceneDesc}`}
            >
              <Heading>Name: {sceneName}</Heading>
              <Heading>Description: {sceneDesc}</Heading>
              <Heading>Options (read only)</Heading>
              <Checkbox isReadOnly isChecked={includeTrashcan}>
                Trascan Included
              </Checkbox>
              <Checkbox isReadOnly isChecked={hydrogenPeroxide}>
                Start With Hydrogen Peroxide
              </Checkbox>
              <Checkbox isReadOnly isChecked={alcohol}>
                Disable Alcohol
              </Checkbox>
              <Button
                onClick={(e) => {
                  onOpenSceneJson();
                  const target = e.currentTarget;
                  const parentId = target.parentElement?.id;

                  setCurrentSceneOpen(
                    scenes.find((scene) => scene.id === parentId)
                  );
                }}
              >
                View Json
              </Button>
            </VStack>
          )
        )}
      </Flex>
    </Box>
  );
}
