'use strict';

//pull in all of my html elements that I will be rendering with js
var productContainerEl = document.getElementById('product-container');

var resultsEl = document.getElementById('results');

var productOneEl = document.getElementById('product1');

var productTwoEl = document.getElementById('product2');

var productThreeEl = document.getElementById('product3');

var bestProductImgEl = document.getElementById('best-product');

//declare all array for all of my products
var allProducts = [];


//declare constructor function with name and source parameters
function Product(name, src){
  this.name = name;
  this.filepath = `img/${src}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}



//create new instances of Product function

function createNewProducts(){
  new Product('R2D2 bag', 'bag.jpg');
  new Product('Banana Slicer', 'banana.jpg');
  new Product('Bathroom Multitasker', 'bathroom.jpg');
  new Product('Toeless Rainboots', 'boots.jpg');
  new Product('Breakfast Oven', 'breakfast.jpg');
  new Product('Meatball Bubblegum', 'bubblegum.jpg');
  new Product ('Weird Chair', 'chair.jpg');
  new Product('Cthulhu', 'cthulhu.jpg');
  new Product('Dog-duck Mask', 'dog-duck.jpg');
  new Product('Dragon Meat', 'dragon.jpg');
  new Product('Pen Utensils', 'pen.jpg');
  new Product('Pet-sweep Footies', 'pet-sweep.jpg');
  new Product('Pizza Scissors', 'scissors.jpg');
  new Product('Shark Sleeping Bag', 'shark.jpg');
  new Product('Baby Sweep', 'sweep.png');
  new Product('Tauntaun', 'tauntaun.jpg');
  new Product('Unicorn Meat', 'unicorn.jpg');
  new Product('Tenticle usb', 'usb.gif');
  new Product('Infinite water-can', 'water-can.jpg');
  new Product('Undrinkable Wine Glass', 'wine-glass.jpg');

}
//declare recent random numbers array to store random numbers used. Use this information to prevent the same images from being displayed
var recentRandomNumbers = [];

var votesRemaining = 25;


//declare function to generate random index
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// getLocalStorage();

function render() {
  generatePicture(productOneEl);
  generatePicture(productTwoEl);
  generatePicture(productThreeEl);


  // console.log('all products array', allProducts, 'parsed products', parsedProducts);
}

function generatePicture(domEl){
  var randomIndex = generateUniqueIndex();

  allProducts[randomIndex].views++;

  appendToDom(randomIndex, domEl);
}

function appendToDom(index, domEl){
  domEl.src = allProducts[index].src;
  domEl.alt = allProducts[index].name;
  domEl.title = allProducts[index].name;
}

function generateUniqueIndex() {
  var randomIndex = random(0, allProducts.length - 1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = random(0, allProducts.length - 1);
  }

  recentRandomNumbers.push(randomIndex);

  if(recentRandomNumbers.length > 6) {
    recentRandomNumbers.shift();
  }

  return randomIndex;
}




function renderBestProduct() {
  var bestProduct;
  var bestProductImg;
  var temp = 0;

  for(var i = 0; i < allProducts.length; i++){
    if(allProducts[i].votes > temp) {
      temp = allProducts[i].votes;
      bestProduct = allProducts[i].name;
      bestProductImg = allProducts[i].src;

    }

  }

  var h2El = document.createElement('h2');
  h2El.textContent = `Your favorite product is ${bestProduct} with ${temp} votes!`;
  resultsEl.appendChild(h2El);


  bestProductImgEl.src = bestProductImg;
  renderChart();
}

productContainerEl.addEventListener('click', handleClick);

function handleClick(e){
  var productName = e.target.title;

  if(e.target.id === 'product-container') {
    alert('click on one of the three products displayed!');
  }

  if(votesRemaining === 0) {
    productContainerEl.removeEventListener('click', handleClick);
    renderBestProduct();
  }

  for(var i = 0; i < allProducts.length; i++){
    if(productName === allProducts[i].name){
      allProducts[i].votes++;
      votesRemaining--;
    }
  }
  render();


}


var ctx = document.getElementById('myChart').getContext('2d');

var namesArr = [];
var votesArr = [];

//function is invoked within the render best product function function
function renderChart(){
  //run function after all votes have been used
  if(votesRemaining === 0){
    //loop through all products array and push any products with more than zero votes to the namesArr and votesArr
    for (var i = 0; i < allProducts.length; i++){
      if (allProducts[i].votes > 0) {
        namesArr.push(allProducts[i].name);
        
        votesArr.push(allProducts[i].votes);
      }
    }
  }
  
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      //input names of products in the namesArr array
      labels: namesArr,
      datasets: [{
        label: '# of Votes',
        //input number of votes in the votesArr array
        data: votesArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            //y-axis integers to whole numbers
            callback: function(value) {if (value % 1 === 0) {return value;}},
          },
        }],
      },
    },
  });
  stringifyAndSet();
}



function stringifyAndSet() {
  ////////////stringify////////
  var stringifyProducts = JSON.stringify(allProducts);
  //////////////store it in local storage/////////
  localStorage.setItem('products', stringifyProducts);
}


//////////get item from local storage and parse/
var localStorageGetProducts = JSON.parse(localStorage.getItem('products'));


if (localStorage.getItem('products')) {
  allProducts = localStorageGetProducts;
} else {
  createNewProducts();
}

console.log('parsed all products', localStorageGetProducts);

render();
