import { FunctionDeclaration } from "@google/generative-ai";

async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  return data;
}

export const getTodosFunctionaDeclaration: FunctionDeclaration = {
  name: "getTodos",
  description: "return all the available todos",

  //   parameters: {
  //     type: "ARRAY",
  //     description: "get 10 todos with it's userId, id  and title",
  //     properties: {
  //       userId: {
  //         type: "NUMBER",
  //         description: "Id of the user",
  //       },
  //       id: {
  //         type: "NUMBER",
  //         description: "Name of the product",
  //       },
  //       title: {
  //         type: "STRING",
  //         description: "title of the todo",
  //       },
  //       completed: {
  //         type: "BOOLEAN",
  //         description: "completed status of the todo",
  //       },
  //     },
  //     required: ["userId", "id", "title"],
  //   },
};

export const allFunctions: any = {
  getTodos: () => {
    return getTodos();
  },
};
