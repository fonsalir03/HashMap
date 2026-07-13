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
        if (bucket.size()>= 1){
            for (let i = 0; i<bucket.size(); i++){
                const existingKey = bucket.at(i)
                if (key == existingKey){
                    return
                }
            }
        }
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
    has(key){
        const hKey = this.hash(key)
        this.checkIndex(hKey)
        const bucket = this.buckets[hKey]
        return bucket.head() ? true : false
    }

    findCollision(bucketWithCollision, keyToFind){
        for (let i = 0; i < bucketWithCollision.size(); i++){
            const currentKeyNode = bucketWithCollision.at(i)
            if (keyToFind==currentKeyNode){
                return i
            }
        }
    }

    remove(key){
        const hKey = this.hash(key)
        const bucket = this.buckets[hKey]
        if (bucket.size()==0){
            return false
        }else if (bucket.size() == 1){
            bucket.removeAt(0)
        }else if (bucket.size() > 1){
            const keyNodeIndex = this.findCollision(bucket, key)
            bucket.removeAt(keyNodeIndex)
        }
        return true

    }
    keys(){
        const keys = []
        for(let i = 0; i < this.capacity; i++){
            const currentBucket = this.buckets[i]
            if (currentBucket.size()==1){
                const key = currentBucket.head()
                keys.push(key)
            }else if (currentBucket.size() > 1){
                for (let i = 0; i < currentBucket.size(); i++){
                    const key = currentBucket.at(i)
                    keys.push(key)
                }
            }
        }
        return keys
    }

    growBuckets(){
        const keys = this.keys()
        this.capacity = this.capacity * 2
        this.clear()

        for (let i = 0; i < keys.length; i++){
            let key = keys[i]
            this.set(key)
        }
    }
}