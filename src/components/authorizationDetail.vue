<template>
  <div class="authorization">
    <div class="authorization-container">
      <div class="wrappers">
        <b-row>
          <b-col v-if="showOldData">
            <span class="font-weight-bold"> Data Lama </span>
            <b-container fluid class="mt-2">
              <key-value-list
                :keyValues="getKeyValues(authorizeData.oldData)"
                :keySpan="showNewData ? 6 : 3"
              />
            </b-container>
          </b-col>
          <b-col v-if="showNewData">
            <span class="font-weight-bold"> Data Baru </span>
            <b-container fluid class="mt-2">
              <key-value-list
                :keyValues="getKeyValues(authorizeData.newData)"
                :keySpan="showOldData ? 6 : 3"
                :diff-keys="diffKeys"
              />
            </b-container>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import FunctionService from '@/tools/FunctionService';
import parameterListService from '@/service/parameterListService';
import KeyValueList from './common/KeyValueList.vue';

export default {
  name: "AuthorizationChangeParameterHolidayDetail",
  components:{KeyValueList},
  data() {
    return {
      authorizeData: null,
      loading: false,
      isBusySubmit: false,
    };
  },

  methods: {
    readData() {
      const data = FunctionService.ReadSessionCustom("dataAuthorization");
      if (!data) this.back();

      this.authorizeData = {
        authId: data.id,
        actionType: data.action_type,
        status: data.status,
        newData: FunctionService.parseJSONSafe(data.new_data),
        oldData: FunctionService.parseJSONSafe(data.old_data),
      };
    },

    getDateString(startDate, endDate) {
      if (startDate == endDate) {
        return `${startDate}`;
      } else {
        return `${startDate} s.d. ${endDate}`;
      }
    },

    authorize(action) {
      this.loading = true;
      const reqBody = {
        authId: this.authorizeData.authId,
        status: action,
        // dataType: this.authorizeData.dataType,
        updatedBy: FunctionService.ReadSessionCustom("userID"),
      };

      parameterListService
        .putHolidayParameterAuthorizationApproval(reqBody)
        .then((res) => {
          if (FunctionService.ResultResponse(res)) {
            this.$notify({
              title: "Success",
              text: res.data.message,
              type: "success",
              duration: 5000,
            });
            this.back();
          } else {
            this.$notify({
              title: "Error",
              text: res.data.message,
              type: "error",
              duration: 5000,
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    back() {
      return FunctionService.ToPage(
        "/authorization/parameter-change-authorization/holiday"
      );
    },

    handleCancel(modalId) {
      this.$bvModal.hide(modalId);
    },

    getKeyValues(data) {
      if (!data) return {};

      return {
        description: data.description,
        tanggal: this.getDateString(data.parameterValue1, data.parameterValue2),
      };
    },
  },

  computed: {
    isPending() {
      return this.authorizeData && this.authorizeData.status === "P";
    },

    showOldData() {
      return (
        this.authorizeData &&
        (this.authorizeData.actionType === "D" ||
          this.authorizeData.actionType === "U")
      );
    },

    showNewData() {
      return (
        this.authorizeData &&
        (this.authorizeData.actionType === "I" ||
          this.authorizeData.actionType === "U")
      );
    },

    isUpdateRequest() {
      return this.authorizeData && this.authorizeData.actionType === "U";
    },

    diffKeys() {
      if (!this.authorizeData || !this.showOldData) return [];
      return FunctionService.getDiffKeys(
        this.getKeyValues(this.authorizeData.oldData),
        this.getKeyValues(this.authorizeData.newData)
      );
    },
  },

  mounted() {
    this.readData();
  },
}
</script>

<style>
@import "../assets/scss/pages.scss"
</style>
