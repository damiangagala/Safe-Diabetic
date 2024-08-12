import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/usersAPI";

export function useGetUser() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { isLoading, data, refetch };
}
