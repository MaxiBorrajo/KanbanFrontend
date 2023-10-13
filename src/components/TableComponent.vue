<template>
  <div class="table-component d-flex flex-column">
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
    <div
      class="table-component-status d-flex align-center justify-space-between"
    >
      <div class="d-flex align-center table-component-status-name">
        <v-menu
          :close-on-content-click="false"
          location="end"
          contained
          @update:modelValue="updateColor"
        >
          <template v-slot:activator="{ props }">
            <v-avatar
              size="10"
              :color="objectStatus.color"
              style="cursor: pointer"
              v-bind="props"
            >
            </v-avatar>
          </template>
          <v-color-picker
            color="softAttention"
            v-model="color"
            :modes="['hexa']"
          ></v-color-picker>
        </v-menu>
        {{ objectStatus.value }}
        <v-avatar size="16" class="table-component-status-name-count">
          {{ countOfTasks }}
        </v-avatar>
      </div>
      <v-icon
        class="table-component-status-icon"
        icon="fa-solid fa-trash-can"
        @click="showDeleteTasks = true"
      ></v-icon>
    </div>
    <p class="table-component-subtitle">{{ objectStatus.subtitle }}</p>
    <Draggable
      v-model="tasks"
      item-key="id"
      group="tasks"
      class="d-flex flex-column align-center table-component-tasks"
      :class="tasks.length > 6 ? 'padding-for-scroll' : ''"
    >
      <template #item="{ element: task }">
        <TaskComponent
          v-if="tasks.length > 0"
          :task-title="task.title"
          :task-key="task._id"
          :task-value="task._id"
          :task-color="objectStatus.color"
          @click="allowShowTaskView(task)"
        />
      </template>
    </Draggable>
    <div
      class="add-item-button d-flex align-center"
      @click="allowShowCreateTaskView()"
    >
      <v-icon icon="fa-solid fa-plus" class="add-item-button-icon"> </v-icon>
      Add task
    </div>
  </div>
  <DialogComponent
    v-model="showDeleteTasks"
    dialog-title="Confirm delete"
    :dialog-text="`Are you sure you want to delete all ${objectStatus.value} tasks?`"
    :dialog-no-button-action="closeDeleteTasksDialog"
    :dialog-yes-button-action="deleteTasks"
  />

  <v-dialog v-model="showTaskView" width="auto" scroll-strategy="none">
    <TaskView
      :task="taskSelected"
      :id-table="tableId"
      :status="tableStatus"
      :order="getLastOrderOfTasks()"
      @ocurredChangeWithTasks="handleChangeWithTasks()"
    />
  </v-dialog>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { useUserStore } from "../stores/userStore";
import { useTaskStore } from "../stores/taskStore";
import Draggable from "vuedraggable";
import TaskComponent from "@/components/TaskComponent.vue";
import TaskView from "@/views/TaskView.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";

const userStore = useUserStore();

const taskStore = useTaskStore();

const props = defineProps({
  tableStatus: Number,
  tableId: String,
  tableWasDeleted: Boolean,
});

const emit = defineEmits(["error"]);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const tasks = ref([]);

const countOfTasks = ref(0);

const showDeleteTasks = ref(false);

const showTaskView = ref(false);

const taskSelected = ref(null);

const user = ref(JSON.parse(localStorage.getItem("userInfo")));

const objectStatus = computed(() => {
  switch (props.tableStatus) {
    case 1:
      return {
        color: user.value.toDoColor,
        value: "ToDo",
        subtitle: "These tasks have not yet been done",
      };

    case 2:
      return {
        color: user.value.doingColor,
        value: "Doing",
        subtitle: "These tasks are currently being carried out",
      };

    default:
      return {
        color: user.value.doneColor,
        value: "Done",
        subtitle: "These tasks have already been completed",
      };
  }
});

const color = ref(objectStatus.value.color.toUpperCase());

function allowShowCreateTaskView() {
  taskSelected.value = null;
  showTaskView.value = true;
}

function allowShowTaskView(task) {
  showTaskView.value = true;
  taskSelected.value = task;
}

function getLastOrderOfTasks() {
  const lastOrder = tasks.value.length
    ? tasks.value[tasks.value.length - 1].order
    : 1;
  return lastOrder;
}

function closeDeleteTasksDialog() {
  showDeleteTasks.value = false;
}

async function handleChangeWithTasks() {
  showTaskView.value = false;
  await initializeView();
}

