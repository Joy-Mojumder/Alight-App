import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  IoSettingsSharp,
  IoHelpCircleSharp,
  IoLogOutSharp,
} from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
const DropDown = () => {
  // getting user data from query key
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // logout function from sever using query
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch user");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const bgDrop = "#1b2021";
  const bgHover = "#3f3f46 ";
  return (
    <Menu>
      <Tooltip label="Profile">
        <MenuButton
          as={Avatar}
          aria-label="Options"
          icon={<Avatar name={`${authUser.firstName} ${authUser.lastName}`} />}
        />
      </Tooltip>
      <MenuList
        shadow="lg"
        bgColor={bgDrop}
        textColor={"text-white"}
        borderColor={"transparent"}
        p={"0.8rem"}
        borderRadius={"0.5rem"}
        w={"sm"}
      >
        <Flex direction={"column"} gap={"1rem"}>
          <MenuItem
            bgColor={bgDrop}
            _hover={{ bgColor: `${bgHover}` }}
            borderRadius={"0.5rem"}
            as={"a"}
            href="#"
          >
            <Avatar
              name={`${authUser.firstName} ${authUser.lastName}`}
              size="sm"
            />
            <p className="ml-2">{`${authUser.firstName} ${authUser.lastName}`}</p>
          </MenuItem>
          <MenuItem
            bgColor={bgDrop}
            _hover={{ bgColor: `${bgHover}` }}
            borderRadius={"0.5rem"}
            as={"a"}
            href="#"
          >
            <div className="w-8 h-8 bg-zinc-500 rounded-full flex items-center justify-center">
              <IoSettingsSharp size={"1.5em"} />
            </div>
            <p className="ml-2">Settings & Privacy</p>
          </MenuItem>
          <MenuItem
            bgColor={bgDrop}
            _hover={{ bgColor: `${bgHover}` }}
            borderRadius={"0.5rem"}
            as={"a"}
            href="#"
          >
            <div className="w-8 h-8 bg-zinc-500 rounded-full flex items-center justify-center">
              <IoHelpCircleSharp size={"1.5em"} />
            </div>
            <p className="ml-2">Help & Support</p>
          </MenuItem>
          <MenuItem
            bgColor={bgDrop}
            _hover={{ bgColor: "#52525b " }}
            borderRadius={"0.5rem"}
          >
            <div className="w-8 h-8 bg-zinc-500 rounded-full flex items-center justify-center">
              <MdFeedback size={"1.5em"} />
            </div>
            <p className="ml-2">Give Feedback</p>
          </MenuItem>
          <MenuItem
            bgColor={bgDrop}
            _hover={{ bgColor: `${bgHover}` }}
            borderRadius={"0.5rem"}
            onClick={logout}
          >
            <div className="w-8 h-8 bg-zinc-500 rounded-full flex items-center justify-center">
              <IoLogOutSharp size={"1.5em"} />
            </div>
            <p className="ml-2">Logout</p>
          </MenuItem>
          <footer>
            <p className="text-xs text-center">
              © 2023 Alight. All rights reserved.
            </p>
          </footer>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
