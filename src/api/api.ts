import axios from 'axios';

interface PostData {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

interface PostResponse{
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}


const apiClient = axios.create({
  baseURL: 'https://forum-webtech.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default {
  getRoot() {
    return apiClient.get('/');
  },
  getPosts() {
    return apiClient.get<PostResponse[]>('/posts');
  },

  sendPost(postData: PostData) {
    return apiClient.post(`/posts`, postData);
  },
};
