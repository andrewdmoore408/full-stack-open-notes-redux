import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = {
    content,
    important: false
  };

  const response = await axios.post(baseUrl, object);
  return response.data;
};

const toggleImportance = async (id) => {
  const noteUrl = `${baseUrl}/${id}`;
  const response = await axios.get(noteUrl);
  const noteToUpdate = await response.data;

  noteToUpdate.important = !noteToUpdate.important;

  const updatedResponse = await axios.put(noteUrl, noteToUpdate);
  return await updatedResponse.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, toggleImportance };
