export const fetchRepos = async () => {
  const response = await fetch(`https://api.github.com/users/NickDiggo/repos`)
  if (!response.ok) throw new Error('Fout bij ophalen van repositories')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json()
}
