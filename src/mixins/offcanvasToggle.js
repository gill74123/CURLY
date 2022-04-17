import { Offcanvas } from 'bootstrap'

export default {
  data () {
    return {
      offcanvas: ''
    }
  },
  methods: {
    showOffcanvas () {
      this.offcanvas.show()
    },
    closeOffcanvas () {
      this.offcanvas.hide()
    }
  },
  mounted () {
    this.offcanvas = new Offcanvas(this.$refs.cartOffcanvas)
  }
}
