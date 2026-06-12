// 火 APP - 粉丝社区
Page({
  data: {
    showAI: false,
    showWish: false,
    showCommunity: false,
    chatInput: '',
    wishInput: '',
    chatMsgs: [],
    chatScrollTop: 0,
    wishes: [
      { id: 1, user: '小明', avatar: '😀', content: '希望每天都能开开心心的！', time: '2小时前', likes: 24, liked: false },
      { id: 2, user: '星星糖', avatar: '⭐', content: '祝愿家人都健康平安🙏', time: '5小时前', likes: 18, liked: false },
      { id: 3, user: '阳光少年', avatar: '☀️', content: '希望今年能遇到心动的TA💕', time: '昨天', likes: 42, liked: false },
    ],
    posts: [
      { id: 1, user: '小明', avatar: '😀', time: '1小时前', content: '今天天气真好，适合出门拍照！大家周末有什么计划吗？📷', likes: 15, comments: 8 },
      { id: 2, user: '星星糖', avatar: '⭐', time: '3小时前', content: '新专辑太好好听了单曲循环一整天！最喜欢《勇敢》这首歌 🎵', likes: 32, comments: 21 },
    ],
    AI_REPLIES: [
      '你好呀！今天心情怎么样？😊',
      '有什么想聊的吗？我在这里陪你~',
      '记得对自己好一点，你已经很棒了！💪',
      '今天的天气很适合出门走走呢~',
      '加油！每一天都是新的开始🌟',
      '我在这里，随时听你倾诉💬'
    ]
  },

  switchTabMsg() {
    wx.showToast({ title: '消息功能开发中', icon: 'none' });
  },

  openAI() {
    const msgs = this.data.chatMsgs;
    if (msgs.length === 0) {
      msgs.push({ id: Date.now(), text: '你好！我是小火，你的专属AI陪伴助手 🤖 有什么想聊的吗？', isUser: false });
    }
    this.setData({ showAI: true, chatMsgs: msgs, chatScrollTop: Date.now() });
  },

  closeAI() {
    this.setData({ showAI: false });
  },

  onChatInput(e) {
    this.setData({ chatInput: e.detail.value });
  },

  sendChat() {
    const text = this.data.chatInput.trim();
    if (!text) return;
    const msgs = this.data.chatMsgs;
    msgs.push({ id: Date.now(), text, isUser: true });
    this.setData({ chatMsgs: msgs, chatInput: '', chatScrollTop: Date.now() });
    setTimeout(() => {
      const reply = this.data.AI_REPLIES[Math.floor(Math.random() * this.data.AI_REPLIES.length)];
      const newMsgs = this.data.chatMsgs.concat([{ id: Date.now(), text: reply, isUser: false }]);
      this.setData({ chatMsgs: newMsgs, chatScrollTop: Date.now() });
    }, 600 + Math.random() * 800);
  },

  openWishTree() {
    this.setData({ showWish: true });
  },

  closeWish() {
    this.setData({ showWish: false });
  },

  onWishInput(e) {
    this.setData({ wishInput: e.detail.value });
  },

  submitWish() {
    const text = this.data.wishInput.trim();
    if (!text) return;
    const wishes = [{ id: Date.now(), user: '我', avatar: '😀', content: text, time: '刚刚', likes: 0, liked: false }].concat(this.data.wishes);
    this.setData({ wishes, wishInput: '' });
  },

  toggleLike(e) {
    const id = e.currentTarget.dataset.id;
    const wishes = this.data.wishes.map(w => {
      if (w.id === id) {
        return { ...w, liked: !w.liked, likes: w.liked ? w.likes - 1 : w.likes + 1 };
      }
      return w;
    });
    this.setData({ wishes });
  },

  showDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({ title: item.user + '的心愿', content: item.content, showCancel: false });
  },

  openCommunity() {
    this.setData({ showCommunity: true });
  },

  closeCommunity() {
    this.setData({ showCommunity: false });
  }
});