import supabase from "./supabaseConnect";

export async function getTrainingPlanData() {
  let { data, error } = await supabase.from("training_plan").select(`
      *,
      profiles (
        username
      )
    `);

  if (error) throw new Error("Nie udało się załadować planów treningowych.");
  return data;
}

export async function getTrainingItem(id) {
  let { data } = await supabase
    .from("training_plan")
    .select(
      `
    *,
    training_week (
      monday,tuesday,wednesday,thursday,friday,saturday,sunday
    )
  `,
    )
    .eq("id", id);

  return data[0];
}

export async function getLikedTrainings(id) {
  let { data: likeData, error: likeError } = await supabase
    .from("training_likes")
    .select(
      `
    training_plan(
      id,time,difficulty,title
    ),
    profiles(
      username
      )
  `,
    )
    .eq("user_id", id);

  let { data: userData, error: userError } = await supabase
    .from("training_plan")
    .select(
      `
    id, time, difficulty, title,
    profiles(
      username
      )
  `,
    )
    .eq("author_id", id);

  if (likeError || userError)
    throw new Error("Wystąpił problem z załadowaniem danych!");

  let data = likeData.concat(userData);
  return data;
}

export async function checkIfLikedTraining(userId, trainingId) {
  let { data, error } = await supabase
    .from("training_likes")
    .select("id")
    .eq("user_id", userId)
    .eq("training_plan_id", trainingId);

  if (error) throw new Error("Problem z pobraniem danych.");

  if (data.length !== 0) return data[0];
  return false;
}

export async function getTrainingItemListData(fav, id) {
  if (fav === "false") {
    return getTrainingPlanData();
  }
  if (fav === "true") {
    if (id === undefined || id === null)
      throw new Error("Musisz się zalogować.");
    return getLikedTrainings(id);
  }
}

export async function addTrainingLike({ userId, itemId }) {
  const { error } = await supabase
    .from("training_likes")
    .insert([{ user_id: userId, training_plan_id: itemId }]);

  if (error) throw new Error("Nie udało się polubić planu treningowego.");
}

export async function addTrainingPlan(items, author) {
  const { data, error: weekError } = await supabase
    .from("training_week")
    .insert([
      {
        monday: items.monday,
        tuesday: items.tuesday,
        wednesday: items.wednesday,
        thursday: items.thursday,
        friday: items.friday,
        saturday: items.saturday,
        sunday: items.sunday,
      },
    ])
    .select("id");

  if (weekError) throw new Error("Nie udało się dodać planu treningowego");

  const { error: planError } = await supabase.from("training_plan").insert([
    {
      training_id: data[0].id,
      author_id: author,
      description: items.description,
      title: items.title,
      time: items.time,
      difficulty: items.difficulty,
    },
  ]);
  if (planError) throw new Error("Nie udało się dodać planu treningowego");
}

export async function editTrainingPlan(items, author, planId, trainingId) {
  const { error: training_weekError } = await supabase
    .from("training_week")
    .update({
      monday: items.monday,
      tuesday: items.tuesday,
      wednesday: items.wednesday,
      thursday: items.thursday,
      friday: items.friday,
      saturday: items.saturday,
      sunday: items.sunday,
    })
    .eq("id", trainingId)
    .select();

  if (training_weekError)
    throw new Error("Nie udało się edytować planu treningowego.");

  const { error } = await supabase
    .from("training_plan")
    .update({
      author_id: author,
      description: items.description,
      title: items.title,
      time: items.time,
      difficulty: items.difficulty,
    })
    .eq("id", planId);
  if (error) throw new Error("Nie udało się edytować planu treningowego.");
}

export async function deleteTrainingPlan(id) {
  const { error } = await supabase.from("training_plan").delete().eq("id", id);

  if (error) throw new Error("Nie udało się usunąć komentarza.");
}

export async function deleteLikeTraining(id) {
  const { error } = await supabase.from("training_likes").delete().eq("id", id);

  if (error) throw new Error("Nie udało się usunąć polubienia");
}
