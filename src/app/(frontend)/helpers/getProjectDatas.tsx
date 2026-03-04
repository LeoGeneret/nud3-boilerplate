export default function getProjectDatas(slug: string) {
  return fetch(`/api/projects?where[slug][equals]=${slug}`, {cache: "force-cache"}).then(res => { return res.json() })
}
