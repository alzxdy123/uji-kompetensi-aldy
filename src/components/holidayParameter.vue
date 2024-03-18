<template>
  <div class="container-holiday-parameter">
    <div class="holiday-parameter">
      <div class="wrappers">
        <div class="header">Holiday Parameter</div>
        <div class="body">
          <div class="table">
            <b-table
              :fields="tableProps.fields"
              :items="tableProps.items"
              :current-page="currentPage"
              :per-page="perPage"
              :busy="isBusy"
            >
              <template v-slot:table-busy>
                <div
                  id="holidayParameterId"
                  class="text-center my-2 loading-table"
                >
                  <div class="loading-color">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>{{ tableProps.errorMessage }}</strong>
                  </div>
                </div>
              </template>
              <template #cell(edit)="data">
                <div class="table-content">
                  <i class="jam jam-write" @click="Edit(data.item)"></i>
                </div>
              </template>
              <template #cell(delete)="data">
                <div class="table-content">
                  <i class="jam jam-trash-f" @click="Delete(data.item)"></i>
                </div>
              </template>
            </b-table>
          </div>
        </div>
        <div class="footer">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="page"
          ></b-pagination>
        </div>
      </div>
    </div>
    <div class="tambah-data-container">
      <div class="tambah-data-head">
        <span>Tambah Data</span>
        <button @click="handleAdd()">{{ addTittle }}</button>
      </div>
      <div class="tambah-data-body" v-if="addShow">
        <addParameterHolidayVue
          :parameter="selectedItem"
          :action-type="action"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FunctionService from '@/tools/FunctionService';
import parameterService from '@/service/parameterService';
import addParameterHolidayVue from './common/addParameterHoliday.vue';
import { THolidayParameter } from '@/models/masterData';
import { BvTableFieldArray } from "bootstrap-vue";
import moment from "moment";
export default {
  components: {
    addParameterHolidayVue
  },
  data() {
    return {
      isBusy: false,
      addShow: false,
      addTittle: "Tambah",
      tableProps: {
        ...FunctionService.getDefaultPaginationProps(),
        items: [] as THolidayParameter[],
        fields: [
          {
            key: "parameterValue1",
            label: "Tanggal",
            sortable: true,
            formatter: (val, key, item) => {
              return `${moment(item.parameterValue1, "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              )}${
                item.parameterValue1 !== item.parameterValue2
                  ? ` s.d. ${moment(item.parameterValue2, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )}`
                  : ""
              }`;
            },
          },
          {
            key: "description",
            label: "Description",
            sortable: true,
          },
          {
            key: "edit",
            label: "Edit",
            thStyle: {
              width: "75px",
              textAlign: "center",
            },
          },
          {
            key: "delete",
            label: "Hapus",
            thStyle: {
              width: "75px",
              textAlign: "center",
            },
          },
        ] as BvTableFieldArray,
      },
      year: "2024",
      filterQuery: {
        name: "",
        year: moment().format("YYYY"),
      },
      currentPage: 1,
      perPage: 5,
      action: "I",
      selectedItem: undefined as THolidayParameter | undefined,
    }
  },
  methods: {
  fetchData() {
      this.isBusy = true
      parameterService.getListParameterHoliday(this.year)
      .then((result) => {
        this.tableProps.items = result.data.data
        this.isBusy = false
      })
    },

    Edit(data: any) {
      console.log("edit", data)
    },

    Delete(data: any) {
      console.log("delete", data)
    },
    // handleAddButton() {
    //   this.addShow = !this.addShow
    //   if (!this.addShow) {
    //     this.addTittle = "Tambah"
    //   } else {
    //     this.addTittle = "Tutup"
    //   }
    // },
    handleAdd() {
      this.action = "I";
      if (!this.addShow) {
        this.addTittle = "Tambah"
      } else {
        this.addTittle = "Tutup"
      }
      this.selectedItem = {
        description: "",
        parameterName: "holiday",
        parameterType: "holiday",
        parameterValue1: "",
        parameterValue2: "",
      };
      this.$nextTick(() => {
        this.addShow = !this.addShow
      });
    },
  },
  mounted() {
    this.fetchData()
  },
  computed: {
    totalRows() {
      return this.tableProps.items.length;
    },
  }
}
</script>

<style>
@import "../assets/scss/pages.scss";
</style>
