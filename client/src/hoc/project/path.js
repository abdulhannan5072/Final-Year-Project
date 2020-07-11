export default function path(navitems, projectId) {
  let newitems = navitems.map((item) => {
    return {
      ...item,
      to: "/" + projectId + item.to,
    }
  });
  return newitems;
}
