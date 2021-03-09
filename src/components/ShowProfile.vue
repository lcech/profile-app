<template>
  <b-row>
    <b-col cols="12">
      <b-button-group>
        <b-btn href="#/"><b-icon-arrow-left></b-icon-arrow-left> Profile List</b-btn>
      </b-button-group>
      <b-jumbotron>
        <template slot="header">
          <b-icon-shield></b-icon-shield>
          {{profile.first_name}} {{profile.last_name}}
        </template>
        <template slot="lead">
          Job Title: {{profile.job_title}}<br>
          <b-row>
            <b-col cols="6">
              <b-table striped hover :fields="strengths_fields" :items="strengths"></b-table>
            </b-col>
            <b-col cols="6">
              <b-table striped hover :fields="experiences_fields" :items="experiences"></b-table>
            </b-col>
          </b-row>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editprofile(key)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteprofile(key)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../firebase-config'
import router from '../router'

export default {
  name: 'ShowProfile',
  data () {
    return {
      key: '',
      profile: {},
      strengths_fields: [
        {
          key: 'title',
          label: 'Strengths'
        }
      ],
      strengths: [
        {title: 'Adobe Analytics'},
        {title: 'Tag Management'},
        {title: 'Cookies Consent Management'},
        {title: 'JavaScript'},
        {title: 'Node.js'}
      ],
      experiences_fields: [
        {
          key: 'title',
          label: 'Experiences'
        }
      ],
      experiences: [
        {title: 'Československá obchodní banka',
        role: 'Digital Analytics Architect & Developer'},
        {title: 'Polish Airlines LOT',
        role: 'Digital Analytics Consultant & Developer'},
        {title: 'České aerolinie',
        role: 'Digital Analytics Consultant & Developer'},
        {title: 'Equa bank',
        role: 'Digital Analytics Architect & Developer'},
        {title: 'O2 Czech Republic',
        role: 'Digital Analytics Consultant & Developer'}
      ]
    }
  },
  created () {
    const ref = firebase.firestore().collection('profiles').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.profile = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    editprofile (id) {
      router.push({
        name: 'EditProfile',
        params: { id: id }
      })
    },
    deleteprofile (id) {
      firebase.firestore().collection('profiles').doc(id).delete().then(() => {
        router.push({
          name: 'ProfileList'
        })
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    }
  }
}
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