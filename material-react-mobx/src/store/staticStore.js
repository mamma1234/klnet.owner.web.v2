import { observable, action, asMap } from 'mobx'
import { create, persist } from 'mobx-persist'


class CountStore {
    @persist @observable count = 0
    @action inc() {
        this.count = this.count + 1
    }
    @action setCount(count) {
        this.count = count;
    }    
}

class Item {
    @persist @observable info = ''
}

// export class MapStore {
//     @persist('map', Item) @observable items = observable.map({})
//     @action test(key = 'test') {
//         console.warn(this.items.keys().join('.'))
//         this.items.set(key, new Item)
//     }
// }

// export class ListStore {
//     @persist('list') @observable list = []
//     @action test(text = `${Date.now()}`) {
//         this.list.push({ text })
//     }
// }


const countStore = new CountStore();

export default countStore;

const hydrate = create({storage:AsyncStorage})
hydrate('mStore', store).then(()=>{}).catch(e=>{console.warn('hydrate error',e)})