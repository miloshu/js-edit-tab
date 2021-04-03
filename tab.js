let that;
class Tab {
  constructor(id) {
    that = this // 构造函数的this实力对象
    this.container = document.querySelector(id)
    this.tabBtn = document.querySelector('add-tab-btn')
    // li 的父元素
    this.oUl = this.container.querySelector('.tab-box ul:first-child')
    // section的父元素
    this.sectionBox = this.container.querySelector('.section-box')
    this.init()
  }
  init() {
    this.updateAllNode()
    // 初始化操作让相关元素绑定事件
    this.tabBtn.onClick = this.addTab
    Array.from(this.lis).forEach((item, index) => {
      this.lis[index].index = index
      item.onClick = this.toggleTab
      this.closeIcon[index].onClick = this.removeTab
    })
  }
  // 动态添加元素, 需要重新获取对应的元素
  updateAllNode() {
    this.lis = this.container.querySelectorAll('li')
    this.closeIcon = this.container.querySelectorAll('.close-icon')
    this.sections = this.container.querySelectorAll('section')
  }
  // 切换功能
  toggleTab() {
    that.clearClassName()
    this.className = 'li-active'
    that.sections[this.index].className = 'content-active'
  }
  // 添加tab
  addTab() {
    that.clearClassName()
    // 1. 创建li元素和section元素
    const li = '<li class="li-active"><span>新选项卡</span> <i class="iconfont"></i></li>'
    const section = '<section class="content-active">内容1</section>'
    that.oUl.insertAdjacentHTML('beforeend', li)
    that.sectionBox.insertAdjacentHTML('beforeend', section)
    that.init() // 更新后来新增的元素
  }
  // 移除tab
  removeTab(e) {
    e.stopPropagation()
    let index = this.parentNode.index
    that.lis[index].remove()
    that.sections[index].remove()
    that.init() // 重新更新元素
    if (document.querySelector('li-active')) return
    index--
    // 当删除了选中状态的li, 让它前一个li处于选中状态
    that.lis[index] && that.lis[index].click()
  }
  // 编辑tab
  editTab() {

  }
  clearClassName() {
    Array.from(this.lis).forEach((item, index) => {
      item.className = ''
      this.sections[index].className = ''
    })
  }

}
new Tab('#tab')


// 原型: 是一个对象; 主要作用: 共享方法
// Tab.prototype.toggleTab = function () {

// }
// const tab1 = new Tab('#tab')

// const tab2 = new Tab('#main')

// tab1, tab2实例对象
// tab2.toggleTab()
// tab1.toggleTab()
// tab1.toggleTab === tab2.toggleTab true
// 每一个对象都有一个__proto__ 属性, 它是一个对象, 指向我们构造函数原型的对象 prototype
// tab1.__proto__ === Tab.prototype // true
// 闭包案例
// for (var index = 0; index < array.length; index++) {
//   (function(i) {
//     array[i].onClick = function () {
//       console.log(i)
//     }
//   })(i)
// }

// 浅拷贝
// 1. for in...
let obj = {
  id: 1,
  name: 'lisi'
}
let o = {}
for (const key in obj) {
  if (Object.hasOwnProperty.call(object, key)) {
    obj[key] = object[key]
  }
}
// 2. es6
Object.assign(o, obj)