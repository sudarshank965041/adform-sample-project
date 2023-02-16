export default async function getUsers() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  return await resp.json();
}
