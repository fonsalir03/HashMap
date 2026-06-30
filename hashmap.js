import { LinkedList } from "./LinkedList.js";

class HashMap {
    constructor(){
        this.loadFactor = 0.75
        this.capacity = 16
        this.buckets = Array(this.capacity).fill({"empty_key": "empty_value"})
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
        //if hash is the same and the key is the same, replace the value
        //if the hash is the same and the key is different, use a linked list to store the duplicate
        
        //if the capacity reaches the load factor, grow the buckets 
        // buckets.length >= this.capacity * this.loadFactor
    }
}