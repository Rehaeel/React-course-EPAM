import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const fetchedCourses = axios.get(`${BACKEND_URL}/courses/all`);
export const fetchedAuthors = axios.get(`${BACKEND_URL}/authors/all`);
