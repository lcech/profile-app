<template>
  <b-row>
    <b-col cols="12" id="profile-list">
      <h2>
        Profile List
      </h2>
      <b-button-group>
        <b-btn href="#/add-profile" variant="success"><b-icon-person-plus></b-icon-person-plus> Add Profile</b-btn>
      </b-button-group>
      <b-table striped hover :items="profiles" :fields="fields">
        <template v-slot:cell(actions)="data">
          <b-button @click.stop="details(data.item)" variant="primary">Details</b-button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import firebase from '../firebase-config'
import router from '../router'

export default {
  name: 'ProfileList',
  data () {
    return {
      fields: [
        { key: 'first_name', label: 'First Name', sortable: true, 'class': 'text-left' },
        { key: 'last_name', label: 'Last Name', sortable: true, 'class': 'text-left' },
        { key: 'actions', label: 'Action', 'class': 'text-center' }
      ],
      profiles: [],
      errors: [],
      ref: firebase.firestore().collection('profiles'),
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.profiles = [];
      querySnapshot.forEach((doc) => {
        this.profiles.push({
          key: doc.id,
          first_name: doc.data().first_name,
          last_name: doc.data().last_name
        });
      });
    });
  },
  methods: {
    details (profile) {
      router.push({ name: 'ShowProfile', params: { id: profile.key }})
    }
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>