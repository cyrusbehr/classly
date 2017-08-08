
export function sortByMagic(arrayOfQuestions) {
  //returns new sorted array
  var resolvedArray = [];
  var notResolvedArray = [];

  for(var i = 0; i < arrayOfQuestions.length; i++){
    if(arrayOfQuestions[i].isResolved){
      resolvedArray.push(arrayOfQuestions[i]);
    } else {
      notResolvedArray.push(arrayOfQuestions[i]);
    }
  }

  var notResolvedAndStarred = [];
  var notResolvedAndNotStarred = [];

  for(var j = 0; j < notResolvedArray.length; j++) {
    if(notResolvedArray[j].isStarred){
      notResolvedAndStarred.push(notResolvedArray[j]);
    } else {
      notResolvedAndNotStarred.push(notResolvedArray[j]);
    }
  }

  var resolvedAndStarred = [];
  var resolvedAndNotStarred = [];

  for(var k = 0; k < resolvedArray.length; k++){
    if(resolvedArray[k].isStarred){
      resolvedAndStarred.push(resolvedArray[k]);
    } else {
      resolvedAndNotStarred.push(resolvedArray[k]);
    }
  }

  notResolvedAndStarred.sort((a, b) => {
    return b - a;
  });

  notResolvedAndNotStarred.sort((a, b) => {
    return b - a;
  });

  resolvedAndStarred.sort((a, b) => {
    return b - a;
  });

  resolvedAndNotStarred.sort((a, b) => {
    return b - a;
  })

  var returnArray = notResolvedAndStarred.concat(notResolvedAndNotStarred, resolvedAndStarred, resolvedAndNotStarred);
  console.log("this is sortByMagic", returnArray);
  return returnArray;
}

export function sortByCategory(category, arrayOfQuestions) {
  //**category is string matching the topic highlighted**
  var categoryArray = [];
  var notCategoryArray = [];

  for(var l = 0; l < arrayOfQuestions.length; l++){
    if(arrayOfQuestions[l].tags === category) {
      categoryArray.push(arrayOfQuestions[l]);
    } else {
      notCategoryArray.push(arrayOfQuestions[l]);
    }
  }

  var arr0 = sortByMagic(categoryArray);
  var arr1 = sortByMagic(notCategoryArray);
  var newArray = categoryArray.concat(notCategoryArray);
  console.log("This is sortByCategory", newArray);
  return newArray;
}


//first, bring all comments matching category and push them to the front, and sort
//these ones by sortByMagic
//then sort all the remaining ones by sortByMagic

// // first, exclude resolved questions by pushing them to the bottom
// // then push all starred questions to the front and sort them in order by votes
// // then sort the rest by upvotes
