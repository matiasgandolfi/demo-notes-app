import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: Table.Notes.tableName,
  };

  const result = await dynamoDb.scan(params);

  if (!result.Items) {
    throw new Error("No items found.");
  }

  // Return the retrieved items
  return JSON.stringify(result.Items);
});
