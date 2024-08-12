import { createContext } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchParams] = useSearchParams({
    activity: "training_plan",
    fav: false,
  });

  const navigate = useNavigate();

  function menuNavigation(act, favourite) {
    navigate({
      pathname: "/",
      search: createSearchParams({
        activity: act,
        fav: favourite,
      }).toString(),
    });
  }

  return (
    <SearchContext.Provider value={{ menuNavigation, searchParams }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
