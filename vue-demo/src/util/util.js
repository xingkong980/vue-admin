// 用权限过滤菜单,要定义的一个问题是，如果菜单的角色数组为空，到底是给过还是不给过，不给过

function hasPermission(v, roles) {
  let permission = false;
  roles.forEach((element) => {
    if (v.roles.indexOf(element) != -1) {
      permission = true
    }
  });
  return permission
}

export function roleFilter(menu, roles) {
  if (menu && menu.length > 0 && roles) {
    menu = menu.filter((v) => {
      if (hasPermission(v, roles)) {
          if(v.children&&v.children.length>0){
            v.children = v.children.filter(t=>{
                if(hasPermission(t, roles)){
                    return t
                }
                return false
            })
          }
        return v
      }
      return false
    });
  }
  return menu
}
