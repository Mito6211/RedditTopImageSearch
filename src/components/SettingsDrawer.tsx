import React from "react";
import { MdSettings } from "react-icons/md";
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
} from "@chakra-ui/react";

const Settings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <MdSettings />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>

            <DrawerBody>
              <Button onClick={toggleColorMode}>Toggle Theme</Button>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Settings;
