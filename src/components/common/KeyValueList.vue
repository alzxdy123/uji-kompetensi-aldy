<template>
  <v-sheet v-if="keyValues">
    <b-row v-for="(val, key) in keyValues" :key="key" no-gutters class="mt-1">
      <b-col :cols="keySpan">
        <span class="text-secondary">
          {{ key }}
        </span>
      </b-col>
      <b-col :cols="valSpan">
        <div v-if="typeof val === 'object'">
          <span v-if="val.renderAs === 'rtf'" v-html="val.value"></span>
          <b-img v-if="val.renderAs === 'image'" fluid :src="val.value"></b-img>
          <a v-if="val.renderAs === 'link'" :href="val.href" target="_blank">{{
            val.value
          }}</a>
        </div>
        <span v-else :class="isDifferent(key) ? 'font-weight-bold' : ''">
          {{ val }}
        </span>
      </b-col>
    </b-row>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class KeyValueList extends Vue {
  @Prop(Object) keyValues!: Record<string, any>;
  @Prop({ type: [Number, String], default: 6 }) keySpan!: number | string;
  @Prop({ type: [Number, String], default: 6 }) valSpan!: number | string;
  @Prop({ type: Array, default: () => [] }) diffKeys!: string[];

  isDifferent(key: string): boolean {
    return this.diffKeys.includes(key);
  }
}
</script>
