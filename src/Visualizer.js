import React, { useState, useEffect } from "react";
import "./Visualizer.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
function Visualizer() {
  const [array, setArray] = useState([]);
  const [value, onChange] = useState(25);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < value; i++) {
      arr.push(randomIntFromInterval(5, 500));
    }
    setArray([...arr]);
  }, [value]);

  function resetArray(e) {
    e.preventDefault();
    setArray([]);
    window.location.reload(false);
  }
  var timeOut = 200; //Delay in time for all sorting algorithms.
  var base_arrray = [...array]; //Common arrray for all sorting algorithms.
  //Promise method to wait for promise to return.
  const awaitTimeout = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  //BUBBLE SORT
  const bubbleSort = async () => {
    const color = document.getElementsByClassName("randomArray");
    for (var i = 0; i < base_arrray.length; i++) {
      for (var j = 0; j < base_arrray.length - i - 1; j++) {
        await awaitTimeout(timeOut);
        color[j].style.backgroundColor = "red";
        color[j + 1].style.backgroundColor = "red";
        if (base_arrray[j] > base_arrray[j + 1]) {
          await awaitTimeout(timeOut);
          var v1 = color[j].getAttribute("value");
          var v2 = color[j + 1].getAttribute("value");
          color[j].setAttribute("value", v2);
          color[j + 1].setAttribute("value", v1);
          color[j].style.height = `${v2}px`;
          color[j + 1].style.height = `${v1}px`;
          var temp = base_arrray[j];
          base_arrray[j] = base_arrray[j + 1];
          base_arrray[j + 1] = temp;
        }
        await awaitTimeout(timeOut);
        color[j].style.backgroundColor = "#6b5b95";
        color[j + 1].style.backgroundColor = "#6b5b95";
      }
      await awaitTimeout(timeOut);
      color[color.length - i - 1].style.backgroundColor = "#13CE66";
    }
  };
  //Insertion Sort
  var allBars = document.getElementsByClassName("randomArray");
  const insertionSort = async () => {
    var i, key, j;
    allBars[0].style.backgroundColor = " rgb(49, 226, 13)";
    for (i = 1; i < base_arrray.length; i++) {
      allBars[i].style.backgroundColor = "darkblue";
      await awaitTimeout(timeOut);
      var keyDOM = allBars[i].getAttribute("value");
      key = base_arrray[i];
      j = i - 1;
      while (j >= 0 && base_arrray[j] > key) {
        allBars[j].style.backgroundColor = "darkblue";
        allBars[j + 1].setAttribute("value", allBars[j].getAttribute("value"));
        allBars[j + 1].style.height = allBars[j].style.height;
        base_arrray[j + 1] = base_arrray[j];
        j = j - 1;
        await awaitTimeout(timeOut);
        for (var k = i; k >= 0; k--) {
          allBars[k].style.backgroundColor = " rgb(49, 226, 13)";
        }
      }
      allBars[j + 1].setAttribute("value", keyDOM);
      allBars[j + 1].style.height = `${keyDOM}px`;
      base_arrray[j + 1] = key;
      await awaitTimeout(timeOut);
      allBars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
  };
  //Quick Sort
  async function partition(arr, start, end) {
    for (var i = start; i <= end; i++) {
      allBars[i].style.backgroundColor = "#D6FFB7";
    }
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    allBars[pivotIndex].style.backgroundColor = "#E0777D";
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        // Swapping elements
        await awaitTimeout(timeOut);
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

        var temp = allBars[i].style.height;
        var tempVal = allBars[i].getAttribute("value");
        allBars[i].setAttribute(
          "value",
          allBars[pivotIndex].getAttribute("value")
        );
        allBars[pivotIndex].setAttribute("value", tempVal);
        allBars[i].style.height = allBars[pivotIndex].style.height;
        allBars[pivotIndex].style.height = temp;
        // Moving to next element
        allBars[pivotIndex].style.backgroundColor = "teal";
        pivotIndex++;
        allBars[pivotIndex].style.backgroundColor = "#E0777D";
      }
    }
    await awaitTimeout(timeOut);
    // Putting the pivot value in the middle
    [allBars[pivotIndex].style.height, allBars[end].style.height] = [
      allBars[end].style.height,
      allBars[pivotIndex].style.height,
    ];
    var tmpValue = allBars[pivotIndex].getAttribute("value");
    allBars[pivotIndex].setAttribute(
      "value",
      allBars[end].getAttribute("value")
    );
    allBars[pivotIndex].setAttribute("value", tmpValue);
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    for (var k = start; k <= end; k++) {
      if (k !== pivotIndex) {
        allBars[k].style.backgroundColor = "teal";
      }
    }
    return pivotIndex;
  }
  //Quick Sort main function
  async function QuickSort(array, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(array, start, end);
    allBars[index].style.backgroundColor = "teal";
    await QuickSort(array, start, index - 1);
    await QuickSort(array, index + 1, end);
  }
  const merge = async (array, l, mid, r) => {
    var n1 = mid - l + 1;
    var n2 = r - mid;
    var a = [];
    var b = [];
    await awaitTimeout(timeOut);
    for (var i = 0; i < n1; i++) {
      a[i] = array[l + i];
      allBars[l + i].style.backgroundColor = "black";
    }
    await awaitTimeout(timeOut);
    for (var q = 0; q < n2; q++) {
      b[q] = array[mid + 1 + q];
      allBars[mid + 1 + q].style.backgroundColor = "grey";
    }
    await awaitTimeout(timeOut);
    var v = 0;
    var j = 0;
    var k = l;
    await awaitTimeout(timeOut);
    while (v < n1 && j < n2) {
      if (a[v] < b[j]) {
        array[k] = a[v];
        allBars[k].setAttribute("value", a[v]);
        allBars[k].style.height = `${a[v]}px`;
        allBars[k].style.backgroundColor = "green";
        k++;
        v++;
      } else {
        array[k] = b[j];
        allBars[k].setAttribute("value", b[j]);
        allBars[k].style.height = `${b[j]}px`;
        allBars[k].style.backgroundColor = "green";
        k++;
        j++;
      }
    }
    while (v < n1) {
      array[k] = a[v];
      allBars[k].setAttribute("value", a[v]);
      allBars[k].style.height = `${a[v]}px`;
      allBars[k].style.backgroundColor = "green";
      k++;
      v++;
    }
    while (j < n2) {
      array[k] = b[j];
      allBars[k].setAttribute("value", b[j]);
      allBars[k].style.height = `${b[j]}px`;
      allBars[k].style.backgroundColor = "green";
      k++;
      j++;
    }
  };
  const mergeSort = async (array, start, end) => {
    await awaitTimeout(timeOut);
    if (start >= end) {
      return;
    }
    var mid = parseInt(start + (end - start) / 2);
    allBars[mid].style.backgroundColor = "red";
    await mergeSort(array, start, mid);
    await mergeSort(array, mid + 1, end);
    await merge(array, start, mid, end);
  };

  return (
    <div className="visualizer">
      <div className="navbar">
        <div className="base__buttons">
          <input
            type="range"
            min="25"
            max="200"
            value={value}
            onChange={({ target: { value: radius } }) => {
              onChange(radius);
            }}
            class="slider"
            id="myRange"
          />
          <button
            style={{ margin: "20px", backgroundColor: "#D9514EFF" }}
            type="submit"
            onClick={(e) => resetArray(e)}
          >
            Reset Array
          </button>
        </div>
        <div className="dropdown">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ color: "white" }}
          >
            Open Menu ▼
          </Button>
          <Menu
            className="dropdown_btn"
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <button
                className="bubble"
                type="submit"
                onClick={() => bubbleSort()}
              >
                Bubble Sort
              </button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <button type="submit" onClick={() => insertionSort()}>
                Insertion Sort
              </button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <button
                type="submit"
                onClick={() => mergeSort(array, 0, value - 1)}
              >
                Merge Sort
              </button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <button
                className="merge"
                type="submit"
                onClick={() => {
                  QuickSort(array, 0, value - 1);
                }}
              >
                Quick Sort
              </button>
            </MenuItem>
          </Menu>
        </div>
        <div className="sort__buttons">
          <button className="bubble" type="submit" onClick={() => bubbleSort()}>
            Bubble Sort
          </button>
          <button type="submit" onClick={() => insertionSort()}>
            Insertion Sort
          </button>
          <button type="submit" onClick={() => mergeSort(array, 0, value - 1)}>
            Merge Sort
          </button>
          <button
            className="merge"
            type="submit"
            onClick={() => {
              QuickSort(array, 0, value - 1);
            }}
          >
            Quick Sort
          </button>
        </div>
      </div>

      <div className="array">
        {array.map((value, idx) => {
          return (
            <div
              className="randomArray"
              style={{
                width: "2vw",
                display: "inline-block",
                margin: "0 0.5px",
                height: `${value}px`,
                backgroundColor: "teal",
              }}
              key={idx}
              value={value}
            ></div>
          );
        })}
      </div>
      <div className="array_size">
        <p>
          Array Size:<span>{value}</span>
        </p>
      </div>
    </div>
  );
}

export default Visualizer;
