import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins({ page }) {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
  }

  return { data, count };
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://wjzjdrhhcnjshxyduchn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  console.log(hasImagePath);
  console.log(newCabin);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    console.log(id);
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabins could not be deleted");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }

  return data;
}
