<template>
  <b-row>
    <b-col cols="12" id="profile-list">
      <h2>
        Profile List
      </h2>
      <b-button-group>
        <b-btn href="/add-profile" variant="success"
          ><b-icon-person-plus /> Add Profile</b-btn
        >
      </b-button-group>
      <b-table striped hover :items="profiles" :fields="fields">
        <template v-slot:cell(type)="data">
          <b-icon-person-check-fill v-if="data.item.type" />
          <b-icon-person-x-fill v-else />
        </template>
        <template v-slot:cell(actions)="data">
          <b-button-group>
            <b-button
              @click.stop="viewProfile(data.item.key)"
              variant="primary"
              class="mr-1"
              >View</b-button
            >
            <b-btn
              variant="success"
              @click.stop="editProfile(data.item.key)"
              class="mr-1"
              >Edit</b-btn
            >
            <b-btn variant="danger" @click.stop="deleteProfile(data.item.key)"
              >Delete</b-btn
            >
          </b-button-group>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import { db } from "../firebase-config";
import router from "../router";
import store from "../store";

export default {
  name: "ProfileList",
  data() {
    return {
      fields: [
        {
          key: "type",
          label: "",
          sortable: false,
        },
        {
          key: "first_name",
          label: "First Name",
          sortable: true,
          class: "text-left",
        },
        {
          key: "last_name",
          label: "Last Name",
          sortable: true,
          class: "text-left",
        },
        { key: "actions", label: "Action", class: "text-left" },
      ],
      profiles: [],
      errors: [],
    };
  },
  async beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const ref = db.collection("profiles");
      let snapshot;
      if (store.getters.user.admin) {
        snapshot = await ref.get();
      } else {
        snapshot = await ref.where("uid", "==", store.getters.user.uid).get();
      }

      if (snapshot.empty) {
        console.log("No matching profiles.");
      } else {
        snapshot.forEach((doc) => {
          vm.profiles.push({
            type: store.getters.user.uid == doc.data().uid,
            key: doc.id,
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
          });
        });
      }
    });
  },
  methods: {
    viewProfile(id) {
      router.push({ name: "ShowProfile", params: { id: id } });
    },
    editProfile(id) {
      router.push({
        name: "EditProfile",
        params: { id: id },
      });
    },
    deleteProfile(id) {
      db.collection("profiles")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "ProfileList",
          });
        })
        .catch((error) => {
          alert("Error removing document: ", error);
        });
    },
  },
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>
