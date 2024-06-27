interface SearchContentProps {
  query: string | undefined;
}

//add "async"
const SearchResults = ({ query }: SearchContentProps) => {
  return <div>{query || null}</div>;
};

export default SearchResults;
