import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const getLocations = gql`
  query getLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        dimension
        residents {
          id
          name
        }
      }
    }
  }
`;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(getLocations, {
    variables: { page },
  });

  return <div>Rick & Morty</div>;
};

export default HomePage;
