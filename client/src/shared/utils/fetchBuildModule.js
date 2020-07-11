import axios from 'axios'

export const getBuild = async (Pid) => {
  try {
    const res = await axios.get(
      "/api/getBuild/" + Pid
    );
    if (res.data) {
      let buildFromApi = res.data.map((key) => {
        return { label: key.build, value: key._id };
      });
      const builds = {
        build: [{ label: "Select build", value: "" }].concat(buildFromApi),
      };
      return builds.build;
    }
  } catch (error) {
    console.log(error);
    return (error)
  }
};
