<template>
  <section class="dashboard-section">
    <v-layout v-on-click-outside="closeNavigationDrawer">
      <v-navigation-drawer
        location="right"
        color="backgroundColor"
        hover
        permanent
        :rail="rail"
        @click="rail = false"
        :class="rail ? 'v-navigation-drawer-padding' : ''"
      >
        <template v-slot:prepend>
          <v-list-item
            v-if="rail"
            :prepend-avatar="user.urlProfilePhoto"
            :title="user.username"
            nav
            @click="router.push({ name: 'Profile' })"
            style="cursor: pointer;"
            class="avatar"
          >
          </v-list-item>
          <div
            v-else
            @click="router.push({ name: 'Profile' })"
            class="d-flex justify-center align-center flex-column drawer-profile-section text-center"
            style="cursor: pointer;"
          >
            <v-avatar :image="user.urlProfilePhoto" size="70"></v-avatar>
            <p>{{ user.username }}</p>
        </div>

          <v-divider></v-divider>

          <v-list-item
            prepend-icon="fa-solid fa-plus"
            title="Create new table"
            @click="allowTableCreatorView()"
            class="createButton"
          ></v-list-item>
        </template>

        <v-list density="compact" nav>
          <v-list-item
            v-for="table of tablesOfUser"
            prepend-icon="fa-solid fa-table"
            :title="table.tableName"
            :key="table._id"
            :active="table._id === actualTable._id"
            @click="saveLastTableViewed(table)"
            v-if="tablesOfUser.length > 0 && actualTable"
          ></v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list-item
            prepend-icon="fa-solid fa-right-from-bracket"
            title="Logout"
            @click="logout()"
          ></v-list-item>
        </template>
      </v-navigation-drawer>
    </v-layout>
    <TableView
      :actual-table="actualTable"
      v-if="actualTable"
      :other-component-error="error"
      @tableDeleted="tableWasDeleted()"
      @tableUpdated="getTablesOfUser()"
    />
    <div
      class="dashboard-section-no-tables d-flex align-center justify-center"
      v-else
    >
      No tables found &#129300;. Start creating one by pressing the create new
      table button &#128073;
    </div>
    <v-slide-y-reverse-transition>
      <InputComponent
        v-show="showTableCreator"
        v-model="tableForm.tableName"
        input-variant="solo"
        input-label="Table name"
        input-placeholder="Press enter to create table"
        input-prepend-inner-icon="fa-solid fa-table"
        :input-autofocus="true"
        class="dashboard-section-input input"
        @keyup.enter="createTable()"
        v-on-click-outside="closeTableCreator"
      />
    </v-slide-y-reverse-transition>
  </section>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import { useTableStore } from "../stores/tableStore";
import { vOnClickOutside } from "@vueuse/components";
import { useTheme } from "vuetify";
import router from "../router";
import TableView from "@/views/TableView.vue";
import InputComponent from "@/components/InputComponent.vue";

const tableStore = useTableStore();

const userStore = useUserStore();

const theme = useTheme();

const rail = ref(true);

const showTableCreator = ref(false);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const user = ref(null);

const tablesOfUser = ref([]);

const actualTable = ref(null);

const tableForm = ref({
  tableName: "",
});

function closeNavigationDrawer() {
  rail.value = true;
}

function allowTableCreatorView() {
  showTableCreator.value = true;
}

function closeTableCreator() {
  showTableCreator.value = false;
}

function tableTitleIsEmpty(){
  return tableForm.value.tableName === ""
}

async function createTable() {
  closeTableCreator();

  if (!tableTitleIsEmpty()) {
    const result = await tableStore.createTable(tableForm.value);

    if (result) {
      await initializeView()
    }
  }
}

async function logout() {
  try {
    const result = await userStore.logout();

    if (result) {
      localStorage.removeItem("loggedIn");
      router.push({ name: "Login" });
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

function saveLastTableViewed(table) {
  actualTable.value = table;

  localStorage.setItem("lastTableSaved", JSON.stringify(table));
}

async function getTablesOfUser() {
  tablesOfUser.value = [...(await tableStore.getTables())];
}

function getActualTable() {
  if (tablesOfUser.value.length > 0) {
    actualTable.value = localStorage.getItem("lastTableSaved")
      ? JSON.parse(localStorage.getItem("lastTableSaved"))
      : tablesOfUser.value[0];
  } else {
    actualTable.value = null;
  }
}

async function tableWasDeleted() {
  localStorage.removeItem("lastTableSaved");
  await initializeView()
}

async function initializeView() {
  theme.global.name.value = user.value.theme

  await getTablesOfUser();

  getActualTable();
}

onBeforeMount(async () => {
  user.value = JSON.parse(localStorage.getItem("userInfo"));
  await initializeView();
});
</script>

<style scoped lang="scss">
.dashboard-section {
  width: 100%;
  height: auto;
  min-height: 100vh;

  font-family: $secondary-font;
  color: rgb(var(--v-theme-text));
  background-color: rgb(var(--v-theme-backgroundColor));

  position: relative;

  .avatar{
    padding-bottom: 13px;
    padding-left: 7.5px;
  }

  .v-navigation-drawer-padding {
    padding-top: 10px;
    border-left: 2px solid rgb(var(--v-theme-softAttention));
  }
  .drawer-profile-section {
    position: relative;
    padding: 20px 0;
    .v-avatar {
      margin-bottom: 10px;
      border: 2px solid rgb(var(--v-theme-softAttention));
      
    }
    p{
      font-size: 15px;
    }
  }

  .drawer-profile-section:hover::before {
    position: absolute;
    content: "";
    inset: 0;
    background-color: #ffffff;
    opacity: 10%;
  }

  .createButton{
    padding: 10px 16px;
  }

  &-input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 56px);
    max-width: calc(100% - 56px);
    z-index: 1;
    color: rgb(var(--v-theme-text));
    padding: 0 10px;
  }

  &-no-tables {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    font-size: 20px;
  }
}
</style>
