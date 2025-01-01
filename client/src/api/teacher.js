import { axiosInstance } from './axiosInstance';

export const getAllTeachers = async () => {
  try {
    const response = await axiosInstance.get('/api/teacher');
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

export const addTeacher = async (teacherData) => {
  try {
    const response = await axiosInstance.post('/api/teacher', teacherData);
    return response.data;
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher:', error);
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await axiosInstance.put(`/api/teacher/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};