import axios from 'axios';

export const fetchCategory = (category) => {
  return axios
    .get(`https://bad-api-assignment.reaktor.com/products/${category}`)
    .then(res => res.data)
    .catch(err => err);
}

export const fetchAvalability = (manufacturer) => {  
  return axios
    .get(`https://bad-api-assignment.reaktor.com/availability/${manufacturer}`)
    .then(res => res.data.response)
    .catch(err => err);
}