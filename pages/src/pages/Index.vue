<template>
  <q-page centered>
    <div class='q-ma-xl'>
      <q-card flat bordered class='my-card'>
        <q-card-section class='my-card-section'>
        <div class="row"> <h5 class='col-6 q-my-md float-left'>Add Page</h5>
        <q-toggle class="col-6 float-right publish-button" v-model="page.published"></q-toggle>
        </div>
        <div>
        <q-select
            :options='option'
            option-label='name'
            option-value='value'
            outlined
            dense
            label='Choose Template'
            v-model='page.page_type'
          ></q-select>
          <q-input label='Add title to the page' outlined dense v-model='page.page_title' class='q-my-md'></q-input>
          <q-input label='Page Url' outlined dense v-model='page.page_url' class='q-my-md'></q-input>
          <q-editor label='Type...' v-model='page.page_description'></q-editor></div>
        </q-card-section>
        <q-card-actions align='center'>
          <q-btn outline class='q-ma-sm' color='primary' @click='addPage'>Add Page</q-btn>
          <q-btn outline class='q-ma-sm' color='secondary' @click='resetSelect'>Cancel</q-btn>
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
      option: [
        { value: 'about', name: 'About Us' },
        { value: 'terms', name: 'Terms & Conditions' }
      ],
      page: {
        page_type: '',
        page_title: '',
        page_description: '',
        page_url: '',
        published: false
      },
      test: 'asha'
    }
  },
  methods: {
    resetSelect () {
      this.pageType = ''
    },
    async addPage () {
      this.page.page_type = this.page.page_type.value
      await this.$axios
        .post('/', this.page)
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>
<style lang='scss'>
.my-card {
  min-width: 350px;
  min-height: 200px
}
.publish-button{
  align-items: center;
  justify-content: flex-end;
}
</style>
