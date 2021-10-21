<template>
  <div class="container">
    <div class="row">
      <div class="col-sm"></div>
      <div id="users" class="col-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" @click="sortBy('name')">Имя</th>
              <th scope="col" @click="sortBy('phone')">Телефон</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in users">
              <tr v-if="!item.isChild" :key="item.phone">
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
              </tr>
              <tr v-for="item in item.childs" :key="item.phone" class="child">
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'UsersTable',
    data() {
      return {
        isSorted: [],
        lastSort: null,
      };
    },
    computed: {
      ...mapState(['users']),
    },
    methods: {
      ...mapMutations(['setUser']),
      sortBy(col) {
        const users = JSON.parse(JSON.stringify(this.users));

        if (this.isSorted[col] === undefined) {
          this.isSorted[col] = false;
        }
        if (this.isSorted[col] && this.lastSort === col) {
          this.setUser(users.reverse());
          this.isSorted[col] = false;
        } else {
          this.setUser(users.sort((a, b) => a[col].localeCompare(b[col])));
          this.isSorted[col] = true;
        }

        this.lastSort = col;
      },
    },
  };
</script>

<style>
  .child td {
    padding-left: 25px;
  }
  td {
    text-align: left;
  }
</style>