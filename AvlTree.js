import TreeNode from './TreeNode.js';

export default class AvlTree {
    constructor() {
        this.storage = [];
        this.rootNode = null;
    }

    append(value) {
        if (typeof value !== 'number' || Number.isNaN(value)) {
            throw new Error('You need to append a numeric value.');
        }

        this.storage.push(value);

        if (!this.rootNode) {
            this.rootNode = new TreeNode(value);
        } else {
            if (!this.hasNode(this.rootNode, value)) {
                const parentNode = this.findParent(this.rootNode, value);
                parentNode.createChild(value);
            }
        }
    }

    appendMultiple(...args) {
        args.forEach(this.append.bind(this))
    }


    /**
     * Finds the parent node where a value should be inserted.
     */
    findParent(startNode, value) {
        if(value < startNode.value){
            if(startNode.left) {
                return this.findParent(startNode.left, value);
            }
            return startNode;
        } else {
            if(startNode.right) {
                return this.findParent(startNode.right, value);
            }
            return startNode;
        }
    }

    hasNode(startNode, value) {
        let hasNode = value === startNode.value;

        if(startNode.left) {
            hasNode = hasNode || this.hasNode(startNode.left, value);
        }
        if(startNode.right) {
            hasNode = hasNode || this.hasNode(startNode.right, value);
        }

        return hasNode;
    }

    isBalanced() {
        let isBalanced = true;
        const stack = [this.rootNode];

        while(stack.length) {
            const current = stack.pop();
            if(current) {
                stack.push(current.left);
                stack.push(current.right);

                isBalanced = Math.abs(current.getBalanceFactor()) <= 1;
            }
        }

        return isBalanced;
    }

    getNodeCount() {
        const stack = [this.rootNode];
        let count = 0;

        while(stack.length) {
            const current=stack.pop();
            if(current) {
                count++;

                stack.push(current.left);
                stack.push(current.right);
            }
        }

        return count;
    }
}