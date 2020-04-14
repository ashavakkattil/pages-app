<template>
  <div>
    <q-card flat bordered class='my-card'>
      <q-card-section class='my-card-section'>
        <div class='row'>
          <h5 class='col-6 q-my-md float-left' v-if='add'>Add Page</h5>
          <h5 class='col-6 q-my-md float-left' v-else>Edit Page</h5>
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
          <q-editor
            placeholder='Type...'
            v-model='page.page_description'
            :dense='$q.screen.lt.md'
            :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
            :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
          />
        </div>
      </q-card-section>
      <q-card-actions align='center'>
        <q-btn outline class='q-ma-sm' color='primary' @click='savePage'>Save Page</q-btn>
        <q-btn outline class='q-ma-sm' color='secondary' @click='resetSelect'>Reset</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'Editor',
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
      pageId: '',
      add: true
    }
  },
  mounted () {
    this.pageId = this.$route.params.id
    if (this.pageId) {
      this.add = false
      this.getPage(this.pageId)
    }
  },
  methods: {
    resetSelect () {
      this.page.page_description = ' '
      this.page.page_type = ''
      this.page.page_title = ''
      this.page.page_url = ''
      this.page.published = false
    },
    async savePage () {
      this.page.page_type = this.page.page_type.value
      if (this.add) {
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
      } else {
        await this.$axios
          .put('/' + this.pageId, this.page)
          .then(response => {
            if (response) {
              this.$q.notify({
                message: response.data.message,
                color: 'positive'
              })
            } else {
              this.$q.notify({
                message: response.error.message,
                color: 'negative'
              })
            }
          })
          .catch(error => {
            this.$q.notify({
              message: error.message,
              color: 'negative'
            })
          })
      }
    },
    async getPage (id) {
      const response = await this.$axios.get('/page/' + id).catch(error => {
        this.$q.notify({
          message: error.message,
          color: 'negative'
        })
      })
      if (response) {
        this.page = Object.assign({}, response.data.data)
        this.$q.notify({
          message: response.data.message,
          color: 'positive'
        })
      }
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
