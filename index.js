fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const feedContainer = document.getElementById('feed-container');
    const loadMoreBtn = document.getElementById('load-more');
    let itemsToShow = 4;
    let currentIndex = 0;

    function createFeedItem(item) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      const profpic=document.createElement('img');
      const name = document.createElement('h4');
      const caption = document.createElement('p');
      const likes = document.createElement('p');


      profpic.id = 'profile-picture';
      img.id='postimage';
      likes.id='likes';

      img.src = item.image;
      profpic.src = item.profile_image;
      name.textContent = item.name;
      caption.textContent = item.caption;
      likes.textContent = item.likes;

      const textNode = document.createTextNode(' likes');
      likes.appendChild(textNode); 

      img.addEventListener('click', handleClick);
      function handleClick(event) { //only opens the image 
        const imageUrl = event.target.src;
        window.location.href = imageUrl;
      
      }

      li.appendChild(profpic);
      li.appendChild(name);
      li.appendChild(img);
      li.appendChild(caption);
      li.appendChild(likes);

      return li;
    }

    function showFeedItems() {
      const items = data.slice(currentIndex, currentIndex + itemsToShow);
      items.forEach(item => {
        const feedItem = createFeedItem(item);
        feedContainer.appendChild(feedItem);
      });

      currentIndex += itemsToShow;

      if (currentIndex >= data.length) {
        loadMoreBtn.style.display = 'none'; // Hide the "Load More" button if no more items to load as in the request
      }
    }

    function loadMore() {
      showFeedItems();
    }

    loadMoreBtn.addEventListener('click', loadMore);
    showFeedItems();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  });
  