type MessagesType =
  | "productListed"
  | "errorListed"
  | "productCreated"
  | "productEdited"
  | "errorCreated"
  | "errorEdited"
  | "errorRemoved"
  | "productRemoved";

const logger = (message: string) => {
  console.log(`\n* * * ${message} * * *\n`);
};

const messages = (messageType: MessagesType) => {
  return messageOptions[messageType];
};

const messageOptions = {
  productListed: "Products Listed Successfully",
  errorListed: "Error during product listed products not existing",
  productCreated: "Product Created Successfully",
  productEdited: "Product Edited Successfully",
  errorCreated: "Error during product creation _id already existing",
  errorEdited: "Error during product edition _id not existing",
  productRemoved: "Product removed successfully",
  errorRemoved: "Error during product remotion _id not existing",
};

export { logger, messages };
