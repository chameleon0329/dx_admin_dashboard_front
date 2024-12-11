// src/plugins/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081', // Spring Boot 서버 주소
  timeout: 5000,
});

export default instance;
