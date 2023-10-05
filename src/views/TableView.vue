<template>
  <section class="table-section d-flex justify-center flex-column">
    <InputComponent
      v-if="showEditTableTitle"
      v-model="tableForm.tableName"
      input-variant="solo"
      input-label="Table name"
      input-placeholder="Press enter to update table"
      :input-rules="[rules.required]"
      :input-autofocus="true"
      @keyup.enter="editTable()"
      v-on-click-outside="closeEditTableName"
    />
    <p class="table-section-title d-flex align-center" v-else>
      {{ currentTable.tableName }}
      <v-icon
        class="table-section-title-icon"
        icon="fa-solid fa-pen"
        @click="showEditTableTitle = true"
      ></v-icon>
      <v-icon
        class="table-section-title-icon"
        icon="fa-solid fa-trash-can"
        @click="showDeleteTable = true"
      ></v-icon>
    </p>
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
    <div class="table-section-table-container">
      <TableComponent
        :table-status="1"
        :table-id="currentTable._id"
        @error="setError(value)"
        :table-was-deleted="tableWasDeleted"
      />
      <TableComponent
        :table-status="2"
        :table-id="currentTable._id"
        @error="setError(value)"
        :table-was-deleted="tableWasDeleted"
      />
      <TableComponent
        :table-status="3"
        :table-id="currentTable._id"
        @error="setError(value)"
        :table-was-deleted="tableWasDeleted"
      />
    </div>
    <DialogComponent
      v-model="showDeleteTable"
      dialog-title="Confirm delete"
      :dialog-text="`Are you sure you want to delete this table? All tasks will be deleted.`"
      :dialog-no-button-action="closeDeleteTableDialog"
      :dialog-yes-button-action="deleteTable"
    />
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTableStore } from "@/stores/tableStore";
import { vOnClickOutside } from "@vueuse/components";
import rules from "../utils/rules";
import TableComponent from "@/components/TableComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

const tableStore = useTableStore();

const props = defineProps({
  actualTable: Object,
  otherComponentError: Object,
});

const currentTable = ref({ ...props.actualTable });

const emit = defineEmits(["tableDeleted", "tableUpdated"]);

const error = ref({ ...props.otherComponentError });

const showDeleteTable = ref(false);

const showEditTableTitle = ref(false);

const tableForm = ref({
  tableName: currentTable.value.tableName,
});

const tableWasDeleted = ref(false);

function closeEditTableName() {
  showEditTableTitle.value = false;
}

function setError(value) {
  error.value = { ...value };
}

function closeDeleteTableDialog() {
  showDeleteTable.value = false;
}

function tableTitleIsEmpty() {
  return tableForm.value.tableName === "";
}

async function editTable() {
  try {
    if (!tableTitleIsEmpty()) {
      closeEditTableName();

      const result = await tableStore.updateTableById(
        currentTable.value._id,
        tableForm.value
      );

      if (result) {
        emit("tableUpdated");

        currentTable.value.tableName = tableForm.value.tableName;
      }
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

async function deleteTable() {
  try {
    closeDeleteTableDialog();

    const result = await tableStore.deleteTableById(currentTable.value._id);

    if (result) {
      tableWasDeleted.value = true
      emit("tableDeleted");
      tableWasDeleted.value = false
    }
  } catch (err) {
    error.value.hasError = true;

    error.value.errorMessage = err.response.data.resource.message;
  }
}

function initializeView() {
  currentTable.value = { ...props.actualTable };
  tableForm.value.tableName = currentTable.value.tableName;
}

watch(props, () => {
  initializeView();
});
</script>

<style scoped lang="scss">
.table-section {
  width: calc(100% - 56px);
  max-width: calc(100% - 56px);
  min-height: 100vh;
  padding: 25px 40px 70px 40px;

  color: rgb(var(--v-theme-text));

  gap: 15px;

  &-table-container {
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100%;
    gap: 20px;

    z-index: 1;
  }

  &-title {
    font-size: 30px;
    font-family: $primary-font;

    z-index: 1;

    gap: 10px;
    &-icon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
