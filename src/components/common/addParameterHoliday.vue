<template>
  <div class="add-holiday-parameter">
    <b-form-group label="Tanggal Awal">
      <b-form-datepicker
        v-model="formData.parameterValue1"
        name="start-date"
        v-validate="formRules.startDate"
        data-vv-as="tanggal-awal"
        :state="validateState('start-date')"
        locale="id"
      >
      </b-form-datepicker>
      <b-form-invalid-feedback id="start-date-invalid-feedback">{{
                errors.first("start-date")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Tanggal Akhir">
      <b-form-datepicker
        v-model="formData.parameterValue2"
        name="end-date"
        v-validate="formRules.endDate"
        data-vv-as="tanggal-akhir"
        :state="validateState('end-date')"
        :disabled="!formData.parameterValue1"
        :min="formData.parameterValue1"
        locale="id"
      >
      </b-form-datepicker>
      <b-form-invalid-feedback id="end-date-invalid-feedback">{{
                errors.first("end-date")
      }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="description">
      <b-form-input
        name="description"
        v-model="formData.description"
        v-validate="formRules.description"
        data-vv-as="description"
        :state="validateState('description')"
      ></b-form-input>
      <b-form-invalid-feedback id="description-invalid-feedback">{{
                errors.first("description")
      }}</b-form-invalid-feedback>
    </b-form-group>
    <button @click="handleSave()">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBusy: false,
      formData: { ...this.parameter },
      oldData: { ...this.parameter },
      formRules: {
        startDate: {
          required: true,
        },
        endDate: {
          required: true,
        },
        description: {
          required: true,
        },
      },
    };
  },
  props: {
    parameter: {
      type: Object,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
      default: () => "I",
    },
  },
  methods: {
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref);
      }
      return null;
    },
    handleSave() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }

        // window.console.log(this.formData)

        const isUpdate = this.$props.actionType == "U";

        const oldData = isUpdate
          ? {
              parameterName: this.oldData.parameterName,
              parameterValue1: this.oldData.parameterValue1,
              parameterValue2: this.oldData.parameterValue2,
              description: this.oldData.description,
            }
          : undefined;

        const newData = {
          parameterName: this.formData.parameterName,
          parameterType: this.formData.parameterType,
          parameterValue1: this.formData.parameterValue1,
          parameterValue2: this.formData.parameterValue2,
          description: this.formData.description,
        };

        const reqBody = {
          actionType: this.actionType,
          createdBy: this.$store.getters["auth/loggedUser"].username,
          dataType: "PARAM_HOLIDAY",
          id: isUpdate ? this.oldData.id : undefined,
          oldData: isUpdate ? JSON.stringify(oldData) : undefined,
          newData: JSON.stringify(newData),
        };
      })
    }
  },
  watch: {
    parameter: function (newVal, oldVal) {
      console.log("prop changed", newVal);
      this.formData = {
        parameterName: newVal.parameterName,
        parameterType: newVal.parameterType,
        parameterValue1: newVal.parameterValue1,
        parameterValue2: newVal.parameterValue2,
        description: newVal.description,
      };
      this.oldData = {
        ...newVal,
      };
    },
    "formData.parameterValue1": function () {
      this.formData.parameterValue2 = "";
    },
  },
}
</script>

<style scoped>
@import "../../assets/scss/pages.scss"
</style>
