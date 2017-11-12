import AvlTree from './AvlTree.js';

/**
 * =====================================
 * 				TESTS
 * =====================================
 */
const assert = {
    toEqual(a, b) {
        if(a !== b) {
            throw new Error(`Error: ${a} !== ${b}`);
        } else {
            console.log('%cAssertion success!', 'color: green');
        }
    },

    isBinarySearchTree(node) {
        function checkNode(node) {
            let isBst = true;

            if(node.left) {
                if(node.left.value > node.value) {
                    isBst = false;
                } else {
                    isBst = checkNode(node.left)
                }
            }

            if(node.right) {
                if(node.right.value < node.value) {
                    isBst = false;
                } else {
                    isBst = isBst && checkNode(node.right)
                }
            }

            return isBst;
        }

        if(!checkNode(node)) {
            throw new Error(`Error: The given tree is no binary search tree.`);
        } else {
            console.log('%cThe tree is a Binary Search Tree!', 'color: green');
        }
    }
};

const tests = {
    testLeftRotation() {
        const avl = new AvlTree();

        avl.appendMultiple(1, 2, 3);

        assert.toEqual(avl.rootNode.value, 2);
        assert.toEqual(avl.rootNode.left.value, 1);
        assert.toEqual(avl.rootNode.right.value, 3);

        assert.toEqual(avl.isBalanced(), true);
        assert.isBinarySearchTree(avl.rootNode);
    },

    testRightRotation() {
        const avl = new AvlTree();

        avl.appendMultiple(3, 2, 1);

        assert.toEqual(avl.rootNode.value, 2);
        assert.toEqual(avl.rootNode.left.value, 1);
        assert.toEqual(avl.rootNode.right.value, 3);

        assert.toEqual(avl.isBalanced(), true);
        assert.isBinarySearchTree(avl.rootNode);
    },

    testLeftRightRotation() {
        const avl = new AvlTree();

        avl.appendMultiple(3, 1, 2);

        assert.toEqual(avl.rootNode.value, 2);
        assert.toEqual(avl.rootNode.left.value, 1);
        assert.toEqual(avl.rootNode.right.value, 3);

        assert.toEqual(avl.isBalanced(), true);
        assert.isBinarySearchTree(avl.rootNode);
    },

    testRightLeftRotation() {
        const avl = new AvlTree();

        avl.appendMultiple(1, 3, 2);

        assert.toEqual(avl.rootNode.value, 2);
        assert.toEqual(avl.rootNode.left.value, 1);
        assert.toEqual(avl.rootNode.right.value, 3);

        assert.toEqual(avl.isBalanced(), true);
        assert.isBinarySearchTree(avl.rootNode);
    },

    testMultiple() {
        const count = 1000;

        for(let j = 0; j < 1; ++j) {
            const avl = new AvlTree();
            const usedValues = new Set();

            for(let i = 0; i < count; ++i) {
                const rnd = inRange(count);
                usedValues.add(rnd);
                avl.append(rnd);
            }

            assert.toEqual(avl.isBalanced(), true);
            assert.toEqual(avl.getNodeCount(), usedValues.size);
            assert.isBinarySearchTree(avl.rootNode);
            console.log(avl.storage.join(','));
        }
    }
};

function inRange(max) {
    return Math.floor(Math.random() * max) + 1;
}

Object.values(tests).forEach((cb) => cb())