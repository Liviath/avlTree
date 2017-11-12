import AvlTree from './AvlTree.js';

const treeArea = document.getElementById('treeArea');
const canvas = treeArea.getContext('2d');

/**
 * Clear the whole canvas area
 */
function clearCanvas() {
    canvas.clearRect(0, 0, treeArea.width, treeArea.height);
}

const avlTree = new AvlTree();

const inputField = document.getElementById('addNumber');

function addNumber() {
    const values = inputField.value.replace(' ', '').split(',').forEach((value) => {
        const parsed = parseInt(value, 10);

        if(!Number.isInteger(parsed)) {
            alert(`${value} is no integer.`)
        }

        avlTree.append(parsed);
    });

    clearCanvas();
    avlTree.rootNode.printTree(canvas);
}

function addRandom() {
    const number = Math.floor(Math.random() * 1000) + 1;
    avlTree.append(number);
    clearCanvas();
    avlTree.rootNode.printTree(canvas);
}

document.querySelector('#addNumberButton').addEventListener('click', addNumber);
document.querySelector('#addRandomButton').addEventListener('click', addRandom);