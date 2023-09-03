export const getFileNameFromRefPath = (refPath) => {
  console.log('refPath: ', refPath);
  try {
  const [folder, uid, fileName] = refPath.split('/')
  const [uuid, ...namePath] = fileName.split('.')
  const name = namePath.join('.')
    return name
  } catch (error) {
    console.error(error);
  }
}

export const getFileNameFromRef = (ref) => {
  try {
    const [uuid, ...namePath] = ref.name.split('.')
    const name = namePath.join('.')
    return name
  } catch (error) {
    console.error(error);
  }
}