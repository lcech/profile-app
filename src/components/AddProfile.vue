<template>
  <b-row>
    <b-col cols="12">
      <b-button-group>
        <b-btn href="/profiles"
          ><b-icon-arrow-left></b-icon-arrow-left> Profile List</b-btn
        >
      </b-button-group>
      <h2>
        New Profile
      </h2>
      <b-form @submit="onSubmit">
        <b-jumbotron>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="First Name"
          >
            <b-form-input
              id="first_name"
              v-model.trim="profile.first_name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Last Name"
          >
            <b-form-input
              id="last_name"
              v-model.trim="profile.last_name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Job Title"
          >
            <b-form-input
              id="job_title"
              v-model.trim="profile.job_title"
            ></b-form-input>
          </b-form-group>
        </b-jumbotron>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { db } from "../firebase-config";
import router from "../router";

export default {
  name: "AddProfile",
  data() {
    return {
      profile: {
        uid: this.$store.getters.user.uid
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      const ref = db.collection("profiles")
      ref
        .add(this.profile)
        .then(() => {
          this.profile.first_name = "";
          this.profile.last_name = "";
          this.profile.job_title = "";
          router.push({
            name: "ProfileList",
          });
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
    },
  },
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
</style>
