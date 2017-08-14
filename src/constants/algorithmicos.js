
export function sortByMagic(arrayOfQuestions) {
  //returns new sorted array
  var resolvedArray = [];
  var notResolvedArray = [];

  //split into resolved and not resolved
  for(var i = 0; i < arrayOfQuestions.length; i++){
    if(arrayOfQuestions[i].isResolved){
      resolvedArray.push(arrayOfQuestions[i]);
    } else {
      notResolvedArray.push(arrayOfQuestions[i]);
    }
  }

  var notResolvedAndStarred = [];
  var notResolvedAndNotStarred = [];

  //split into further arrays
  for(var j = 0; j < notResolvedArray.length; j++) {
    if(notResolvedArray[j].isStarred){
      notResolvedAndStarred.push(notResolvedArray[j]);
    } else {
      notResolvedAndNotStarred.push(notResolvedArray[j]);
    }
  }

  //more arrays
  var resolvedAndStarred = [];
  var resolvedAndNotStarred = [];

  for(var k = 0; k < resolvedArray.length; k++){
    if(resolvedArray[k].isStarred){
      resolvedAndStarred.push(resolvedArray[k]);
    } else {
      resolvedAndNotStarred.push(resolvedArray[k]);
    }
  }

  //sort each array by upVotes
  notResolvedAndStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  notResolvedAndNotStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  resolvedAndStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  resolvedAndNotStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  })

  //concatenate and return them in order in one array
  var returnArray = notResolvedAndStarred.concat(notResolvedAndNotStarred, resolvedAndStarred, resolvedAndNotStarred);
  // console.log("this is sortByMagic return", returnArray);
  return returnArray;
}

export function sortByCategory(category, arrayOfQuestions) {
  //**category is string matching the topic highlighted**
  var categoryArray = [];
  var notCategoryArray = [];

  for(var l = 0; l < arrayOfQuestions.length; l++){
    if(arrayOfQuestions[l].tags[0] === category) {
      categoryArray.push(arrayOfQuestions[l]);
    } else {
      notCategoryArray.push(arrayOfQuestions[l]);
    }
  }

  var arr0 = sortByMagic(categoryArray);
  return arr0;
}

export function randomColor(colorArray) {
  const randomDigit = Math.floor((Math.random() * colorArray.length));
  const colorSelected = colorArray[randomDigit];
  return colorSelected;
}

  // var arr1 = sortByMagic(notCategoryArray);
  // var newArray = arr0.concat(arr1);
  // console.log("This is sortByCategory return", newArray);
  // return newArray;
 //}


//first, bring all comments matching category and push them to the front, and sort
//these ones by sortByMagic
//then sort all the remaining ones by sortByMagic

// // first, exclude resolved questions by pushing them to the bottom
// // then push all starred questions to the front and sort them in order by votes
// // then sort the rest by upvotes

export function isUnique(topicText, topicsArray) {
  for(var i = 0; i < topicsArray.length; i++ ) {
    if(topicsArray[i].text === topicText) return false
  }
  return true
}

export function sortByResolved(arrayOfQuestions) {
  //returns new sorted array
  var resolvedArray = [];
  var notResolvedArray = [];

  //split into resolved and not resolved
  for(var i = 0; i < arrayOfQuestions.length; i++){
    if(arrayOfQuestions[i].isResolved){
      resolvedArray.push(arrayOfQuestions[i]);
    } else {
      notResolvedArray.push(arrayOfQuestions[i]);
    }
  }

  var notResolvedAndStarred = [];
  var notResolvedAndNotStarred = [];

  //split into further arrays
  for(var j = 0; j < notResolvedArray.length; j++) {
    if(notResolvedArray[j].isStarred){
      notResolvedAndStarred.push(notResolvedArray[j]);
    } else {
      notResolvedAndNotStarred.push(notResolvedArray[j]);
    }
  }

  //more arrays
  var resolvedAndStarred = [];
  var resolvedAndNotStarred = [];

  for(var k = 0; k < resolvedArray.length; k++){
    if(resolvedArray[k].isStarred){
      resolvedAndStarred.push(resolvedArray[k]);
    } else {
      resolvedAndNotStarred.push(resolvedArray[k]);
    }
  }

  //sort each array by upVotes
  notResolvedAndStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  notResolvedAndNotStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  resolvedAndStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  });

  resolvedAndNotStarred.sort((a, b) => {
    return b.upVotes - a.upVotes;
  })

  //concatenate and return them in order in one array
  var returnArray = resolvedAndStarred.concat(resolvedAndNotStarred);
  // console.log("this is sortByMagic return", returnArray);
  return returnArray;
}
