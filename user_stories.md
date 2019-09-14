Building three random photos from the image directory and display them side-by-side-by-side in the browser window.
Be able to receive clicks on those displayed images, and track those clicks for each image. 
Track how many times each image is displayed, for statistical purposes.
Receiving a click, three new non-duplicating random images to be automatically displayed.
Three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before.
A constructor function that creates an object associated with each image, and has (at a minimum) properties for the name of the image (to be used for display purposes), its filepath, the number of times it has been shown, and the number of times it has been clicked.
After 25 selections have been made, event listeners on the images display a list of the products with votes received with each list item (ie “3 votes for the water-can”)