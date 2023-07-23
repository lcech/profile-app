<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-tabs card>
          <b-tab title="Edit Basic Profile" active>
            <b-form @submit="onSubmit">
              <b-jumbotron>
                <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="First Name">
                  <b-form-input id="first_name" v-model.trim="profile.first_name"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Last Name">
                  <b-form-input id="last_name" v-model.trim="profile.last_name"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Job Title">
                  <b-form-input id="author" v-model.trim="profile.job_title"></b-form-input>
                </b-form-group>
              </b-jumbotron>
              <b-button-group class="mr-1">
                <b-button type="submit" variant="primary">Update</b-button>
              </b-button-group>
              <b-button-group>
                <router-link :to="{ name: 'ShowProfile', params: { id: key } }">
                  <b-btn><b-icon-file-earmark-person /> Show Profile</b-btn>
                </router-link>
              </b-button-group>
            </b-form>
          </b-tab>
          <b-tab
            v-for="feature in profile.features"
            :key="feature.title"
            :title="feature.title">
            <b-table striped hover :items="feature.items"></b-table>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { db } from '../firebase-config'
import router from '../router'

export default {
  name: 'EditProfile',
  data () {
    return {
      key: this.$route.params.id,
      profile: {}
    }
  },
  created () {
    const ref = db.collection('profiles').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.profile = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = db.collection('profiles').doc(this.$route.params.id);
      updateRef.set(this.profile).then(() => {
        this.key = ''
        this.profile.first_name = ''
        this.profile.last_name = ''
        this.profile.job_title = ''
        router.push({ name: 'ShowProfile', params: { id: this.$route.params.id }})
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>