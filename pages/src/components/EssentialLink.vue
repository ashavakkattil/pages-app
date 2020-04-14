<template>
  <div>
    <div >
      <q-item v-for='page in pages' :key='page._id' @click.stop='openPage(page.page_url)' clickable>
        <q-item-section avatar>
          <q-icon name='mdi-library-books' />
        </q-item-section>
        <q-item-section>
          <q-item-label class='text-capitalize'>{{ page.page_title }}</q-item-label>
        </q-item-section>
        <q-item-section side >
          <q-btn icon="edit" color="primary" size="xs" flat @click.stop="editItem(page)"></q-btn>
        </q-item-section>
        <q-item-section side>
           <q-btn icon="delete" color="primary" size="xs" flat @click.stop="deleteItem(page)"></q-btn>
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
      pages: '',
      add: true
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
    },
    editItem (item) {
      this.$router.push('pages/edit/' + item._id)
    },
    async deleteItem (item) {
      const response = await this.$axios.delete('/' + item._id).catch(error => {
        this.$q.notify({
          message: error.message,
          color: 'negative'
        })
      })
      if (response) {
        this.$q.notify({
          message: response.data.message,
          color: 'positive'
        })
      }
    }
  }
}
</script>
