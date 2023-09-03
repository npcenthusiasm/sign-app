export const getFileNameFromRefPath = (refPath) => {
  const [folder, uid, fileName] = refPath.split('/')
  const [uuid, ...namePath] = fileName.split('.')
  const name = namePath.join('.')
  return name
}

export const getFileNameFromRef = (ref) => {
  const [uuid, ...namePath] = ref.name.split('.')
  const name = namePath.join('.')
  return name
}