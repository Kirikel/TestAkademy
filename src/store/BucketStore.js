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

    deleteFromBucket() {

    }
}

export default new BucketStore()