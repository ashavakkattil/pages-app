<template>
  <q-page centered>
    <div class="q-ma-xl">
      <q-card flat bordered class="my-card">
        <q-card-section class="my-card-section">
        <h5 class="q-my-md">Add Page</h5>
          <q-select
            :options="option"
            option-label="name"
            option-value="value"
            outlined
            dense
            label="Choose Template"
            v-model="pageType"
          ></q-select>
           <q-input label='Add title to the page' outlined dense v-model='pageTitle' class='q-my-md'></q-input>
           <q-input label="Page Url" outlined dense v-model="pageUrl" class="q-my-md"></q-input>
          <q-editor label='Type...' v-model='pageDescription'></q-editor>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn outline class="q-ma-sm" color="primary" @click="addPage">Add Page</q-btn>
          <q-btn outline class="q-ma-sm" color="secondary" @click="resetSelect">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      option: [{ value: 1, name: 'About Us' }, { value: 2, name: 'Terms & Conditions' }],
      pageType: '',
      pageTitle: '',
      pageUrl: '',
      pageDescription: ''
    }
  },
  methods: {
    resetSelect () {
      this.pageType = ''
    },
    addPage () {
      if (this.pageType.value === 1) {
        console.log(this.pageType)
      }
      if (this.pageType.value === 2) {
        console.log(this.pageType)
      }
    }
  }
}
</script>
<style lang="scss">
.my-card {
  min-width: 350px;
  min-height: 200px;
}
</style>
