<template>
  <q-page centered>
    <div class='q-ma-xl'>
      <editor />
    </div>
  </q-page>
</template>

<script>
import Editor from '../components/Editor'
export default {
  name: 'PageIndex',
  components: {
    Editor
  },
  data () {
    return {
    }
  }
}
</script>
