import { createWebHistory, createRouter } from 'vue-router'

//import LandPage2 from './components/LandPage2.vue'
import landpage from './components/landpage.vue'
import ourservices from './components/ourservices.vue'
import aboutus from './components/aboutus.vue'
import contactus from './components/contactus.vue'
import feedback from './components/feedback.vue'
import adminlogin from './components/adminlogin.vue'
import donatenow from './components/donatenow.vue'
import loginsignupdoctor from './components/doctor/loginsignupdoctor.vue'
import signupdoctor from './components/doctor/signupdoctor.vue'
import loginpagedoctor from './components/doctor/loginpagedoctor.vue'
import loginresultdoctor from './components/doctor/Loginresultdoctor.vue'
import loginsignuppatient from './components/patient/loginsignuppatient.vue'
import signuppatient from './components/patient/signuppatient.vue'
import loginpagepatient from './components/patient/loginpagepatient.vue'
import loginresultpatient from './components/patient/loginresultpatient.vue'
import ChatPage from './components/patient/ChatPage.vue'
import dataimport from './components/dataimport.vue'
import LoginForAdmin from './components/loginforadmin.vue'
const routes = [
  {
    name: 'adminLoginPage',
    path: '/admin-login',
    component: adminlogin
  },

  {
    name: 'donatenowPage',
    path: '/donate-now',
    component: donatenow
  },

  {
    name: 'landpage',
    path: '/landpage',
    component: landpage
  },

  {
    name: 'aboutUs',
    path: '/about-us',
    component: aboutus
  },

  {
    name: 'ourServices',
    path: '/our-services',
    component: ourservices
  },

  {
    name: 'contactUs',
    path: '/contact-us',
    component: contactus
  },

  {
    name: 'feedBack',
    path: '/feedback',
    component: feedback
  },

  {
    name: 'loginSignupDoctor',
    path: '/login-signup-doctor',
    component: loginsignupdoctor
  },
  {
    name: 'signupDoctor',
    path: '/signup-doctor',
    component: signupdoctor
  },
  {
    name: 'loginPageDoctor',
    path: '/login-doctor',
    component: loginpagedoctor
  },
  {
    name: 'loginResultDoctor',
    path: '/login-result-doctor',
    component: loginresultdoctor
  },

  {
    name: 'loginSignupPatient',
    path: '/login-signup-patient',
    component: loginsignuppatient
  },
  {
    name: 'signupPatient',
    path: '/signup-patient',
    component: signuppatient
  },

  {
    name: 'loginPagePatient',
    path: '/login-patient',
    component: loginpagepatient
  },

  {
    name: 'loginResultPatient',
    path: '/login-result-patient',
    component: loginresultpatient
  },

  {
    name: 'chatPage',
    path: '/chat',
    component: ChatPage
  },

  {
    path: '/import-data',
    name: 'ImportData',
    component: dataimport
  },

  {
    name: 'adminLoginPage',
    path: '/admin-login',
    component: adminlogin
  },

  {
    path: '/loginforadmin',
    name: 'loginForAdminPage',
    component: LoginForAdmin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
