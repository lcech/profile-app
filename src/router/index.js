import VueRouter from 'vue-router'
import ProfileList from '@/components/ProfileList'
import ShowProfile from '@/components/ShowProfile'
import AddProfile from '@/components/AddProfile'
import EditProfile from '@/components/EditProfile'

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ProfileList',
      component: ProfileList
    },
    {
      path: '/show-Profile/:id',
      name: 'ShowProfile',
      component: ShowProfile
    },
    {
      path: '/add-Profile',
      name: 'AddProfile',
      component: AddProfile
    },
    {
      path: '/edit-Profile/:id',
      name: 'EditProfile',
      component: EditProfile
    }
  ]
})