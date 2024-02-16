import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Suspense, useState } from "react";
import Todos from "todo_list/TodoList";

// // mock round-trip to get remote component bundle
// const delayTimeMs = 2000;
// const Todos = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import("todos/Todos"));
//     }, delayTimeMs);
//   });
// });

export const loader = async () => {
  return json(["todo 1", "todo 2"]);
};

export default function Todo() {
  const loadedTodos = useLoaderData<typeof loader>();
  const [todos, setTodos] = useState(loadedTodos);

  const removeItem = (index: number) => {
    setTodos((oldValue) =>
      oldValue.slice(0, index).concat(oldValue.slice(index + 1))
    );
  };

  return (
    <div>
      {todos?.length && (
        <Suspense
          fallback={
            <>
              <h1>Todos list</h1>
              <h2>Remote being lazy loaded...</h2>
              <ul>
                {todos.map((todo, index) => (
                  <li key={index}>
                    <span>{todo}</span>
                  </li>
                ))}
              </ul>
            </>
          }
        >
          <Todos todos={todos} removeItem={removeItem} />
        </Suspense>
      )}
    </div>
  );
}
