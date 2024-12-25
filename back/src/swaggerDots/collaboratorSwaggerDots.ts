export const collaboratorSwaggerDocs = {
  tags: [
    {
      name: "Collaborator",
      description: "Collaborator Management",
    },
  ],

  paths: {
    "/collaborator/project/{projectId}": {
      get: {
        summary: "Get all collaborators of a project",
        tags: ["Collaborator"],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Collaborators found",
          },
          404: {
            description: "Collaborators not found",
          },
        },
      },
    },
    "/collaborator/user/project": {
      get: {
        summary: "Get all projects where a user is a collaborator",
        tags: ["Collaborator"],

        responses: {
          200: {
            description: "Collaborators found",
          },
          404: {
            description: "Collaborators not found",
          },
        },
      },
    },
    "/collaborator/user/task/{projectId}": {
      get: {
        summary: "Get all tasks where a user is a collaborator",
        tags: ["Collaborator"],
        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Collaborators found",
          },
          404: {
            description: "Collaborators not found",
          },
        },
      },
    },
  },
};

