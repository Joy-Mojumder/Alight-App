import { Card, Image, Text, CardFooter } from "@chakra-ui/react";
import { RxPlusCircled } from "react-icons/rx";

const ImageMyCard = () => {
  return (
    <Card
      className="w-32 md:w-[7.5rem] xl:w-36 h-52 xl:h-64  cursor-pointer"
      shadow="lg"
      position={"relative"}
      textColor={"white"}
    >
      <Image
        src="https://bit.ly/ryan-florence"
        alt="My profile image"
        className="absolute w-full h-full object-cover rounded-md brightness-90 hover:brightness-75 hover:h-[105%] transition-all duration-300"
      />
      <CardFooter
        zIndex={1}
        className="absolute bottom-0 bg-purple-800 w-full h-1/5 rounded-br-md rounded-bl-md brightness-90"
      >
        <RxPlusCircled className="text-4xl bg-purple-800 rounded-full absolute bottom-8 left-1/2 -translate-x-1/2" />
        <Text className="mx-auto text-sm font-semibold">Create Story</Text>
      </CardFooter>
    </Card>
  );
};

export default ImageMyCard;
