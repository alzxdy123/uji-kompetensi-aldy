<template>
  <b-modal
    :id="modalId"
    @ok="handleOk"
    @close="handleClose"
    @cancel="handleCancel"
    @hidden="handleCancel"
    centered
    body-class="text-center"
    hide-header-close
  >
    <template #modal-header>
      <b-container fluid class="py-1">
        <b-row align-h="center">
          <i class="jam jam-alert-f text-danger" style="font-size: 40px" />
        </b-row>
      </b-container>
    </template>
    <div class="delete-modal__body">
      <p>Hapus Data</p>
    </div>
    <template #modal-footer>
      <b-container fluid>
        <b-row align-h="around">
          <b-col cols="auto">
            <button
              class="btn-mt secondary outlined"
              @click="handleCancel"
              :disabled="loading"
              style="border: 1px solid black; background-color: white; padding: 5px 20px 5px 20px;"
            >
              Tidak
            </button>
          </b-col>
          <b-col cols="auto">
            <button
              class="btn-mt danger"
              style="border: none; background-color: black; padding: 5px 20px 5px 20px; color: white;"
              @click="handleOk"
              :disabled="loading"
            >
              Ya
            </button>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-modal>
</template>

<script lang="ts">
export default {
  name: "DeleteModal",
  props: {
    modalId: {
      type: String,
      default: "delete-modal",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOk() {
      this.$emit("ok");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
