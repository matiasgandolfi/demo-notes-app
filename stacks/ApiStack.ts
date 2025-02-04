import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);
  //Variable secreta obtenida de SST Secret
  const STRIPE_SECRET_KEY = new Config.Secret(stack, "STRIPE_SECRET_KEY");
  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table, STRIPE_SECRET_KEY],
      },
    },
    cors: true,
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
      "POST /billing": "packages/functions/src/billing.main",
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