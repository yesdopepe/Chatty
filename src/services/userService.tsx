import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { API_BASE_URL, CLOUD_NAME, UPLOAD_PRESET } from "../utils/constants";

export const getUser = async (id: string) => {
  const { data } = await axios.get(`${API_BASE_URL}/users/${id}`);
  console.log(data);
  return data;
};

export const getUsersBySearch = async (search: string) => {
  const { data } = await axiosWithAuth.get(`/users/?search=${search}`);
  console.log(data);
  return data;
};

export const updateUser = async (id: string, user: any) => {
  const { data } = await axiosWithAuth.put(`/users/${id}`, user);
  console.log(data);
  return data;
};

// IMAGES
export const uploadImages = async (images: any) => {
  const results: any[] = [];

  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("file", images[i]);
    formData.append("upload_preset", UPLOAD_PRESET!);
    formData.append("cloud_name", CLOUD_NAME!);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      formData
    );
    results.push(data.secure_url);
  }

  return results;
};

export const uploadUserImage = async (image: string) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET!);
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    formData
  );
  return data.secure_url;
};

// FRIENDS
export const getFriends = async (id: string) => {
  const { data } = await axiosWithAuth.get(`/users/${id}/friend`);
  console.log(data);
  return data;
};

export const setFriend = async (
  id: string,
  otherId: string,
  status: boolean
) => {
  const { data } = await axiosWithAuth.put(`/users/${id}/friend`, {
    otherId,
    status,
  });
  console.log(data);
  return data;
};

export const checkFriend = async (userId: string, id: string) => {
  const { data } = await axiosWithAuth.get(`/users/${userId}`);
  const friends: string[] = data.user.friends;
  if (!friends) return false;
  console.log(data);
  const isFriend = friends.includes(id);
  return isFriend;
};

// REQUESTS
export const getRequests = async (id: string) => {
  const { data } = await axiosWithAuth.get(`/users/${id}/request`);
  console.log(data);
  return data;
};

export const setRequest = async (
  id: string,
  otherId: string,
  status: boolean
) => {
  const { data } = await axiosWithAuth.put(`/users/${id}/request`, {
    otherId,
    status,
  });
  console.log(data);
  return data;
};

// BLOCK
export const getBlocked = async (id: string) => {
  const { data } = await axiosWithAuth.get(`/users/${id}/block`);
  console.log(data);
  return data;
};

export const setBlocked = async (
  id: string,
  otherId: string,
  status: boolean
) => {
  const { data } = await axiosWithAuth.put(`/users/${id}/block`, {
    otherId,
    status,
  });
  console.log(data);
  return data;
};

export const checkBlock = async (userId: string, id: string) => {
  const { data } = await axiosWithAuth.get(`/users/${userId}`);
  const blocked: string[] = data.user.blocked;
  if (!blocked) return false;
  console.log(data);
  const isBlocked = blocked.includes(id);
  return isBlocked;
};
