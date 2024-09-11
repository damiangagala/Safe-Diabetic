import supabase from "./supabaseConnect";

export async function login({ email, password }) {
  let { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error("Niepoprawny email lub hasło!");
}

export async function signUp(mail, pswd, username) {
  let { error } = await supabase.auth.signUp({
    email: mail,
    password: pswd,
  });
  const user = await getUser();

  let { error: profileError } = await supabase
    .from("profiles")
    .insert([{ user_id: user.id, username: username }]);

  if (error) throw new Error("Email już zajęty!");
  if (profileError) throw new Error("Wystąpił problem z rejestracją!");
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Niezalogowany");

  return data.user;
}

export async function getAuthorId() {
  const user = await getUser();
  if (user === null) return null;

  const id = user.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", id);

  if (error) throw new Error("Nie udało się uzyskać nazwy użytkownika");

  return data[0].id;
}
