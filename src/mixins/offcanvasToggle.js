import { Offcanvas } from 'bootstrap'

export default {
  data () {
    return {
      offcanvas: ''
    }
  },
  methods: {
    toggleOffcanvas () {
      this.offcanvas.toggle()
    },
    closeOffcanvas () {
      this.offcanvas.hide()
    }
  },
  mounted () {
    this.offcanvas = new Offcanvas(this.$refs.cartOffcanvas)
  }
}
