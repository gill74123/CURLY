import axios from 'axios'

class MyUploadAdapter {
  constructor (loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload () {
    // 將格式傳換成 formData
    const formData = new FormData()
    const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`
    return new Promise((resolve) => {
      this.loader.file
        .then(loadFile => {
          formData.append('file-to-upload', loadFile)
          // this._sendRequest(file)
          return axios.post(url, formData)
        })
        .then((res) => {
          console.log(res.data.imageUrl)
          resolve({
            default: res.data.imageUrl
          })
        })
        .catch((err) => {
          console.log(err.response)
        })
    })
  }

  // Aborts the upload process.
  abort () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Prepares the data and sends the request.
  _sendRequest (file) {
    // Prepare the form data.
    const data = new FormData()

    data.append('upload', file)

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data)
  }
}

export default MyUploadAdapter
