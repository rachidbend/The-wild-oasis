import { useMutation } from '@tanstack/react-query';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  console.log(hasImagePath);
  console.log(newCabin.image);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);
  // 1. create/edit cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('cabin could not be created');
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    const { error: deleteError } = await supabase
      .from('cabins')
      .delete()
      .eq('id', data[0].id);
    throw new Error(
      'Cavin image could not be uploaded and cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('cabin could not be deleted');
  }
}
