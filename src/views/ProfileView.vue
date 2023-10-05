<template>
  <section class="profile-section d-flex flex-column">
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
    <div v-if="user" class="profile-section-content d-flex flex-column">
      <p class="profile-section-title">Profile</p>
      <v-divider color="softAttention" :thickness="2"></v-divider>
      <div
        class="d-flex align-center justify-space-around profile-section-content-configuration"
      >
        <v-avatar
          @mouseover="showIndicator = true"
          @mouseleave="showIndicator = false"
          @click="fileInput.click()"
          size="200"
          class="profile-section-photo"
          color="backgroundColor"
        >
          <v-img
            :src="user.urlProfilePhoto"
            alt="Profile photo"
            cover
            height="100%"
          ></v-img>

          <v-icon
            v-if="showIndicator"
            icon="fa-solid fa-camera"
            class="change-indicator"
          ></v-icon>
        </v-avatar>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept="image/*"
          @change="onPhotoChange"
        />
        <div
          class="d-flex justify-center flex-column profile-section-content-inputs"
        >
          <InputComponent
            input-label="Username"
            :input-rules="[rules.required]"
            v-model="profileForm.username"
            input-variant="solo"
            @blur="updateUser(profileForm)"
          />
        </div>
        <div
          class="d-flex justify-center align-center profile-section-content-switch"
        >
          <p>Theme:</p>
          <v-switch
            v-model="profileForm.theme"
            hide-details
            inset
            :label="themeLabel"
            true-value="light"
            false-value="dark"
            density="compact"
            :color="profileForm.theme ? 'softAttention' : ''"
            class="switch"
            @update:modelValue="
              () => {
                changeTheme();
                updateUser(profileForm);
              }
            "
          ></v-switch>
        </div>
      </div>
      <div class="d-flex">
        <ButtonComponent
        button-label="Delete account"
        button-type="button"
        class="profile-section-delete-button"
        @click="showDeleteAccount = true"
        color="red"
        button-prepend-icon="fa-solid fa-trash-can"
      />
      <ButtonComponent
        button-label="send feedback"
        button-type="button"
        class="profile-section-delete-button"
        :button-route="{name:'Feedback'}"
        button-prepend-icon="fa-solid fa-comment-dots"
      />
      </div>
    </div>
    <DialogComponent
      v-model="showDeleteAccount"
      dialog-title="Confirm delete"
      :dialog-text="`Are you sure you want to delete your account? All information will be deleted.`"
      :dialog-no-button-action="closeDeleteAccount"
      :dialog-yes-button-action="deleteAccount"
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useTheme } from "vuetify";
import rules from "../utils/rules";
import router from "../router";
import ErrorComponent from "@/components/ErrorComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

const newUserInfo = ref(new FormData());

const userStore = useUserStore();

const theme = useTheme();

const fileInput = ref(null);

const user = ref(JSON.parse(localStorage.getItem("userInfo")));

const showIndicator = ref(false);

const showDeleteAccount = ref(false);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const profileForm = ref({
  username: user.value.username,
  theme: user.value.theme,
});

const themeLabel = computed(() => {
  return (
    profileForm.value.theme[0].toUpperCase() +
    profileForm.value.theme.substring(1)
  );
});

function checkEmailAndUsernameAreEmpty() {
  return profileForm.value.email === "" && profileForm.value.username === "";
}

function closeDeleteAccount() {
  showDeleteAccount.value = false;
}

function changeTheme() {
  theme.global.name.value = profileForm.value.theme;
}

async function onPhotoChange(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      newUserInfo.value = new FormData();

      newUserInfo.value.append("image", file);

      user.value.urlProfilePhoto = e.target.result;

      await updateUser(newUserInfo.value);
    };
    reader.readAsDataURL(file);
  }
}

async function updateUser(data) {
  try {
    if (!checkEmailAndUsernameAreEmpty()) {
      const result = await userStore.updateActualUser(data);

      if (result) {
        newUserInfo.value = new FormData();
        await getActualUser();
      }
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

async function getActualUser() {
  try {
    const result = await userStore.getActualUser();

    localStorage.setItem("userInfo", JSON.stringify(result));

    user.value = result;
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

async function deleteAccount() {
  try {
    const result = await userStore.deleteUser();

    if (result) {
      localStorage.clear();
      router.push({ name: "Login" });
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}
</script>

<style scoped lang="scss">
.profile-section {
  width: 100%;
  min-height: 100vh;
  background-color: rgb(var(--v-theme-backgroundColor));
  color: rgb(var(--v-theme-text));
  font-family: $secondary-font;
  padding: 30px;
  &-title {
    font-family: $primary-font;
    font-size: 50px;
    margin-left: 50px;
    margin-bottom: 5px;
  }

  &-content {
    width: 100%;
    padding: 30px 30px 70px 30px;
    border: 3px solid rgb(var(--v-theme-softAttention));
    border-radius: 20px;

    .switch {
      flex: none;
    }

    &-inputs {
      width: 50%;
    }

    &-switch {
      p {
        font-size: 15px;
      }
      gap: 15px;
    }

    &-configuration {
      margin-top: 30px;
    }
  }

  &-photo {
    position: relative;

    border: 3px solid rgb(var(--v-theme-softAttention));

    cursor: pointer;
    .change-indicator {
      position: absolute;

      background-color: rgba($color: var(--v-theme-attention), $alpha: 0.6);
      color: rgb(var(--v-theme-backgroundColor));

      font-size: 100px;

      border-radius: 50%;

      width: 100%;
      height: 100%;
    }
  }

  &-delete-button {
    margin-top: 50px;
    margin-left: 30px;
    width: fit-content;
  }
}
</style>
