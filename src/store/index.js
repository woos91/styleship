import { createStore } from 'vuex' 
import { Base } from '@/store/modules/Base'
import { Module1 } from '@/store/modules/Module1'

export default createStore({
  modules: { Base, Module1 }
});