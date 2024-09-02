import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import Courses from './pages/courses/Courses'
import Footer from './components/footer/footer'
import About from './pages/about/about'
import Account from './pages/account/account'
import { UserData } from './context/userContext'
import Loading from './components/loading/loading'
import CourseDescription from './pages/coursedescription/courseDescription'
import PaymentSuccess from './pages/paymentSuccess/paymentsuccess'
import Dashbord from './pages/dashboard/dashboard'
import CourseStudy from './pages/coursestudy/coursestudy'
import Lecture from './pages/lecture/lecture'
import AdminDashboard from './admin/dashboard/AdminDashboard'
import AdminCourses from './admin/courses/AdminCourses'
import AdminUsers from './admin/users/AdminUsers'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import BookStore from './pages/bookStore';

import Test from './pages/testseries';

import BookDescription from './pages/bookdescription'
import BookPaymentSuccess from './pages/paymentSuccess/bookpayment';
import AdminBooks from './admin/Adminbook'
import UpdateBook from './admin/modifyBook'
import EbookStore from './pages/ebookStore'
import EbookDescription from './pages/ebookdescription'
import EbookPaymentSuccess from './pages/paymentSuccess/ebookpayment'
import EbookRead from './pages/Ebookpdf'
import AdminEbooks from './admin/Adminebook'
import UpdateEbook from './admin/modifyEbook'
import NotesStore from './pages/notesStore'
import NotesDescription from './pages/notesDescription'
import NotesPaymentSuccess from './pages/paymentSuccess/notespayment'
import NotesRead from './pages/Notespdf'
import AdminNotes from './admin/Adminnotes'
import UpdateNote from './admin/modifyNotes'
const App = () => {
  const { isAuth, user, loading } = UserData()
  return <>
    {loading ? <Loading /> : <BrowserRouter>
      <Header isAuth={isAuth} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/account' element={isAuth ? <Account user={user} /> : <Login />}></Route>
        <Route path='/login' element={isAuth ? <Home /> : <Login />}></Route>
        <Route path='/register' element={isAuth ? <Home /> : <Register />}></Route>
        <Route path='/verify' element={isAuth ? <Home /> : <Verify />}></Route>
        <Route path='/forgot' element={isAuth ? <Home /> : <ForgotPassword />}></Route>
        <Route path='/courses' element={<Courses />}></Route>
        <Route path='/course/:id' element={isAuth ? <CourseDescription user={user} /> : <Login />} />
        <Route
          path="/payment-success/:id"
          element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
        />

        <Route
          path="/book-payment-success/:id"
          element={isAuth ? <BookPaymentSuccess user={user} /> : <Login />}
        />
        <Route
          path="/:id/dashboard"
          element={isAuth ? <Dashbord user={user} /> : <Login />}
        />
        <Route
          path="/course/study/:id"
          element={isAuth ? <CourseStudy user={user} /> : <Login />}
        />
        <Route
          path="/lectures/:id"
          element={isAuth ? <Lecture user={user} /> : <Login />}
        />
        <Route path='/admin/dashboard' element={isAuth ? <AdminDashboard user={user} /> : <Login />
        } />

        <Route path='/admin/course' element={isAuth ? <AdminCourses user={user} /> : <Login />
        } />

<Route path='/admin/book' element={isAuth ? <AdminBooks user={user} /> : <Login />


        } />

<Route path='/admin/ebooks' element={isAuth ? <AdminEbooks user={user} /> : <Login />
} />
         <Route path="/book/modify/:id" element={<UpdateBook />} />
         <Route path="/ebook/modify/:id" element={<UpdateEbook />} />
        <Route
          path="/admin/users"
          element={isAuth ? <AdminUsers user={user} /> : <Login />}
        />
         <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            />
            <Route path='/book-store' element={<BookStore/>}/>
            <Route path='/ebooks' element={<EbookStore/>}/>
            
            <Route path='/test-series' element={<Test/>}/>
            
            <Route path='/book/:id' element={isAuth ? <BookDescription user={user} /> : <Login />} />
            <Route path='/ebook/:id' element={isAuth ? <EbookDescription user={user} /> : <Login />} />
            <Route path="/ebook/read/:id" element={<EbookRead />} />
            <Route
          path="/ebook-payment-success/:id"
          element={isAuth ? <EbookPaymentSuccess user={user} /> : <Login />}
        />
         <Route path='/notes' element={<NotesStore/>}/>
         <Route path='/notes/:id' element={isAuth ? <NotesDescription user={user} /> : <Login />} />
         <Route
          path="/note-payment-success/:id"
          element={isAuth ? <NotesPaymentSuccess user={user} /> : <Login />}
        />
            <Route path="/notes/read/:id" element={<NotesRead />} />
            <Route path='/admin/notes' element={isAuth ? <AdminNotes user={user} /> : <Login />

} />
            <Route path="/notes/modify/:id" element={<UpdateNote />} />


      </Routes>
      <Footer />
    </BrowserRouter>}
  </>

}

export default App