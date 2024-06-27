const mockServerConfig = {
  rest: {
    baseUrl: "/api",
    configs: [
      {
        path: "/artists",
        method: "get",
        routes: [
          {
            data: {
              name: "Pink Floyd",
              genres: ["pyschedelic rock", "progressive rock"],
            },
          },
        ],
      },
    ],
  },
};

export default mockServerConfig;
