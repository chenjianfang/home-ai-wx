// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false


    styleOptions: [
      {
        img: '/assets/aigc/style1.png',
        label: '现代简约风',
        value: 'Modern style'
      },
      {
        img: '/assets/aigc/style2.png',
        label: '田园简约风',
        value: 'Simple decoration style'
      },
      {
        img: '/assets/aigc/style3.png',
        label: '中式风格',
        value: 'chinese style'
      },
      {
        img: '/assets/aigc/style4.png',
        label: '欧式风格',
        value: 'European classic style'
      },
      {
        img: '/assets/aigc/style5.png',
        label: '日式风格',
        value: 'Japanese-style'
      },
      {
        img: '/assets/aigc/style6.png',
        label: '工业风格',
        value: 'Industrial metal style'
      },
      {
        img: '/assets/aigc/style6.png',
        label: '复古老式',
        value: 'old style'
      },
      {
        img: '/assets/aigc/style6.png',
        label: '新古典风格',
        value: 'neo-classical style'
      },
      {
        img: '/assets/aigc/style6.png',
        label: '木屋风格',
        value: 'All wood style'
      },
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  chooseImg() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        const tempUrl = res.tempFiles[0].tempFilePath;
        wx.uploadFile({
          url: 'http://siyuanguo.natappvip.cc//api/img/uploadImg',
          filePath: tempUrl,
          name: 'file',
          // formData: {
          //   'file': 'test'
          // },
          success (res){
            const data = res.data
            
            //do something
          }
        })
      }
    })
  },
  
  onLoad() {
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          console.log("code: ", res.code)
          wx.request({
            url: 'http://siyuanguo.natappvip.cc/wechat/login',
            method: "POST",
            data: {
              appType: 1,
              code: res.code,
              encryptedData: "xx",
              inviteCode: "xx",
              iv: 'xx'
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
