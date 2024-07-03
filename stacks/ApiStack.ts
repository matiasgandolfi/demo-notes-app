import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /notes": {
        function: "packages/functions/src/create.main",
        authorizer: "iam",
      },
      "GET /notes/{id}": {
        function: "packages/functions/src/get.main",
        authorizer: "iam",
      },
      "GET /notes/all": {
        function: "packages/functions/src/getAll.main",
        authorizer: "iam",
      },
      "GET /notes": {
        function: "packages/functions/src/list.main",
        authorizer: "iam",
      },
      "PUT /notes/{id}": {
        function: "packages/functions/src/update.main",
        authorizer: "iam",
      },
      "DELETE /notes/{id}": {
        function: "packages/functions/src/delete.main",
        authorizer: "iam",
      },
  },
});

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}