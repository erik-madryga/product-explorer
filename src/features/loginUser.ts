export async function loginUser(username: string, password: string) {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  const token = data.token;
  localStorage.setItem("authToken", token);
  // data should include a token field
  return data;
}