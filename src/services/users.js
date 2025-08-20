import instance from "./axios";

const USERS_API = {
  get: async () => {
    const res = await instance.get("/users");
    return res.data;
  },

  post: async (data) => {
    delete data["id"];
    const res = await instance.post(`/users`, { ...data });
    return res.data;
  },

  put: async (user) => {
    const res = await instance.put(`/users/${user.id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await instance.delete(`/users/${id}`);
    return res.data;
  },
};

export default USERS_API;
