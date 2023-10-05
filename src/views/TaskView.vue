<template>
  <v-card color="backgroundColor" class="task-view">
    <v-form
      ref="form"
      @submit.prevent="submit()"
      class="d-flex justify-center flex-column task-view-form"
    >
      <v-card-title v-if="!existsATask">
        <p class="task-view-form-title">Create task</p>
      </v-card-title>
      <v-card-title
        class="d-flex align-center"
        v-if="!showEditTitle && existsATask"
      >
        <p class="task-view-form-title">
          {{ taskForm.title }}
        </p>
        <v-spacer></v-spacer>
        <div class="task-view-form-title-buttons d-flex align-center">
          <ButtonComponent
            button-type="button"
            button-label="edit"
            @click="showEditInputs()"
          />
          <ButtonComponent
            button-type="button"
            button-label="delete"
            @click="showDeleteTask = true"
          />
        </div>
      </v-card-title>
      <v-divider
        v-if="!showEditDescription && !showEditTitle && existsATask"
      ></v-divider>
      <div
        class="task-view-form-chips d-flex align-center"
        v-if="!showEditDescription && !showEditTitle && existsATask"
      >
        <v-chip label
          >Created at: {{ takeDateFromTimestamp(task.createdAt) }}</v-chip
        >
        <v-chip label
          >Last modified: {{ takeDateFromTimestamp(task.updatedAt) }}</v-chip
        >
      </div>
      <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
      <v-card-text class="d-flex flex-column task-view-form-description">
        <InputComponent
          input-label="Task title"
          :input-rules="[rules.required]"
          v-model="taskForm.title"
          v-if="showEditTitle || !existsATask"
          input-variant="solo"
        />

        <TextareaComponent
          :input-autogrow="true"
          input-label="Task description"
          v-model="taskForm.description"
          v-if="showEditDescription || !existsATask"
          input-variant="solo"
        />
        <p
          v-if="!showEditDescription && existsATask"
          class="task-view-form-description"
        >
          {{
            taskForm.description
              ? taskForm.description
              : "No description provided"
          }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <ButtonComponent
          button-type="button"
          button-label="close edit"
          v-if="existsATask && showEditTitle && showEditDescription"
          @click="closeEditInputs()"
          class="task-view-form-button"
          button-color="backgroundColor"
        />
        <ButtonComponent
          button-type="submit"
          button-label="update"
          v-if="existsATask && showEditTitle && showEditDescription"
          class="task-view-form-button"
          button-color="backgroundColor"
        />
        <ButtonComponent
          button-type="submit"
          button-label="create"
          v-if="!existsATask"
          class="task-view-form-button"
          button-color="backgroundColor"
        />
      </v-card-actions>
    </v-form>
    <DialogComponent
      v-model="showDeleteTask"
      dialog-title="Confirm delete"
      :dialog-text="`Are you sure you want to delete this task?`"
      :dialog-no-button-action="closeDeleteTaskDialog"
      :dialog-yes-button-action="deleteTask"
    />
  </v-card>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useTaskStore } from "../stores/taskStore";
import rules from "../utils/rules";
import InputComponent from "@/components/InputComponent.vue";
import TextareaComponent from "@/components/TextareaComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

const taskStore = useTaskStore();

const props = defineProps({
  task: null,
  idTable: String,
  status: Number,
  order: Number,
});

const emit = defineEmits(["ocurredChangeWithTasks"]);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const existsATask = ref(false);

const form = ref(null);

const showEditTitle = ref(false);

const showEditDescription = ref(false);

const showDeleteTask = ref(false);

const taskForm = ref(null);

function takeDateFromTimestamp(timestamp) {
  return timestamp.slice(0, 10);
}

function showEditInputs() {
  showEditTitle.value = true;
  showEditDescription.value = true;
}

function closeEditInputs() {
  showEditTitle.value = false;
  showEditDescription.value = false;
}

function closeDeleteTaskDialog() {
  showDeleteTask.value = false;
}

function iniatilizeView() {
  existsATask.value = props.task ? !existsATask.value : existsATask.value;

  taskForm.value = {
    title: existsATask.value ? props.task.title : "",
    description: existsATask.value ? props.task.description : "",
  };
}

async function submit() {
  if (existsATask.value) {
    await editTask(taskForm.value);
  } else {
    await createTask(taskForm.value);
  }
}

async function createTask(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const createTaskForm = {
        ...dataForm,
        ...{
          status: props.status,
          order: props.order,
          idTable: props.idTable,
        },
      };

      const result = await taskStore.createTask(createTaskForm);

      if (result) {
        emit("ocurredChangeWithTasks");
      }
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}

async function editTask(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const result = await taskStore.updateTaskByIdAndIdTable(
        props.task._id,
        props.idTable,
        dataForm
      );

      if (result) {
        emit("ocurredChangeWithTasks");
      }
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}

async function deleteTask() {
  try {
    closeDeleteTaskDialog();

    const result = await taskStore.deleteTaskByIdAndIdTable(
      props.task._id,
      props.idTable
    );

    if (result) {
      emit("ocurredChangeWithTasks");
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

onBeforeMount(() => {
  iniatilizeView();
});
</script>

<style scoped lang="scss">
.task-view {
  width: 800px;
  min-height: 400px;
  padding: 30px;
  border-radius: 10px !important;
  border: 1px solid rgb(var(--v-theme-softAttention));
  font-family: $secondary-font;
  &-form {
    width: 100%;
    height: 100%;
    &-title {
      letter-spacing: normal;

      font-size: 30px;
      font-family: $primary-font;

      margin-bottom: 10px;
      &-buttons {
        gap: 10px;
      }
    }

    &-description {
      font-size: 15px;
      font-weight: 200;
    }

    &-chips {
      margin: 15px 10px;
      gap: 10px;
    }

    &-button {
      background-color: rgb(var(--v-theme-attention));
    }
  }
}
</style>
