
export default class TreeNode {

    /**
     * @param {number} value
     * @param {TreeNode} [parent]
     */
    constructor(value, parent = null) {
        this.left = null;
        this.right = null;
        this.value = value;
        this.parent = parent;
    }

    createChild(value) {
        let newNode;

        if(this.value > value) {
            this.left = new TreeNode(value, this);
            newNode = this.left;
        } else if (this.value < value) {
            this.right = new TreeNode(value, this);
            newNode = this.right;
        }

        if(this.parent) {
            this.parent.balance(newNode);
        }
    }

    getMinHeight(pathLength = 0) {
        if(!this.left || !this.right) {
            return pathLength;
        }

        const leftHeight = this.left.getMinHeight(pathLength + 1);
        const rightHeight = this.right.getMinHeight(pathLength + 1);

        return Math.min(leftHeight, rightHeight);
    }

    getMaxHeight(pathLength = 0) {
        if(!this.left && !this.right) {
            return pathLength;
        }

        const leftHeight = this.left ? this.left.getMaxHeight(pathLength + 1) : 0;
        const rightHeight = this.right ? this.right.getMaxHeight(pathLength + 1) : 0;

        return Math.max(leftHeight, rightHeight);
    }

    rotateLeft() {
        const tmpValue = this.value;
        const tmpRight = this.right;
        const tmpLeft = this.left;

        this.value = this.right.value;
        this.right = this.right.right;

        this.left = new TreeNode(tmpValue, this);

        if(tmpRight.left) {
            this.left.right = tmpRight.left;
            tmpRight.parent = this.left;
        }

        if(tmpLeft) {
            this.left.left = tmpLeft;
            tmpLeft.parent = this.left;
        }

        if(this.right) {
            this.right.parent = this;
        }
        this.left.parent = this;

    }

    rotateRight() {
        const tmpValue = this.value;
        const tmpLeft = this.left;
        const tmpRight = this.right;

        this.value = this.left.value;
        this.left = this.left.left;

        this.right = new TreeNode(tmpValue, this);

        if(tmpLeft.right) {
            this.right.left = tmpLeft.right;
            tmpLeft.parent = this.right;
        }

        if(tmpRight) {
            this.right.right = tmpRight;
            tmpRight.parent = this.right;
        }

        if(this.left) {
            this.left.parent = this;
        }
        this.right.parent = this;
    }

    getBalanceFactor() {
        return (this.left ? this.left.getMaxHeight(1) : 0) - (this.right ? this.right.getMaxHeight(1) : 0);
    }


    balance(addedNode, recusrive = true) {
        const balanceFactor = this.getBalanceFactor();

        if(balanceFactor < -1) {
            const isDoubleRotation = addedNode === addedNode.parent.left && addedNode.value > this.value;
            if(isDoubleRotation && this.right.left) {
                this.right.rotateRight();
            }
            this.rotateLeft();
            if(this.left) {
                this.left.balance(addedNode, false);
            }
            if(this.right) {
                this.right.balance(addedNode, false);
            }
        } else if(balanceFactor > 1) {
            const isDoubleRotation = addedNode === addedNode.parent.right && addedNode.value < this.value;
            if(isDoubleRotation && this.left.right) {
                this.left.rotateLeft();
            }
            this.rotateRight();
            if(this.left) {
                this.left.balance(addedNode, false);
            }
            if(this.right) {
                this.right.balance(addedNode, false);
            }
        }

        if(this.parent && recusrive) {
            this.parent.balance(addedNode);
        }
    }

    /**
     * Prints the tree in order the nodes are in the tree to be inserted in a bst in the same order.
     */
    printBst() {
        console.log(this.value);
        if(this.left) {
            this.left.printBst();
        }
        if(this.right) {
            this.right.printBst();
        }
    }

    /**
     * Prints the tree in the canvas
     */
    printTree(canvas, height = 50, maxLeft = 0, maxRight = 1500, fontSize = 48) {
        canvas.font = `${fontSize}px serif`;
        canvas.fillText(this.value, (maxLeft + maxRight) / 2, height);

        if(this.left) {
            const childMaxRight = (maxLeft + maxRight) / 2;
            this.left.printTree(canvas, height + 100, maxLeft, childMaxRight, Math.floor(fontSize * 0.7));
            canvas.beginPath();
            canvas.strokeStyle = 'blue';
            canvas.moveTo((maxLeft + maxRight) / 2 + 10, height + 10);
            canvas.lineTo((maxLeft + childMaxRight) / 2 + 10, height + 50);
            canvas.stroke();
        }
        if(this.right) {
            const childMaxLeft = (maxLeft + maxRight) / 2;
            this.right.printTree(canvas, height + 100, childMaxLeft, maxRight, Math.floor(fontSize * 0.7));
            canvas.beginPath();
            canvas.strokeStyle = 'blue';
            canvas.moveTo((maxLeft + maxRight) / 2 + 10, height + 10);
            canvas.lineTo((childMaxLeft + maxRight) / 2 + 10, height + 50);
            canvas.stroke();
        }
    }
}