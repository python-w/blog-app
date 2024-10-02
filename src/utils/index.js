export const menuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/'
  },
  {
    id: 'category',
    label: 'Category',
    path: '/category'
  },
  {
    id: 'blogs',
    label: 'Blogs',
    path: '/blogs'
  },
  {
    id: 'search',
    label: 'Search',
    path: '/search'
  }
]

export const categories = [
  {
    value: "application",
    label: "Application"
  },
  {
    value: "data",
    label: "Data"
  },
  {
    value: "software",
    label: "Software"
  },
  {
    value: "tech",
    label: "Technology"
  },
  {
    value: "science",
    label: "Science"
  },
]

export const formControls = [
  {
    id: 'title',
    label: 'Title',
    placeholder: "Enter Blog Title",
    type: 'text',
    component: 'input',
    options: [],
  },
  {
    id: 'description',
    label: 'Description',
    placeholder: "Enter Blog Description",
    type: 'text',
    component: 'textarea',
    options: [],
  },
  {
    id: 'category',
    label: 'Category',
    placeholder: "Choose Blog Category",
    type: '',
    component: 'select',
    options: categories,
  },
]

export const loginFormControls = [
  {
    id: 'email',
    label: 'Email',
    placeholder: "Enter Email",
    type: 'email',
    component: 'input',
    options: [],
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: "Enter Password",
    type: 'password',
    component: 'input',
    options: [],
  }
]

export const firebaseConfig = {
  apiKey: "AIzaSyBNWWzjC9Zw62ku5lHlZ0KvJRjyXeBetOU",
  authDomain: "nextjs-blog-2024-fd273.firebaseapp.com",
  projectId: "nextjs-blog-2024-fd273",
  storageBucket: "nextjs-blog-2024-fd273.appspot.com",
  messagingSenderId: "582303704686",
  appId: "1:582303704686:web:353a7582adb2e94522e87f",
  measurementId: "G-WQPEZDK933"
};

export const initialBlogFormData = {
  title: '',
  description: '',
  image: '',
  category: ''
}