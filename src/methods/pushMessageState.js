export default function (response, title, content) {
  if (response?.data?.success || response === true) {
    this.$emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else if (response === 'errMessage') {
    this.$emitter.emit('push-message', {
      style: 'danger',
      title: title
    })
  } else {
    this.$emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`
    })
  }
}
