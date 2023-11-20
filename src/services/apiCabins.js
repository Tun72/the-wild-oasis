import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id = null) {
  // https://wjzjdrhhcnjshxyduchn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query.insert([{ ...newCabin, image: imagePath }]);
  }

  if(id) {
    query.update({...newCabin, image: imagePath}).eq("id", id)
  }

  const {data, error} = await query.select().single();

  if (error) {
    throw new Error("Cabins could not be deleted");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}
