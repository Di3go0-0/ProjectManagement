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
    "/collaborator/user/project/{userId}": {
      get: {
        summary: "Get all projects where a user is a collaborator",
        tags: ["Collaborator"],
        parameters: [
          {
            name: "userId",
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

    "/collaborator/task": {
      post: {
        summary: "Add a collaborator to a task",
        tags: ["Collaborator"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: {
                    type: "number",
                  },
                  projectId: {
                    type: "number",
                  },
                  taskId: {
                    type: "number",
                  },
                },
                required: ["userId", "projectId", "taskId"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Collaborator added successfully",
          },
          400: {
            description: "Invalid input",
          },
          404: {
            description: "Task not found",
          },
        },
      },
    },
  },
};