async function deleteTasks() {
  try {
    showDeleteTasks.value = false;

    const result = await taskStore.deleteTasksByStatusAndIdTable(
      props.tableStatus,
      props.tableId
    );

    if (result) {
      await initializeView();
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

async function getTasks() {
  tasks.value = [
    ...(await taskStore.getTasksByStatusAndIdTable(
      props.tableStatus,
      props.tableId
    )),
  ];
}

async function getCountOfTasks() {
  countOfTasks.value = await taskStore.getTasksCountByStatusAndIdTable(
    props.tableStatus,
    props.tableId
  );
}

async function updateOrderAndStatus(idTask, data) {
  try {
    await taskStore.updateTaskByIdAndIdTable(idTask, props.tableId, data);
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

function colorHasChanged() {
  return color.value !== objectStatus.value.color;
}

function colorToChangeByStatus() {
  switch (props.tableStatus) {
    case 1:
      return {
        toDoColor: color.value,
      };

    case 2:
      return {
        doingColor: color.value,
      };

    default:
      return {
        doneColor: color.value,
      };
  }
}

async function updateColor() {
  if (colorHasChanged()) {
    try {
      const result = await userStore.updateActualUser(colorToChangeByStatus());

      if (result) {
        await getActualUser();
        await initializeView();
      }
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}

async function getActualUser() {
  try {
    const result = await userStore.getActualUser();

    localStorage.setItem("userInfo", result);

    user.value = result;
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

async function initializeView() {
  await getTasks();

  await getCountOfTasks();
}

async function updateAllTasksStatusAndOrder(tasks) {
  tasks.forEach(async (task, index) => {
    await updateOrderAndStatus(task._id, {
      order: index + 1,
      status: props.tableStatus,
    });

    if (index === tasks.length - 1) {
      await initializeView();
    }
  });
}

async function checkChangeInOrderOfTasks(tasks) {
  const foundTask = tasks.find((task, index) => taskChangeOrder(task, index));
  if (foundTask && !props.tableWasDeleted) {
    await updateAllTasksStatusAndOrder(tasks);
  }
}

function taskChangeOrder(task, index) {
  return task.status === props.tableStatus && task.order !== index + 1;
}

async function checkChangeInStatusBetweenTasks(
  tasksWithOldStatus,
  tasksWithNewStatus
) {
  if (
    aTaskChangeStatus(tasksWithNewStatus, tasksWithOldStatus) &&
    !props.tableWasDeleted
  ) {
    await updateAllTasksStatusAndOrder(tasksWithNewStatus);
  }
}

function aTaskChangeStatus(tasksWithNewStatus, tasksWithOldStatus) {
  return tasksWithNewStatus.length > tasksWithOldStatus.length;
}

watch(props, async () => {
  await initializeView();
});

watch(tasks, async (newValue, oldValue) => {
  await checkChangeInOrderOfTasks(newValue);
  await checkChangeInStatusBetweenTasks(oldValue, newValue);
  await getCountOfTasks();
});

onBeforeMount(async () => {
  await initializeView();
});
</script>

<style scoped lang="scss">
.table-component {
  background-color: rgb(var(--v-theme-backgroundColor));
  color: rgb(var(--v-theme-text));

  height: 450px;
  width: 100%;
  padding: 10px;

  border-radius: 10px;
  border: 1px solid rgb(var(--v-theme-softAttention));

  gap: 5px;

  &-subtitle {
    font-weight: 300;
    padding: 0 3px;
  }

  &-status {
    width: 100%;
    padding-left: 3px;
    margin-bottom: 2px;

    font-size: 12px;
    font-family: $secondary-font;
    font-weight: 200;

    &-name {
      gap: 5px;
      &-count {
        font-size: 11px;
        font-weight: 500;
        color: rgb(var(--v-theme-softAttention)) !important;
        border: 1px solid rgb(var(--v-theme-softAttention)) !important;
      }
    }

    &-icon {
      font-size: 12px;
      cursor: pointer;
      color: rgb(var(--v-theme-attention));
    }

    &-icon:hover {
      color: rgb(var(--v-theme-softAttention));
    }
  }

  .add-item-button {
    width: 100%;
    padding: 10px;

    cursor: pointer;

    font-size: 15px;

    position: relative;
    bottom: 0;

    gap: 10px;

    background-color: rgb(var(--v-theme-attention));
    color: #ffffff;

    border-radius: 10px;
    &-icon {
      font-size: 15px;
    }
  }
  .add-item-button:hover::before {
    content: "";

    position: absolute;
    inset: 0;

    background-color: rgb(var(--v-theme-backgroundColor));
    opacity: 10%;

    border-radius: 10px;
  }

  &-tasks {
    width: 100%;
    height: 100%;
    max-height: 430px;
    overflow-y: scroll;

    background-color: rgb(var(--v-theme-backgroundColor));

    position: relative;

    gap: 10px;
  }

  &-tasks::-webkit-scrollbar {
    width: 2px;
  }

  &-tasks::-webkit-scrollbar-track {
    background: none;
  }

  &-tasks::-webkit-scrollbar-thumb {
    background-color: rgb(var(--v-theme-softAttention));

    border-radius: 20px;
  }

  &-tasks::-webkit-scrollbar-thumb:hover {
    background-color: rgb(var(--v-theme-attention));
  }
  .padding-for-scroll {
    padding-right: 7px;
  }
}
</style>
