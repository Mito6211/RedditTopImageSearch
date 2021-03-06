import React from "react";
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
import { IconType } from "react-icons";
import { MdArrowUpward } from "react-icons/md";

type Props = {
  Icon: IconType;
  pos: "left" | "right";
  title: string;
};

const Settings: React.FC<Props> = ({
  Icon = MdArrowUpward,
  pos = "left",
  title = "Drawer",
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" onClick={onOpen}>
        <Icon />
      </Button>
      <Drawer isOpen={isOpen} placement={pos} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{title}</DrawerHeader>

            <DrawerBody>{props.children}</DrawerBody>

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
