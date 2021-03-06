import React from "react";
import { MdAdd } from "react-icons/md";
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
} from "@chakra-ui/react";

const Settings: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <MdAdd />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add Content</DrawerHeader>

            <DrawerBody>Placeholder Text</DrawerBody>

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
