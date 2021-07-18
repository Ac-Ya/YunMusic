const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//防抖函数 在一定时间内不管点击多少次只有最后一次执行
function debounce(fun,delay = 2000){
  let timer = null 
  return function(){
    let args = arguments
    let firstClick = !timer
    if(firstClick){
      fun.apply(this,args)
    }
    if(timer){
      clearInterval(timer)
      timer = null
    }
    timer = setTimeout(()=>{
      fun.apply(this,args)
    },delay)
  }
}

function buttonClicked(self) {
 self.setData({
  buttonClicked: true
 })
 setTimeout(function () {
  self.setData({
   buttonClicked: false
  })
 }, 1000)
}



module.exports = {
  formatTime,
  formatNumber,
  debounce,
  buttonClicked
}
