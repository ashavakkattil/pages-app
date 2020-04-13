<template>
  <q-page centered v-if="page">
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
    this.pageUrl = this.$route.params.page_url
    this.getPage(this.pageUrl)
  },
  methods: {
    async getPage (pageUrl) {
      const response = await this.$axios.get('/' + pageUrl).catch(error => {
        console.log('error', error)
      })
      if (response) {
        this.page = response.data.data
        this.$q.notify({
          message: response.data.message,
          color: 'primary'
        })
      }
    }
  }
}
</script>
