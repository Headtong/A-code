Page({
  data: {
    //html: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!</div>',
    nodes: [{
      name: 'i',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;margin-left:25px'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]
  },
  tap() {
    console.log('tap')
  }
})