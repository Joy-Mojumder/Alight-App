import {
  Card,
  Image,
  Text,
  CardFooter,
  CardHeader,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { useState } from "react";

const ImagePostCards = ({ name }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Card
      className="w-32 md:w-[7.5rem] xl:w-36 h-52 xl:h-64  cursor-pointer"
      shadow="lg"
      position={"relative"}
      textColor={"white"}
      onClick={() => setIsClicked(true)}
    >
      <CardHeader zIndex={1}>
        <Avatar
          name={name}
          src="https://bit.ly/ryan-florence"
          size={"sm"}
          borderColor={`${isClicked ? "white" : "blueviolet"}`}
          className="border-[3px]"
        >
          <AvatarBadge
            boxSize="0.7em"
            bg="green.500"
            borderColor={"black"}
            border={"1px"}
          />
        </Avatar>
      </CardHeader>
      <Image
        src="/coding-.png"
        alt="Post image"
        className="absolute w-full h-full object-cover rounded-md brightness-90 hover:brightness-75 hover:h-[105%] transition-all duration-300"
      />
      <CardFooter zIndex={1}>
        <Text
          fontWeight="bold"
          className="absolute bottom-3 text-xs lg:text-base"
          textShadow={".2px .2px 3px #111"}
        >
          {name}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ImagePostCards;
