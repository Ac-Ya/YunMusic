const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

// 时间戳格式化
const timestampFormat= num =>{
  let time = new Date(num)
  let day = time.getDate()
  let month =time.getMonth()+1
  return `${month}月${formatNumber(day)}日`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//格式化音乐时间
const formatMusicTime = (time) => {
   let totalSecond = Math.ceil(time/1000)
   let minute = parseInt(totalSecond / 60)
   let second = totalSecond - minute*60
   
   return `${formatNumber(minute)}:${formatNumber(second)}`
   
}


//防抖函数 在一定时间内不管点击多少次只有最后一次执行
const debounce = (fun,delay = 500)=>{
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

     // num接收的数字,point保留数字的第几位
 const tranNumber = (num, point) => {
      // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 5) { // 判断数字有多长,如果小于5,表示1万以内的数字,让其直接显示
          return numStr;
      } else if (numStr.length >= 5 && numStr.length <= 8) { // 如果数字大于5位,小于8位,让其数字后面加单位万
          let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
          // 由千位,百位组成的一个数字
          return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) { // 如果数字大于8位,让其数字后面加单位亿
          let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
          return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
  }




module.exports = {
  formatTime,
  formatNumber,
  debounce,
  formatMusicTime,
  timestampFormat,
  tranNumber
}
