<template>
  <div>
    <div class="tambah-data-container">
      <div class="tambah-data-head">
        <span>{{ modalTitle }}</span>
        <div class="button-wrapper">
          <button
            class="reset-button"
            v-if="actionType === 'I'"
            @click="handleReset()"
          >
            Reset
          </button>
          <button class="add-button" @click="handleSave()">
            {{ buttonTitle }}
          </button>
          <i
            class="jam jam-close"
            style="font-size: 30px; cursor: pointer;"
            @click="handleShow()"
          ></i>
        </div>
      </div>
      <div class="tambah-data-body">
        <div class="add-holiday-parameter">
          <b-form-group label="Tanggal Awal" class="holiday-input">
            <b-form-datepicker
              v-model="formData.parameterValue1"
              name="start-date"
              v-validate="formRules.startDate"
              data-vv-as="Tanggal Awal"
              :state="validateState('start-date')"
              locale="id"
            >
            </b-form-datepicker>
            <b-form-invalid-feedback id="start-date-invalid-feedback">{{
                errors.first("start-date")
            }}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="Tanggal Akhir" class="holiday-input">
            <b-form-datepicker
              v-model="formData.parameterValue2"
              name="end-date"
              v-validate="formRules.endDate"
              data-vv-as="Tanggal Akhir"
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

          <b-form-group label="description" class="holiday-desc">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FunctionService from '@/tools/FunctionService';
import parameterListService from '@/service/parameterListService';
export default {
  data() {
    return {
      isBusy: false,
      formSubmitted: false,
      title: "",
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
      if (this.formSubmitted) {
        if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
          return !this.errors.has(ref);
        }
        return null;
      }
      return null;
    },

    handleSave() {
      this.formSubmitted = true;
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
          createdBy: FunctionService.ReadSessionCustom("userID"),
          dataType: "PARAM_HOLIDAY",
          // displayName: "",
          // branch: "000",
          id: isUpdate ? this.oldData.id : undefined,
          oldData: isUpdate ? JSON.stringify(oldData) : undefined,
          newData: JSON.stringify(newData),
        };

        parameterListService
          .postHolidayParameterAuthorizationRequest(reqBody)
          .then((res) => {
            if (FunctionService.ResultResponse(res)) {
              this.$emit('handleShow');
              this.$nextTick(() => {
                this.handleReset();
              });
              this.$notify({
                title: "Add Request Success",
                text: res.data.message,
                type: "success",
                duration: 5000,
              });
            } else {
              this.$notify({
                title: "Add Request Error",
                text: res.data.message,
                type: "error",
                duration: 5000,
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "Add Request Error",
              text: err,
              type: "error",
              duration: 5000,
            });
          });
      })
    },

    handleReset() {
      this.formData = {
        parameterName: this.oldData.parameterName,
        parameterType: this.oldData.parameterType,
        parameterValue1: this.oldData.parameterValue1,
        parameterValue2: this.oldData.parameterValue2,
        description: this.oldData.description,
      };

      this.$validator.reset();
    },

    handleShow() {
      this.$emit('closeShow', false);
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

  computed: {
    modalTitle() {
      return (
        this.actionType === "I" ? "Tambah Data" : "Edit Data"
      );
    },
    buttonTitle() {
      return (
        this.actionType === "I" ? "Tambahkan" : "Simpan"
      );
    },

  },
}
</script>

<style scoped>
@import "../../assets/scss/pages.scss"
</style>
