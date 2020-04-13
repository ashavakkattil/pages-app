<template>
  <div>
    <div >
      <q-item v-for='page in pages' :key='page._id' @click='openPage(page.page_url)' clickable>
        <q-item-section avatar v-if='page.published'>
          <q-icon name='mdi-library-books' />
        </q-item-section>
        <q-item-section v-if='page.published'>
          <q-item-label class='text-capitalize'>{{ page.page_title }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  data () {
    return {
      pages: ''
    }
  },
  mounted () {
    this.getPages()
  },
  methods: {
    async getPages () {
      const response = await this.$axios.get('/').catch(error => {
        console.log('Error', error)
      })
      if (response) {
        this.pages = response.data.data
      }
    },
    openPage (pageUrl) {
      this.$router.push('pages/' + pageUrl)
    }
  }
}
</script>
