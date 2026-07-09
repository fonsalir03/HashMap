import { LinkedList } from "./LinkedList.js";

class HashMap {
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

        findCollision(bucketWithCollision, keyToFind){
        for (let i = 0; i < bucketWithCollision.size(); i++){
            const currentValPair = bucketWithCollision.at(i)
            const key = Object.keys(currentValPair)[0]
            if (keyToFind==key){
                return {"index": i, "valuePair": currentValPair}
            }
        }
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
        }else if (bucket.size()>1){
            const cValueAndIndex = this.findCollision(bucket, key)
            value = cValueAndIndex["valuePair"][key]
        }

        return value ? value :  null
    }

    has(key){
        const hKey = this.hash(key)
        this.checkIndex(hKey)
        const bucket = this.buckets[hKey]
        return bucket.head() ? true : false
    }

    remove(key){

        const hKey = this.hash(key)
        const bucket = this.buckets[hKey]
        if (bucket.size()==0){
            return false
        }else if (bucket.size() == 1){
            bucket.removeAt(0)
        }else if (bucket.size() > 1){
            const cValuePairAndIndex = this.findCollision(bucket, key)
            bucket.removeAt(cValuePairAndIndex["index"])
        }

        return true

    }

    length(){   
        let counter = 0
        for (let i = 0; i<this.capacity;i++){
            counter += this.buckets[i].size()
        }
        return counter
    }

    clear(){
        for (let i = 0;i < this.capacity; i++){
            this.buckets[i] = new LinkedList
        }
    }

    entries(){
        const valuePairs = []
        for(let i = 0; i < this.capacity; i++){
            const currentBucket = this.buckets[i]
            if (currentBucket.size()==1){
                const key = Object.keys(currentBucket.head())[0]
                const value = Object.values(currentBucket.head())[0]
                valuePairs.push([key, value])
            }else if (currentBucket.size() > 1){
                for (let i = 0; i < currentBucket.size(); i++){
                const key = Object.keys(currentBucket.at(i))[0]
                const value = Object.values(currentBucket.at(i))[0]
                valuePairs.push([key, value])
                }
            }
        }
        return valuePairs
    }

    keys(){
        return this.entries().map((pair)=> pair[0])
    }

    values(){
        return this.entries().map((pair)=> pair[1])
    }

}