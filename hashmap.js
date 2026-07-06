import { LinkedList } from "./LinkedList.js";

class HashMap {
    constructor(){
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = Array(this.capacity)
        for (let i = 0;i < this.capacity; i++){
            this.buckets[i] = new LinkedList
        }
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

    set(key, value){
        const hashedKey = this.hash(key)
        this.checkIndex(hashedKey)

        const bucket = this.buckets[hashedKey]

        if (bucket.size()>= 1){
            for (let i = 0; i<bucket.size(); i++){
                const existingKey = Object.keys(bucket.at(i))[0]
                if (key == existingKey){
                    bucket.at(i)[key] = value
                    return
                }
            }
        }
        bucket.append({[key]:value})
        
        //if the capacity reaches the load factor, grow the buckets 
        //buckets.length >= this.capacity * this.loadFactor
    }

    get(key){
        const hKey = this.hash(key)
        this.checkIndex(hKey)
        const bucket = this.buckets[hKey]
        let value = undefined

        if (bucket.size() == 1){
            value = bucket.head()[key]
        }else {
            for (let i = 0; i < bucket.size(); i++){
                const currentValPair = bucket.at(i)
                const collidedKey = Object.keys(currentValPair)[0]
                if (key==collidedKey){
                    value = currentValPair[collidedKey]
                }
            }
        }

        return value ? value :  null
    }

    has(key){
        const hKey = this.hash(key)
        this.checkIndex(hKey)
        const bucket = this.buckets[hKey]
        return bucket.head() ? true : false
    }
}