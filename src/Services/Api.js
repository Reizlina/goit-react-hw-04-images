import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

const APIkey = '27891159-be6e7cac58428882c4b36c938';

export const getPosts = async (value, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q: value,
      page,
      key: APIkey,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  // console.log(data);
  return data;
};
