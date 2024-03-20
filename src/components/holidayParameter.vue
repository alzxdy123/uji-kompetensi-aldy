<template>
  <div class="container-holiday-parameter">
    <addParameterHoliday
      :parameter="selectedItem"
      :action-type="action"
      @handleShow="handleAddShow(false)"
      @closeShow="handleAddShow(false)"
      v-if="addShow"
    />
    <div class="holiday-parameter">
      <div class="wrappers">
        <div class="header">
          <span>Holiday Parameter</span>
          <div class="filter">
            <b-form-input
              v-model="filterQuery.name"
              placeholder="Cari"
              type="text"
              debounce="500"
            ></b-form-input>
            <b-form-select
              v-model="filterQuery.year"
              placeholder="Tahun"
              :options="pastThreeYears"
            ></b-form-select>
          </div>
          <button @click="handleAdd()">Tambah Data</button>
        </div>
        <div class="body">
          <div class="table">
            <b-table
              :busy="tableProps.isBusy"
              :items="tableProps.items"
              :fields="tableProps.fields"
              :current-page="tableProps.currentPage"
              :per-page="tableProps.perPage"
              fixed
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
                <div class="table-content" @click="handleEdit(data.item)">
                  <i class="jam jam-write"></i>
                </div>
              </template>
              <template #cell(delete)="data">
                <div class="table-content" @click="handleDelete(data.item)">
                  <i class="jam jam-trash-f"></i>
                </div>
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
    <DeleteModal
      @ok="handleConfirmDelete"
      @cancel="handleCancel('delete-modal')"
      @close="handleCancel('delete-modal')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import FunctionService from '../tools/FunctionService';
import parameterListService from '../service/parameterListService';
import moment from 'moment';
import { BvTableFieldArray } from "bootstrap-vue";
import { THolidayParameter } from "../models/masterData";
import addParameterHoliday from './common/formParameterHoliday.vue';
import DeleteModal from './common/DeleteModal.vue';

@Component({
  components: {
    addParameterHoliday,
    DeleteModal
  }
})
export default class ParameterHariLibur extends Vue {
  addShow: boolean = false;
  addTitle: string = "Tambah";
  filterQuery = {
    name: "",
    year: moment().format("YYYY"),
  };
  tableProps = {
    ...FunctionService.getDefaultPaginationProps(),
    items: [] as THolidayParameter[],
    perPage: 4,
    isBusy: false,
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
            label: "Keterangan",
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
  };
  selectedItem: THolidayParameter | undefined = undefined;
  action: string = "I";

  fetchData() {
    this.tableProps.isBusy = true;
    const query = {
      year: this.filterQuery.year,
      holiday_name: this.filterQuery.name,
    };
    this.tableProps.items = [];
    parameterListService.getListParameterHoliday(query)
      .then((res) => {
        this.tableProps.isBusy = false;
        if (FunctionService.ResultResponse(res)) {
          const items = res.data.data;
          console.log(items);
          this.tableProps.items = items;
        } else {
          this.$notify({
            text: FunctionService.SimpleLanguage(res.data.message) as string,
            title: "Error Request",
            type: "error",
            duration: 5000,
          });
        }
      })
      .catch((err) => {
        this.$notify({
          title: "Error Request",
          text: err,
          type: "error",
          duration: 5000,
        });
      });
  }

  handleAddShow(val: any) {
    this.addShow = val;
    this.addTitle = this.addShow ? "Tutup" : "Tambah";
  }

  handleDelete(item: any) {
    this.selectedItem = item;
    this.$nextTick(() => {
      this.$bvModal.show("delete-modal");
    });
  }

  handleCancel(modalId: string) {
    this.selectedItem = undefined;
    this.$nextTick(() => {
      this.$bvModal.hide(modalId);
    });
  }

  handleConfirmDelete() {
    this.tableProps.isBusy = true;
    const oldData = {
      parameterName: this.selectedItem!.parameterName,
      parameterType: this.selectedItem!.parameterType,
      parameterValue1: this.selectedItem!.parameterValue1,
      parameterValue2: this.selectedItem!.parameterValue2,
      description: this.selectedItem!.description,
    };

    const reqBody = {
      actionType: "D",
      createdBy: FunctionService.ReadSessionCustom("userID"),
      dataType: "PARAM_HOLIDAY",
      oldData: JSON.stringify(oldData),
    };

    parameterListService.postHolidayParameterAuthorizationRequest(reqBody)
      .then((res) => {
        this.tableProps.isBusy = false;
        if (FunctionService.ResultResponse(res)) {
          this.$notify({
            title: "Success",
            text: res.data.message,
            type: "success",
            duration: 5000,
          });
          this.$emit("close");
        } else {
          this.$notify({
            title: "Error",
            text: res.data.message,
            type: "error",
            duration: 5000,
          });
        }
      })
      .catch((err) => {
        this.$notify({
          title: "Error",
          text: err,
          type: "error",
          duration: 5000,
        });
      });
    this.$bvModal.hide("delete-modal");
  }

  handleEdit(item: THolidayParameter) {
    this.action = "U";
    this.selectedItem = { ...item };
    this.addShow = false;
    this.$nextTick(() => {
      this.handleAddShow(true);
    });
  }

  handleAdd() {
    this.action = "I";
    this.selectedItem = {
      description: "",
      parameterName: "holiday",
      parameterType: "holiday",
      parameterValue1: "",
      parameterValue2: "",
    };
    this.$nextTick(() => {
      this.handleAddShow(true);
    });
  }

  @Watch('filterQuery', { deep: true })
  onFilterQueryChanged(newVal: any, oldVal: any) {
    this.tableProps.currentPage = 1;
    this.fetchData();
  }

  mounted() {
    this.fetchData();
  }

  get pastThreeYears() {
    const currentYear = parseInt(moment().format("YYYY"));
    return [currentYear, currentYear - 1, currentYear - 2];
  }

  get totalRows() {
    return this.tableProps.items.length;
  }

  get showForm() {
    return this.action == "I" || this.action == "U";
  }
}
</script>
