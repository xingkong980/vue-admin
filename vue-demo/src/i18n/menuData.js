// id必须不能重复
export const Menu = [
  { name: '首页', path: '/index', id: 'index', roles: ['admin','super'] },
  {
    name: '培训报名',
    id: 'trainEnjoy',
    path: '/training',
    roles: ['admin'],
    children: [
      {
        name: '培训管理',
        id: 'trainManage',
        path: '/trainManagement',
        roles: ['admin'],
      },
      {
        name: '编辑培训管理',
        id: 'trainManageEdit',
        path: '/trainManagement/:id',
        roles: ['admin'],
        hiddren : true
      },
    ],
  },
  { name: '个人中心', id: 'personal', path: '/personal', roles: ['admin','super'] },
  { name: '设置密码', id: 'setting', path: '/setting', roles: ['admin','super'],hiddren : true },
];
