const viewFollowers = document.querySelector(".btn-viewFollowers");
const viewFollowing = document.querySelector(".btn-viewFollowing");

const following = document.querySelector('#following');
const followers = document.querySelector('#followers');

viewFollowers.addEventListener('click', function(){
    followers.classList.remove('view-toggler');
    followers.classList.add('d-flex');
    followers.classList.add('bold-font')
    following.classList.remove('d-flex');
    following.classList.add('view-toggler');
})

viewFollowing.addEventListener('click', function(){
    following.classList.remove('view-toggler');
    following.classList.add('d-flex');
    followers.classList.remove('d-flex');
    followers.classList.add('view-toggler');
})

