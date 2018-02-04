let accessControlList = this.$store.state.permission.accessControlList
let getAccessRightDefinition (resourcePath, accessControlList) => {
  let accessRightDefinition = Object.get(resourcePath, accessControlList)
}
let applyAccessRight = ({accessRights, customCallback}) => {
  return (el) => {
    if (accessRights.customCallback) {
      accessRights.customCallback.apply(null, [{accessRights: accessRights, el}] )  // 回调回到业务层自己处理
    } else {
      if (accessRights.visible === false) { // 留位置但不显示
        $(el).style.visibility = 'hidden'
      }
      if (accessRights.display === false) { // 不显示不留位置示
        $(el).style.display = 'none'
      }
      if (accessRights.disableRightClick === false) { // 禁止右键点击
        $(el).onRightClick = null
      }
    }
  }
}
let accessController = {
  accessControlList,
  init ({el, attribute, value, modifiers}) => {
    let accessRights 
    if (attribute === 'accessControl') {
      accessRights = this.fetchAccessControlList(value.resourcePath)
      this.applyAccessRight({accessRights, value.customCallback})(el)
    }
  } 
  applyAccessRight,
  getAccessRightDefinition,
  fetchAccessControlList: async (resourcePath) => {
    let accessControlList = await permissionStore.dispatch('permission/GET', {
      data: {
        resourcePath
      }
    })
    let accessRights = this.getAccessRightDefinition(resourcePath,accessControlList)
    return accessRights
  }
}
/*@description 
 * **/
export default {
  bind: function (el, binding, vnode) {
    accessController.init({
      attribute: binding.argument,
      value: binding.value,
      modifiers: binding.modifiers,
      el
    }) 
  }
}
