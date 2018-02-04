let getAccessRightDefinition (resourcePath) => {
  let accessRightDefinition = Object.get(resourcePath, accessRightState)
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
let accessController = ({el, attribute, value, modifiers}) => {
  let accessRights 
  if (attribute === 'accessControl') {
    accessRights = getAccessRightDefinition(value.resourcePath)
    applyAccessRight({accessRights, value.customCallback})(el)
  } 
}
/*@description 
 * **/
export default {
  bind: function (el, binding, vnode) {
    accessController({
      attribute: binding.argument,
      value: binding.value,
      modifiers: binding.modifiers,
      el
    }); 
  })
}
}
