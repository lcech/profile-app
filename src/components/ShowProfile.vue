<template>
  <b-row>
    <b-col cols="12">
      <b-jumbotron id="profile">
        <b-row class="mb-5">
          <b-col cols="2">
            <b-icon-shield font-scale="10"></b-icon-shield>
          </b-col>
          <b-col cols="9">
            <h1 class="display-2">
              {{ profile.first_name }} {{ profile.last_name }}
            </h1>
            <h2>{{ profile.job_title }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <FeaturesTable
            v-for="(features, index) in profile.features"
            :key="index"
            :title="features.title"
            :features="features.items"
          ></FeaturesTable>
        </b-row>
      </b-jumbotron>
      <b-button-group>
        <router-link :to="{ name: 'EditProfile', params: { id: key } }">
          <b-btn variant="success"><b-icon-pencil-square /> Edit Profile</b-btn>
        </router-link>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import { db } from "../firebase-config";
import FeaturesTable from "./FeaturesTable";

export default {
  name: "ShowProfile",
  components: {
    FeaturesTable,
  },
  data() {
    return {
      key: "",
      profile: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    const ref = db.collection("profiles").doc(to.params.id);

    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          next((vm) => {
            vm.key = doc.id;
            vm.profile = doc.data();
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>
