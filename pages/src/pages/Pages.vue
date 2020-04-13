<template>
  <q-page centered>
  <div class="q-ma-xl">
  <h5 class="text-capitalize">{{page.page_title}}</h5>
  <div v-html="page.page_description"></div>
  </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      pageId: '',
      page: ''
    }
  },
  mounted () {
    this.pageId = this.$route.params.id
    this.getPage(this.pageId)
  },
  methods: {
    async getPage (pageId) {
      const response = await this.$axios.get('/' + pageId).catch(error => {
        console.log('error', error)
      })
      if (response) {
        this.page = response.data.data
        console.log(this.page)
        this.$q.notify({
          message: response.data.message,
          color: 'primary'
        })
      }
    }
  }
}
</script>
