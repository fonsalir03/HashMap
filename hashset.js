import { LinkedList } from "./LinkedList.js";

class HashSet {
    constructor(){
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = Array(this.capacity)
        this.clear()
    }

    checkIndex(index){
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
    set(key){
        const hashedKey = this.hash(key)
        this.checkIndex(hashedKey)

        const bucket = this.buckets[hashedKey]
        bucket.append(key)
        
        if (this.length() > this.capacity * this.loadFactor){
            this.growBuckets()
        }
    }

    clear(){
        for (let i = 0;i < this.capacity; i++){
            this.buckets[i] = new LinkedList
        }
    }

    length(){   
        let counter = 0
        for (let i = 0; i<this.capacity;i++){
            counter += this.buckets[i].size()
        }
        return counter
    }
}

const hs = new HashSet()
hs.set("firstKey")
console.log(hs.buckets[15].head())