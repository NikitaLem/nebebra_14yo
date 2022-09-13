import { userService } from "../services";
import { useFetchMock } from "./useFetchMock";

export const useGetUsers = () => {
  const { value, error, isLoading, getMock } = useFetchMock(
    userService.getUsers
  );

  return { value, error, isLoading, getUsers: getMock };
};
