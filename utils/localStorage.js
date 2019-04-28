const getLocalStore = name => {
  wx.getStorage({
    key: name,
    success(res) {
      return res.data
    }
  })
}
const setLocalStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  wx.setStorage({
    key: name,
    data: content
  })
}

const removeStore = name => {
  wx.removeStorage({
    key: 'key',
    success(res) {
      return res.data
    }
  })
}


module.exports = {
  getLocalStore: getLocalStore,
  setLocalStore: setLocalStore,
  removeStore: removeStore
}
