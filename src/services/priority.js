import instance from "./axios";

const PRIORITY_API = {
  get: async () => {
    const res = await instance.get("/priorities");
    return res.data;
  },

  post: async (data) => {
    delete data["id"];
    const res = await instance.post(`/priorities`, { ...data });
    return res.data;
  },

  put: async (priority) => {
    const res = await instance.put(`/priorities/${priority.id}`, {
      name: priority.name,
      description: priority.description,
      color: priority.color,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await instance.delete(`/priorities/${id}`);
    return res.data;
  },
};

export default PRIORITY_API;
