
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
        this.isBlack = false;
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

        newNode.checkForViolations();
    }

    checkForViolations(addedNode) {
        const isRoot = !this.parent;
        const uncle = this.getUncle();
        const grandParent = this.getGrandparent();
        const hasViolations = this.parent && !this.parent.isBlack;

        if(isRoot) {
            this.isBlack = true;
        } else if(uncle && !uncle.isBlack && hasViolations) {
            grandParent.left.isBlack = true;
            grandParent.right.isBlack = true;
            grandParent.isBlack = false;
            grandParent.checkForViolations();
        } else if(uncle && uncle.isBlack && hasViolations) {
            this.fixTriangle();
            this.parent.isBlack = true;
        } else if(hasViolations && grandParent) {
            this.fixTriangle();
        }
    }

    getGrandparent() {
        return this.parent && this.parent.parent;
    }

    getUncle() {
        const gp = this.getGrandparent();
        if(gp) {
            if(gp.left === this.parent) {
                return gp.right;
            } else if(gp.right === this.parent) {
                return gp.left;
            }
        }
    }

    getIsTriangle() {
        const gp = this.getGrandparent();
        if(gp) {
            if(this.parent === gp.left) {
                return this === this.parent.right;
            } else if (this.parent === gp.right) {
                return this === this.parent.left;
            }
        }

        return false;
    }

    fixTriangle() {
        const grandParent = this.getGrandparent();

        const isRightSubtree = grandParent.right === this.parent;

        if(this.getIsTriangle()) {
            if(this.parent.left === this) {
                this.parent.rotateRight();
            } else {
                this.parent.rotateLeft();
            }
        }


        if(isRightSubtree) {
            grandParent.rotateLeft();
        } else {
            grandParent.rotateRight();
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
        this.left.isBlack = tmpValue.isBlack;

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
        this.right.isBlack = tmpValue.isBlack;

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
     * Prints the tree in the canvas
     */
    printTree(canvas, height = 50, maxLeft = 0, maxRight = 1500, fontSize = 48) {
        canvas.font = `${fontSize}px serif`;
        if(!this.isBlack) {
            canvas.fillStyle = '#c30101';
        } else {
            canvas.fillStyle = '#000'
        }
        const width = canvas.measureText(this.value).width
        canvas.fillText(this.value, (maxLeft + maxRight) / 2 - width/2, height);

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

    /**
     * updates the isBlack variable
     */
    setIsBlack(isBlack) {
        this.isBlack = isBlack;
    }
}
