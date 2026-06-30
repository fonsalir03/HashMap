class Node {
    constructor(value=null){
        this.value = value
        this.nextNode = null
    }
}

class LinkedList {
    #head
    #tail
    constructor(){
        this.#head = null
        this.#tail = null
    }

    checkIndex(index){
        if (index > this.size() || index < 0){
            throw new RangeError("Out of bounds")
        }
    }

    append(value){
        const newNode = new Node()
        newNode.value = value

        if (this.#head == null){
            this.#head = newNode
        }else if(this.#head.nextNode == null){
            this.#tail = newNode
            this.#head.nextNode = newNode
        }else{
            this.#tail.nextNode = newNode
            this.#tail = newNode
        }
    }

    prepend(value){
        const newNode = new Node()
        newNode.value = value

        newNode.nextNode = this.#head
        this.#head = newNode
    }
            size(){
        if (this.#head == null){
            return 0
        }
        
        let tmp = this.#head
        let size = 1
        while (tmp.nextNode){
            size++
            tmp = tmp.nextNode
        }
        return size
    }
    head(){
        if (this.#head == null){
            return undefined
        }
        return this.#head.value
    }
    tail(){
        if (this.#head == null){
            return undefined
        }
        return this.#tail.value
    }
    at(index){
        if (index < 0){
            return undefined
        }
        if (index >= this.size()){
            return undefined
        }

        let currentNode = this.#head
        for (let i = 0; i < index; i++){
            currentNode = currentNode.nextNode
        }
        return currentNode.value
    }

    pop(){
        if (this.#head == null){
            return undefined
        }

        const poppedNode = this.#head
        if (poppedNode.nextNode){
            this.#head = poppedNode.nextNode
        }else{
            this.#head = null
        }
        return poppedNode.value

    }

    contains(searchValue){

        let currentNode = this.#head
        for (let i = 0; i<this.size();i++){
            if (currentNode.value == searchValue){
                return true
            }
            currentNode = currentNode.nextNode
        }
        return false
    }

    findIndex(searchValue){
        //similar to the contain function
        //iterate through the linked list, if the value is found return i

        let currentNode = this.#head
        for (let i = 0; i<this.size(); i++){
            if (currentNode.value == searchValue){
                return i
            }
            currentNode = currentNode.nextNode
        }
        return -1
    }

    toString(){

        let currentNode = this.#head
        let string = ""
        while (currentNode){
            string += `(${currentNode.value})-> `
            currentNode = currentNode.nextNode
        }
        return string + "null"
    }

    insertAt(index, ...values){
        this.checkIndex(index)

        const newNodes = values.map((value)=> new Node(value))

        if (newNodes.length > 1){
            for (let i =0;i<newNodes.length -1;i++){
                newNodes[i].nextNode = newNodes[i+1]
            }
        }

        let selectedNode = this.#head
        let previousNode = this.#head
        for (let i=0; i<index; i++){
            previousNode = selectedNode
            selectedNode = selectedNode.nextNode
        }

        if (previousNode != selectedNode){
            previousNode.nextNode = newNodes[0]
        }
        
        newNodes[newNodes.length -1].nextNode = selectedNode

        if (index == 0){
            this.#head = newNodes[0]
        }
    }

    removeAt(index){
        this.checkIndex(index)
        if (index == this.size()){
            throw new RangeError("Out of bounds")
        }else if (index == 0){
            this.#head = this.#head.nextNode
            return
        }

        let previousNode = this.#head
        let currentNode = this.#head

        for (let i = 0;i< index;i++){
            previousNode = currentNode
            currentNode = currentNode.nextNode
        }
        previousNode.nextNode = currentNode.nextNode

    }
}

export {LinkedList}