<template>
  <q-page centered>
    <div class='q-ma-xl'>
      <q-card flat bordered class='my-card'>
        <q-card-section class='my-card-section'>
          <div class='row'>
            <h5 class='col-6 q-my-md float-left'>Add Page</h5>
            <q-toggle class='col-6 float-right publish-button' v-model='page.published'>Publish Page</q-toggle>
          </div>
          <div>
            <q-select
              :options='option'
              option-label='name'
              option-value='value'
              outlined
              dense
              label='Choose Page Type'
              v-model='page.page_type'
            ></q-select>
            <q-input
              label='Add title to the page'
              outlined
              dense
              v-model='page.page_title'
              class='q-my-md'
            ></q-input>
            <q-input label='Page Url' outlined dense v-model='page.page_url' class='q-my-md'></q-input>
            <q-editor placeholder='Type...' v-model='page_description' :toolbar='toolbar'></q-editor>
          </div>
        </q-card-section>
        <q-card-actions align='center'>
          <q-btn outline class='q-ma-sm' color='primary' @click='addPage'>Add Page</q-btn>
          <q-btn outline class='q-ma-sm' color='secondary' @click='resetSelect'>Reset</q-btn>
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
      page_description: '',
      page: {
        page_type: '',
        page_title: '',
        page_description: '',
        page_url: '',
        published: false
      },
      toolbar: [
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        ['removeFormat'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]
    }
  },
  methods: {
    resetSelect () {
      this.page_description = ' '
      this.page.page_type = ''
      this.page.page_title = ''
      this.page.page_url = ''
      this.page.published = false
    },
    async addPage () {
      this.page.page_description = this.page_description
      this.page.page_type = this.page.page_type.value
      await this.$axios
        .post('/', this.page)
        .then(response => {
          if (response) {
            this.$q.notify({
              message: 'Created page successfully',
              color: 'primary'
            })
          }
        })
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
.publish-button {
  align-items: center;
  justify-content: flex-end
}
</style>
