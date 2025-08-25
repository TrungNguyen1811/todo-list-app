import instance from "./axios";

const TASK_API = {
  get: async () => {
    try {
      const res = await instance.get("/todos");
      return res.data;
    } catch (error) {
      throw error.message;
    }
  },

  getTask: async (task) => {
    try {
      const res = await instance.get(`/todos/${task.id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      throw error.message;
    }
  },

  post: async (task) => {
    try {
      const res = await instance.post(`/todos`, {
        title: task.title,
        description: task.description,
        status: task.status,
        priorityId: task.priorityId,
        index: task.index,
        userId: task.userId,
      });

      return res.data;
    } catch (error) {
      throw error.message;
    }
  },

  put: async (task) => {
    try {
      const res = await instance.put(`/todos/${task.id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
        priorityId: task.priorityId,
        index: task.index,
        userId: task.userId,
      });
      return res.data;
    } catch (error) {
      throw error.message;
    }
  },

  delete: async (id) => {
    try {
      const res = await instance.delete(`/todos/${id}`);
      return res.data;
    } catch (error) {
      throw error.message;
    }
  },
};

export default TASK_API;
