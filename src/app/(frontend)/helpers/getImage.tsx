const getImage = (name: any) => {
  // Get image from storage
  return `https://pmetnprbtxqnqdndfdkn.supabase.co/storage/v1/object/public/uploads//${name?.split('/').pop()}`
}

export default getImage