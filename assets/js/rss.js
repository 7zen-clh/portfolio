document.addEventListener('DOMContentLoaded', function() {
    const rssFeedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://cyber.gouv.fr/actualites/feed';
  
    fetch(rssFeedUrl)
      .then(response => response.json())
      .then(data => {
        const articles = data.items;
  
        articles.forEach(item => {
          const title = item.title;
          const link = item.link;
          const description = item.description;
          const pubDate = new Date(item.pubDate);
          const formattedDate = pubDate.toLocaleDateString('fr-FR'); // Format de la date
  
          const articleDiv = document.createElement('div');
          articleDiv.classList.add('article');
          articleDiv.innerHTML = `
            <h2><a href="${link}">${title}</a></h2>
            <p>${description}</p>
            <p class="pubDate">Publié le : ${formattedDate}</p>  <!-- Date insérée après l'extrait -->
          `;
          document.getElementById('articles').appendChild(articleDiv);
        });
      })
      .catch(error => console.error('Erreur de récupération du flux RSS:', error));
  });
  