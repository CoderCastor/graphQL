import "./App.css";
import { gql, useQuery } from "@apollo/client";

//creating query
const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      user {
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);
  console.log(data?.getTodos);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <h1>
      <table style={{ border: "2px solid white" }}>
        <tbody style={{ border: "2px solid white" }}>
          {data?.getTodos.map((item) => (
            <tr key={item.id} style={{ border: "2px solid white" }}>
              <td style={{ border: "2px solid white" }}>{item.title}</td>
              <td style={{ border: "2px solid white" }}>{item.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {JSON.stringify(data)}
    </h1>
  );
}

export default App;
