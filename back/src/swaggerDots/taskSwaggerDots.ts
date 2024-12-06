export const taskSwaggerDocs = {
  tags: [
    {
      name: "Task",
      description: "Task management",
    },
  ],
  paths: {
    "/task": {
      get: {
        summary: "Get tasks",
        tags: ["Task"],
        responses: {
          200: {
            description: "All tasks",
          },
          400: {
            description: "Error getting tasks",
          },
        },
      },
      post: {
        summary: "Create a new task",
        tags: ["Task"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
          },
          400: {
            description: "Invalid input",
          },
        },
      },
    },
    "/task/{id}": {
      get: {
        summary: "Get task",
        tags: ["Task"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "The task ID",
          },
        ],
        responses: {
          200: {
            description: "Task found",
          },
          404: {
            description: "Task not found",
          },
        },
      },
      put: {
        summary: "Update task",
        tags: ["Task"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Task ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task updated successfully",
          },
          404: {
            description: "Task not found",
          },
        },
      },
      delete: {
        summary: "Delete task",
        tags: ["Task"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Task ID",
          },
        ],
        responses: {
          201: {
            description: "Task deleted successfully",
          },
          404: {
            description: "Task not found",
          },
        },
      },
      patch: {
        summary: "Toggle task",
        tags: ["Task"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "number",
            },
            description: "Task ID",
          },
        ],
        responses: {
          201: {
            description: "Task toggled successfully",
          },
          404: {
            description: "Task not found",
          },
        },
      },
    },
  },
};
