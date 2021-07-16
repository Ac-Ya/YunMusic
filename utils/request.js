import config from "./config"

/*
  用于封装请求
    参数  
      url 请求的地址
      data 请求的参数
      method 请求的方法
*/
export function request(url,data = {}, method = "GET"){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:config.baseURL + url,
        data,
        method,
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
}

//用于登录的请求  保存登录的cookies
export function loginRequest(url,data = {}, method = "GET"){
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.baseURL + url,
      data,
      method,
      success(res){
        console.log(res);
        wx.setStorage({
          key:"cookies",
          data:res.cookies
        })
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

// 用于要携带cookie的请求
export function cookieRequest(url,data = {}, method = "GET"){
return new Promise((resolve,reject)=>{
  wx.request({
    url:config.baseURL + url,
    data,
    method,
    header:{
      cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>{
          return item.indexOf('MUSIC_U') !== -1;
      }):" "
    },
    success(res){
      resolve(res)
    },
    fail(err){
      reject(err)
    }
  })
})
}