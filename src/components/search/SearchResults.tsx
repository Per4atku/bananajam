interface SearchContentProps {
  query: string | undefined;
}

const SearchResults = async ({ query }: SearchContentProps) => {
  return <div>{query || null}</div>;
};

export default SearchResults;
