import './index.css'
import React, { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load your page components
const Home = lazy(() => import('./pages/Home'));
const NewsList = lazy(() => import('./pages/NewsList'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const MainLayout = lazy(() => import('./NewComponents/MainLayout'));

// Auth pages (User)
const Login = lazy(() => import('./pages/user/auth/UserLogin.jsx'));
const Register = lazy(() => import('./pages/user/auth/UserRegister.jsx'));

// Admin pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminOverview = lazy(() => import('./pages/admin/Overview.jsx'));
const AdminPosts = lazy(() => import('./pages/admin/Posts.jsx'));
const AdminCategories = lazy(() => import('./pages/admin/Categories.jsx'));
const AdminTags = lazy(() => import('./pages/admin/Tags.jsx'));
const AdminUsers = lazy(() => import('./pages/admin/Users.jsx'));
const AdminComments = lazy(() => import('./pages/admin/Comments.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/auth/AdminLogin.jsx'));
const AdminRegister = lazy(() => import('./pages/admin/auth/AdminRegister.jsx'));
const AdminPostCreate = lazy(() => import('./pages/admin/PostCreate.jsx'));
const AdminPostEdit = lazy(() => import('./pages/admin/PostEdit.jsx'));

// User pages
const UserLayout = lazy(() => import('./pages/user/UserLayout.jsx'));
const UserDashboard = lazy(() => import('./pages/user/Dashboard.jsx'));
const UserMyPosts = lazy(() => import('./pages/user/MyPosts.jsx'));
const UserProfile = lazy(() => import('./pages/user/Profile.jsx'));
const UserCreatePost = lazy(() => import('./pages/user/CreatePost.jsx'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center gap-3 min-h-screen">
    <p className='arena text-xl font-semibold'>Please wait...</p>
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      delay: 200,
      offset: 100,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='news-list' element={<NewsList />} />
            <Route path='news-detail/:id' element={<NewsDetail />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />
          </Route>

          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Admin Auth */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/register' element={<AdminRegister />} />

          {/* User Dashboard */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path='posts' element={<UserMyPosts />} />
            <Route path='create' element={<UserCreatePost />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          {/* Admin Dashboard */}
          <Route
            path='/admin'
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path='posts' element={<AdminPosts />} />
            <Route path='posts/create' element={<AdminPostCreate />} />
            <Route path='posts/:id/edit' element={<AdminPostEdit />} />
            <Route path='categories' element={<AdminCategories />} />
            <Route path='tags' element={<AdminTags />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='comments' element={<AdminComments />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  )
}

export default App