export const collaboratorSwaggerDocs = {
  tags: [
    {
      name: "Collaborator",
      description: "Collaborator Management"
    },
  ],

  paths: {
    "/collaborator/project": {
      post: {
        summary: "Add a collaborator to a project",
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
                  }
                },
                required: ["userId", "projectId"],
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
            description: "Project not found",
          },
        },
      },
    },

  }
}


