export default function path(navitems, projectKey) {
  let newitems = navitems.map((item) => {
    return {
      ...item,
      to: "/" + projectKey + item.to,
    }
  });
  return newitems;
}
