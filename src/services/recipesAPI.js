import supabase from "./supabaseConnect";

export async function getRecipesData() {
  let { data, error } = await supabase.from("recipes").select(`
    *,
    profiles(
      username)
      `);

  if (error) throw new Error("Nie udało się załadować przepisów.");

  return data;
}

export async function getRecipeItem(id) {
  let { data, error } = await supabase.from("recipes").select("*").eq("id", id);

  if (error) throw new Error("Nie udało się załadować przepisu.");

  return data[0];
}

export async function getLikedRecipes(id) {
  let { data: likeData, error: likeError } = await supabase
    .from("recipes_likes")
    .select(
      `
    recipes(
      id,time,difficulty,title
    ),
    profiles(
      username
      )
  `,
    )
    .eq("user_id", id);

  let { data: userData, error: userError } = await supabase
    .from("recipes")
    .select(`id,time,difficulty,title,profiles(username)`)
    .eq("author_id", id);

  if (likeError || userError)
    throw new Error("Wystąpił problem z załadowaniem danych!");

  let data = likeData.concat(userData);

  return data;
}

export async function getRecipesItemListData(fav, id) {
  if (fav === "false") {
    return getRecipesData();
  }
  if (fav === "true") {
    if (id === undefined || id === null)
      throw new Error("Musisz się zalogować.");
    return getLikedRecipes(id);
  }
}

export async function getRecipeComments(id) {
  let { data } = await supabase
    .from("recipes_comments")
    .select(
      `
      comment,
      id,
      profiles(
        user_id,
        username
        )`,
    )
    .eq("recipe_id", id);

  return data;
}

export async function addRecipeComment(comment) {
  const { error } = await supabase.from("recipes_comments").insert([
    {
      recipe_id: comment.recipeId,
      author_id: comment.authorId,
      comment: comment.newComment,
    },
  ]);

  if (error) throw new Error("Nie udało się dodać komentarza.");
}

export async function checkIfLikedRecipe(userId, recipeId) {
  let { data, error } = await supabase
    .from("recipes_likes")
    .select("*")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);
  if (error)
    throw new Error("Wystąpił błąd w załadowaniu polubianych przepisów");

  if (data.length !== 0) return data[0];
  return false;
}

export async function addRecipeLike({ userId, itemId }) {
  const { error } = await supabase
    .from("recipes_likes")
    .insert([{ user_id: userId, recipe_id: itemId }]);

  if (error) throw new Error("Nie udało się polubić przepisu.");
}

export async function addRecipe(data, author) {
  const { error } = await supabase.from("recipes").insert([
    {
      title: data.title,
      time: Number(data.time),
      author_id: author,
      difficulty: data.difficulty,
      description: data.description,
      ingredients: data.ingredients,
    },
  ]);

  if (error) throw new Error("Nie udało się dodać przepisu.");
}

export async function editRecipe(data, author, id) {
  const { error } = await supabase
    .from("recipes")
    .update({
      title: data.title,
      time: Number(data.time),
      author_id: author,
      difficulty: data.difficulty,
      description: data.description,
      ingredients: data.ingredients,
    })
    .eq("id", id);

  if (error) throw new Error("Nie udało się edytować przepisu");
}

export async function deleteRecipeComment(id) {
  const { error } = await supabase
    .from("recipes_comments")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Nie udało się usunąć komentarza.");
}

export async function deleteRecipe(id) {
  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) throw new Error("Nie udało się usunąć przepisu.");
}

export async function deleteRecipeLike(id) {
  const { error } = await supabase.from("recipes_likes").delete().eq("id", id);

  if (error) throw new Error("Nie udało się usunąć polubienia.");
}
