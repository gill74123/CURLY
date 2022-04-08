import Collapse from 'bootstrap/js/dist/collapse'

export default {
  data () {
    return {
      collapse: ''
    }
  },
  methods: {
    toggleCollapse () {
      this.collapse.toggle()
    },
    closeCollapse () {
      this.collapse.hide()
    }
  },
  mounted () {
    this.collapse = new Collapse(this.$refs.collapse, { toggle: false })
  }
}
