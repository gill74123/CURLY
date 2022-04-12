export default function (response, title) {
  if (response.data.success) {
    this.$emitter.emit('push-message', {
      style: 'primary',
      title: `${title}成功`
    })
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    // const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message
    this.$emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`
      // content: message.join('、')
    })
  }
}
