// import { Todo } from "../models/Todo";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// export const getTodos = async () => {
//     //TODO: API URL設定
//     const url = API_URL + "";
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             return await response.json();
//         }
//     } catch (error) {
//         console.error(error)
//     }
// }

// export const postTodos = async (todos: Todo[]) => {
//     if (!todos) return;
//     //TODO: API URL設定
//     const url = API_URL + "";
//     const data = JSON.stringify(todos);
//     //TODO: APIで保存し、データを返す
// }

import { Todo } from "../models/Todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const TODO_FILE_PATH = "data/todo.json";

export const getTodos = async () => {
    const url = API_URL + "/todos"; 
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}

export const postTodos = async (todos: Todo[]) => {
    if (!todos) return;
    const url = API_URL + "/todos"; 
    const data = JSON.stringify(todos);

    try {
        // Save data to API
        const postResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        if (postResponse.ok) {
            // Save data 
            const fileResponse = await fetch(TODO_FILE_PATH, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            });

            if (fileResponse.ok) {
                // Saved successfully
                console.log("TODO data saved successfully");
            }
        }
    } catch (error) {
        console.error(error);
    }
}
