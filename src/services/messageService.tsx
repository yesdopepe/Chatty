import axiosWithAuth from "../utils/axiosWithAuth";

export const getMessage = async (id: string) => {
  const { data } = await axiosWithAuth.get(`/messages/${id}`);
  console.log(data);
  return data;
};

export const getMessagesByChannel = async (channelId: string) => {
  const { data } = await axiosWithAuth.get(`/messages/channel/${channelId}`);
  console.log(data);
  return data;
};

export const createMessage = async (message: Message) => {
  const { data } = await axiosWithAuth.post("/messages", message);
  console.log(data);
  return data;
};

export const updateMessage = async (id: string, message: any) => {
  const { data } = await axiosWithAuth.put(`/messages/${id}`, message);
  console.log(data);
  return data;
};

export const deleteMessage = async (id: string) => {
  const { data } = await axiosWithAuth.delete(`/messages/${id}`);
  console.log(data);
  return data;
};
