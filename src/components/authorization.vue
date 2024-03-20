<template>
  <div class="authorization">
    <div class="authorization-container">
      <div class="wrappers">
        <div class="head">
          <span>Authorization Parameter Holiday</span>
        </div>
        <div class="body">
          <div class="table">
            <b-table
              :fields="tableProps.fields"
              :items="filteredItems"
              :per-page="tableProps.perPage"
              :current-page="tableProps.currentPage"
              fixed
            >
              <template v-slot:cell(detail)="data">
                <b-container fluid>
                  <b-row align-h="center">
                    <b-button
                      v-b-tooltip.hover
                      title="Update"
                      class="btn-mt circle"
                      style="background-color: black;"
                      @click="detail(data.item)"
                    >
                      <i class="jam jam-files-f"></i>
                    </b-button>
                  </b-row>
                </b-container>
              </template>
              <template v-slot:cell(status)="data">
                <span :class="getAuthTextColor(data.item.status)">
                  {{ getAuthTextKey(data.item.status) }}
                </span>
              </template>
            </b-table>
          </div>
        </div>
        <div class="footer">
          <b-pagination
            v-model="tableProps.currentPage"
            :per-page="tableProps.perPage"
            :total-rows="totalRows"
            class="page"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FunctionService from '@/tools/FunctionService';
import parameterListService from '@/service/parameterListService';
import moment from 'moment';
export default {
  data() {
    return {
      filter: {
        query: "",
        status: "P",
      },
      tableProps: {
        ...FunctionService.getDefaultPaginationProps(),
        items: [],
        currentPage: 1,
        perPage: 6,
        fields: [
          {
            key: "created",
            label: "Tanggal",
            sortable: false,
            formatter: (val) => moment(val).format("DD-MM-YYYY HH:mm:ss"),
          },
          {
            key: "activity",
            label: "Aktifitas",
            sortable: true,
          },
          {
            key: "description",
            label: "Deskripsi",
            sortable: true,
          },
          {
            key: "created_by",
            label: "Pemohon",
            sortable: true,
          },
          {
            key: "status",
            label: "Status",
            sortable: false,
          },
          {
            key: "detail",
            label: "Detail",
            thStyle: {
              width: "75px",
              textAlign: "center",
            },
          },
        ],
      },
    };
  },
  methods: {
    fetchData() {
      const params = {
        pageSize: 1000,
        page: 1,
        status: "P",
      };
      this.tableProps.items = [];
      parameterListService
        .holidayParameterAuthorization(params)
        .then((res) => {
          const items = res.data.data;
          this.tableProps.items = items.map((item) => {
            const authData =
              item.action_type == "I"
                ? FunctionService.parseJSONSafe(item.new_data)
                : FunctionService.parseJSONSafe(item.old_data);
            const safeAccess = (keys, obj) => {
              return keys
                .split(".")
                .reduce(
                  (acc, key) =>
                    acc && acc[key] !== undefined ? acc[key] : "",
                  obj
                );
            };
            return {
              ...item,
              activity: this.getActivityText(item.action_type),
              description: safeAccess("description", authData),
            };
          });
        })
        .finally(() => {
          this.tableProps.isBusy = false;
        });
    },
    getActivityText(actionType) {
      let action = "";
      switch (actionType) {
        case "I":
          action = "add";
          break;
        case "D":
          action = "delete";
          break;
        case "U":
          action = "edit";
          break;
      }
      const actionText = action;
      const activity = "Parameter Hari Libur";
      return `${actionText} ${activity}`;
    },
    getAuthTextKey(status) {
      return FunctionService.getAuthStatusTextKey(status);
    },
    getAuthTextColor(status) {
      return FunctionService.getAuthStatusTextColor(status);
    },
    detail(item) {
      FunctionService.SaveSessionCustom("dataAuthorization", item);
      this.toPage("/authorization/detail");
    },
    toPage(path) {
      return FunctionService.ToPage(path);
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    filteredItems() {
      return this.tableProps.items.filter(
        (item) =>
          FunctionService.hasSubstring(item.activity, this.filter.query) ||
          FunctionService.hasSubstring(item.description, this.filter.query) ||
          FunctionService.hasSubstring(item.created_by, this.filter.query)
      );
    },
    totalRows() {
      return this.tableProps.items.length;
    },
  },
};
</script>

<style>
@import "../assets/scss/pages.scss";
</style>
