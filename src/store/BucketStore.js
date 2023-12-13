import {makeAutoObservable} from "mobx";

class BucketStore {

    bucketItems = [];

    constructor() {
        makeAutoObservable(this)
    }

    addToBucket(product) {
        console.log(product)
        this.bucketItems.push(product)
    }

    deleteFromBucket(itemToDelete) {
        const itemToDeleteIndex = this.bucketItems.findIndex(item => JSON.stringify(item) === JSON.stringify(itemToDelete))
        this.bucketItems.splice(itemToDeleteIndex, 1)
    }
}

export default new BucketStore()