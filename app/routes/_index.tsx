import { Link } from "@remix-run/react";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"/todo"}>Go to To Do list</Link>
    </div>
  );
}
