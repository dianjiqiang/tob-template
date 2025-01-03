import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 这种异步的action 不是写在 reducers来的 需要我们额外写  在这里导出出去 在组件中使用  第一个参数:名字,第二个参数: 异步函数
export const fetchHomeMutailDataAction = createAsyncThunk('get/getUserInfo', async (info,store) => { // 在我们派发这个异步函数的时候 可以传递我们对应的参数 第二个参数为我们的store
  // 在我们执行这个异步函数的时候 我们的函数有三种状态 见上  我们监听这三种状态需要在我们的 slice中额外写 extraReducers 对象
  // const res = await axios.get('http://123.207.32.32:8000/home/multidata')

  // return res.data
})

const userSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 888
  },
  reducers: {
    addNumber(state, action) {
      // 在这里内部已经给我们做了优化的 我们可以直接改变这里面的值  后续会自动给我们返回一个新的state 替换掉以前的state
      state.counter = state.counter + action.payload
    },
    reduceNumber(state, action) {
      state.counter = state.counter - action.payload
    }
  }
})

export const { addNumber, reduceNumber } = userSlice.actions

export default userSlice.reducer